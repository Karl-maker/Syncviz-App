import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef } from "react";
import MEDIA from "../../utils/constants/media";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SceneBabylon from "../../classes/babylon/scene";

export default function BabylonViewer(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const reactCanvas = useRef(null);
  const {
    modelUrl,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    ...rest
  } = props;

  const onSceneReady = async (scene) => {
    const babylonScene = new SceneBabylon({ scene });

    babylonScene.scene.clearColor = new BABYLON.Color4(
      0,
      0,
      0,
      0.0000000000000001
    );

    babylonScene.loadScene(modelUrl);

    // This attaches the camera to the canvas
    babylonScene.scene.activeCamera.attachControl(babylonScene.canvas, true);
  };

  const onRender = (scene) => {};

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new BABYLON.Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new BABYLON.Scene(engine, sceneOptions);
      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactCanvas]);

  return (
    <canvas
      ref={reactCanvas}
      style={{
        zIndex: 10000,
        borderRadius: mobile ? "2em" : "2em",
        backgroundColor: theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1",
        height: mobile ? "60vh" : "50vh",
        width: mobile ? "100%" : "100%",
        overflow: "hidden",
        margin: mobile ? "0px" : "0px",
        padding: "0",
      }}
      {...rest}
    />
  );
}
