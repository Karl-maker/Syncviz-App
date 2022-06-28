import { useEffect, useContext, useRef } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import ThreeScene from "../../classes/three/scene";
import MEDIA from "../../utils/constants/media";
import { useMediaQuery, Box } from "@mui/material";

export default function ThreeDimentionalViewer() {
  const { socket } = useContext(VirtualSpaceContext);
  const canvas = useRef();
  const three = new ThreeScene({});
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  three.positionCamera({ x: 0, y: 2, z: 5 });
  three.setupDefaultLighting();

  const animate = () => {
    requestAnimationFrame(animate);

    three.controls.update();
    three.renderer.render(three.scene, three.camera);
  };

  useEffect(() => {
    socket.on("blobs", (file) => {
      three.add({
        blob: file.body,
      });
      three.view.render();
      animate();
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const current = canvas.current;

    three.renderer.setSize(current.offsetWidth, current.offsetHeight);

    current.addEventListener("resize", () => {
      three.handleWindowResize({
        heigth: current.offsetHeight,
        width: current.offsetWidth,
      });
    });

    current.appendChild(three.renderer.domElement);
    return () => current.removeChild(three.renderer.domElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // once

  return (
    <Box
      ref={canvas}
      sx={{
        bgcolor: "background.screen",
        zIndex: 10000,
        borderRadius: mobile ? "2em" : "2em",
        height: mobile ? "60vh" : "50vh",
        width: mobile ? "auto" : "100%",
        overflow: "hidden",
        margin: mobile ? "0px" : "0px",
        padding: "0",
      }}
    ></Box>
  );
}
