import ChatRoomComponent from "./chat-room";
import Timer from "./timer";
import { useState, useEffect, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";
import DialogButton from "../../template/buttons/dialog";
import ThreeDimentionalViewer from "./3d-viewer";
import MEDIA from "../../utils/constants/media";

export default function Viewer() {
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [connectDialog, setConnectDialog] = useState(false);
  const [displayChat, toggleDisplayChat] = useState(false);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  useEffect(() => {
    socket.on("disconnect", () => {
      // Allow user to attempt to rejoin
      setConnectionStatus(
        <IconButton
          onClick={() => {
            setConnectDialog(true);
          }}
        >
          <BiLinkAlt color="#d63031" />
        </IconButton>
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setConnectionStatus(
        <IconButton>
          <BiLinkAlt color="#00b894" />
        </IconButton>
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on("reconnect", () => {
      setConnectionStatus(
        <IconButton>
          <BiLinkAlt color="#fdcb6e" />
        </IconButton>
      );
    });
  }, [socket]);

  return (
    <div
      style={{
        position: "relative",
        padding: 0,
        margin: mobile ? "-15px" : "0px",
      }}
    >
      {
        // 3D View
      }
      <ThreeDimentionalViewer />

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
        <Timer />
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
          width: displayChat ? "60%" : "0%",
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
          marginLeft: "10px",
          marginTop: "10px",
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
              sx={{ color: "text.tertiary" }}
            >
              Join
            </Button>
            <Button
              variant="filled"
              onClick={() => setConnectDialog(false)}
              sx={{ color: "text.tertiary" }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </div>
  );
}
