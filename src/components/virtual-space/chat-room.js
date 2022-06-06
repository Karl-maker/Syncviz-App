import Prompt from "../../classes/prompt";
import Message from "../../classes/message";
import { TextField, InputAdornment, IconButton, Badge } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { BiSend } from "react-icons/bi";
import { VirtualSpaceContext } from "../../widgets/virtual-space";

export default function ChatRoomComponent() {
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [messages, setMessages] = useState(<></>);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);
  const [display, toggleDisplay] = useState(false);

  const addMessage = (message) => {
    virtualSpace.chat_room.add(message);
    setMessages(virtualSpace.chat_room.display());
  };

  useEffect(() => {
    socket.on("updates", ({ message }) => {
      const prompt = new Prompt(message, {});
      addMessage(prompt);
    });

    //return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    socket.on("messages", ({ message, sender, timestamp }) => {
      const new_message = new Message(message, {
        username: sender.username,
        timestamp,
      });
      addMessage(new_message);
    });

    //return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
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
          height: "83%",
          opacity: display ? 1 : 0,
          display: "flex",
          flexDirection: "column-reverse",
          marginTop: "0px",
        }}
      >
        {messages}
      </ol>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Write Message"
          size="small"
          id="input-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          sx={{ m: 0, width: "20ch", display: display ? "block" : "none" }}
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
        <IconButton
          size="small"
          sx={{ marginTop: "15px", marginLeft: "10px" }}
          onClick={() => {
            const toggle = !display;

            toggleDisplay(toggle);
            if (toggle) {
              setNewMessages(0);
            }
          }}
        >
          <Badge color="secondary" badgeContent={newMessages} max={999}>
            <RiMessage2Fill />
          </Badge>
        </IconButton>
      </div>
    </div>
  );

  //opacity: showMessages ? 1 : 0,
}
