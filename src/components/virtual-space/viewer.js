import ChatRoomComponent from "./chat-room";
import Timer from "./timer";
import { useState, useEffect, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";
import DialogButton from "../../template/buttons/dialog";
import ThreeDimentionalViewer from "./babylon-viewer";
import MEDIA from "../../utils/constants/media";

export default function Viewer() {
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [connectDialog, setConnectDialog] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayChat, toggleDisplayChat] = useState(false);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  useEffect(() => {
    socket.on("disconnect", () => {
      // Allow user to attempt to rejoin
      setDisplayTimer(false);
      setConnectionStatus(
        <IconButton
          sx={{ bgcolor: "#d63031" }}
          size="small"
          onClick={() => {
            setConnectDialog(true);
          }}
        >
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
        <IconButton size="small" sx={{ bgcolor: "#00b894" }}>
          <BiLinkAlt />
        </IconButton>
      );
    });
    return () => {};
  }, [socket]);

  useEffect(() => {
    socket.on("reconnect", () => {
      setConnectionStatus(
        <IconButton size="small" sx={{ bgcolor: "#fdcb6e" }}>
          <BiLinkAlt />
        </IconButton>
      );
    });
  }, [socket]);

  return (
    <div
      style={{
        position: "relative",
        margin: mobile ? "5px" : "0px",
        padding: "0px",
        width: "auto",
      }}
    >
      {
        // 3D View
      }

      <ThreeDimentionalViewer
        modelUrl={"https://assets.babylonjs.com/meshes/"}
      />

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
        <Timer on={displayTimer} />
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
        />
      </div>
      {
        // Fullscreen
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
        {connectionStatus && connectionStatus}
      </div>

      {
        // Dialogs
      }

      <DialogButton
        title="Join Virtual Space"
        content="You can attempt to join this virtual space, however if this virtual space has ended you will be unsuccessfull."
        open={connectDialog}
        setOpen={setConnectDialog}
        actions={
          <>
            <Button
              variant="filled"
              onClick={() => {
                virtualSpace.join();
                setConnectDialog(false);
              }}
            >
              Join
            </Button>
            <Button variant="filled" onClick={() => setConnectDialog(false)}>
              Cancel
            </Button>
          </>
        }
      />
    </div>
  );
}
