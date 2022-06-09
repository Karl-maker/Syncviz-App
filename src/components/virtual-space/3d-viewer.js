import { useEffect, useContext, useRef } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import ThreeScene from "../../classes/three-dimention-visualizer";
import MEDIA from "../../utils/constants/media";
import { useMediaQuery, Box } from "@mui/material";

export default function ThreeDimentionalViewer() {
  const { socket } = useContext(VirtualSpaceContext);
  const canvas = useRef();
  const three = new ThreeScene({});
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  three.positionCamera({ x: 0, y: 2, z: 50 });

  const animate = () => {
    requestAnimationFrame(animate);
    three.controls.update();
    three.renderer.render(three.scene, three.camera);
  };

  useEffect(() => {
    socket.on("blobs", (file) => {});

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
    three.addBox({});
    animate();
    return () => current.removeChild(three.renderer.domElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // once

  return (
    <Box
      ref={canvas}
      sx={{
        borderRadius: mobile ? "0" : "2em",
        margin: "0px",
        bgcolor: "background.screen",
        height: mobile ? "60vh" : "50vh",
        width: mobile ? "100vw" : "100%",
      }}
    ></Box>
  );
}
