import ChatRoomComponent from "./chat-room";
import Timer from "./timer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import synclogo from "../../images/logo192.png";
import { useState, useEffect, useContext, useMemo } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { IconButton, useMediaQuery } from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";
import ThreeDimentionalViewer from "./babylon-viewer";
import MEDIA from "../../utils/constants/media";
import ViewersChip from "./viewers-chip";
import { useTheme } from "@mui/material/styles";

// Meshes: https://github.com/BabylonJS/Assets/tree/master/meshes

export default function Viewer() {
  const theme = useTheme();
  const handleFullScreen = useFullScreenHandle();
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayChat, toggleDisplayChat] = useState(false);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  useEffect(() => {
    socket.on("disconnect", () => {
      // Allow user to attempt to rejoin
      setDisplayTimer(false);
      setConnectionStatus(
        <IconButton sx={{ bgcolor: "#d63031", marginLeft: "5px" }} size="small">
          <BiLinkAlt />
        </IconButton>
      );
    });
    return () => {};
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setDisplayTimer(true);
      setConnectionStatus(
        <IconButton size="small" sx={{ bgcolor: "#00b894", marginLeft: "5px" }}>
          <BiLinkAlt />
        </IconButton>
      );
    });
    return () => {};
  }, [socket]);

  useEffect(() => {
    socket.on("reconnect", () => {
      setConnectionStatus(
        <IconButton size="small" sx={{ bgcolor: "#fdcb6e", marginLeft: "5px" }}>
          <BiLinkAlt />
        </IconButton>
      );
    });
  }, [socket]);

  const BabylonViewer = useMemo(
    () =>
      virtualSpace.url ? (
        <ThreeDimentionalViewer
          fullScreen={handleFullScreen.active}
          modelUrl={virtualSpace.url}
        />
      ) : (
        <div
          style={{
            zIndex: 10000,
            borderRadius: handleFullScreen.active ? "0em" : "2em",
            backgroundColor:
              theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1",
            height: "100%",
            width: mobile ? "100%" : "100%",
            overflow: "hidden",
            margin: mobile ? "0px" : "0px",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={synclogo} alt="syncviz-logo" height={80} />
        </div>
      ),
    [handleFullScreen.active, virtualSpace.url, mobile, theme.palette.mode]
  );

  return (
    <FullScreen handle={handleFullScreen}>
      <div
        style={{
          position: "relative",
          margin: mobile ? "5px" : "0px",
          padding: "0px",
          width: "auto",
          height: handleFullScreen.active ? "100vh" : mobile ? "65vh" : "60vh",
        }}
      >
        {
          // 3D View
        }

        {BabylonViewer}

        {
          // Overlay Content
        }
        {
          // Timer
        }
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "0%",
            right: "0%",
            marginRight: "20px",
            marginTop: "15px",
          }}
        >
          <Timer on={displayTimer} /> {connectionStatus && connectionStatus}
        </div>
        {
          // Message
        }

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "0%",
            left: "0%",
            marginLeft: "25px",
            height: "100%",
            width: displayChat ? "65%" : "0%",
          }}
        >
          <ChatRoomComponent
            display={displayChat}
            toggleDisplay={toggleDisplayChat}
            handleFullScreen={handleFullScreen}
          />
        </div>
        {
          // Host
        }
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            top: "0%",
            left: "0%",
            marginLeft: "15px",
            marginTop: "15px",
          }}
        >
          {virtualSpace.host.display({ backgroundColor: "transparent" })}
        </div>
        {
          // Viewers
        }
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: "0%",
            right: "0%",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          {!mobile && <ViewersChip />}
        </div>

        {
          // Dialogs
        }
      </div>
    </FullScreen>
  );
}
