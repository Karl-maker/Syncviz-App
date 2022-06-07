import ChatRoomComponent from "./chat-room";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Timer from "./timer";
import { useState, useEffect, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Button, IconButton } from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";
import DialogButton from "../../template/buttons/dialog";

export default function Viewer() {
  const fullScreen = useFullScreenHandle();
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [connectDialog, setConnectDialog] = useState(false);

  const handleFullScreen = () => {
    if (fullScreen.active) {
      return fullScreen.exit();
    } else {
      return fullScreen.enter();
    }
  };

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
    <FullScreen handle={fullScreen}>
      <div
        style={{
          position: "relative",
          padding: 0,
        }}
      >
        <div
          style={{
            borderRadius: !fullScreen.active ? "30px" : "0px",
            height: !fullScreen.active ? "70vh" : "100vh",
            backgroundColor: "#2d3436",
            opacity: !fullScreen.active ? 0.3 : 1,
          }}
        >
          {
            // 3D View
          }
        </div>

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
            marginTop: "10px",
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
            width: "60%",
          }}
        >
          <ChatRoomComponent handleFullScreen={handleFullScreen} />
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
    </FullScreen>
  );
}
