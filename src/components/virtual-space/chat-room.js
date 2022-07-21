import Prompt from "../../classes/prompt";
import Message from "../../classes/message";
import Alert from "../../classes/alert";
import {
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Share from "./share";
import { BiSend } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import MEDIA from "../../utils/constants/media";
import BlobMessage from "../../classes/blob-message";

export default function ChatRoomComponent({ display, toggleDisplay }) {
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [messages, setMessages] = useState(<></>);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);

  const addMessage = (message) => {
    virtualSpace.chat_room.add(message);
    setMessages(virtualSpace.chat_room.display());

    // append with useRef..
  };

  useEffect(() => {
    socket.on("updates", ({ message }) => {
      const prompt = new Prompt(message, {});
      addMessage(prompt);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    socket.on("alerts", ({ message }) => {
      const alert = new Alert(message, {});
      addMessage(alert);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    socket.on("blobs", () => {
      const new_message = new BlobMessage("scene recieved", {});
      addMessage(new_message);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    socket.on("messages", ({ message, sender, timestamp }) => {
      const new_message = new Message(message, {
        username: sender.username,
        color: sender.color,
        timestamp,
      });
      addMessage(new_message);
      return () => {};
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useDidMountEffect(() => {
    if (!display) {
      setNewMessages((length) => length + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ol
        style={{
          padding: "0px",
          height: mobile ? "82%" : "75%",
          opacity: display ? 1 : 0,
          display: "flex",
          visibility: display ? "" : "hidden",
          flexDirection: "column-reverse",
          marginTop: "0px",
        }}
      >
        {messages}
      </ol>
      <div style={{ display: "flex", alignItems: "center" }}>
        {display && (
          <TextField
            inputRef={(input) => {
              if (input != null) {
                input.focus();
              }
            }}
            label="Write Message"
            size="small"
            id="input-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            sx={{
              m: 0,
              width: "20ch",
              display: display ? "block" : "none",
              marginRight: "20px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start" sx={{ marginBottom: "2px" }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (message) virtualSpace.chat_room.send(message);
                      setMessage("");
                    }}
                  >
                    <BiSend />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        )}
        <IconButton
          sx={{ marginTop: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            const toggle = !display;

            toggleDisplay(toggle);
            if (toggle) {
              setNewMessages(0);
            }
          }}
        >
          <Badge badgeContent={newMessages} max={999} color="primary">
            <RiMessage2Fill />
          </Badge>
        </IconButton>

        <Share />
      </div>
    </div>
  );
}
