import { Typography, Chip, Avatar, AvatarGroup } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";

export default function ViewersChip() {
  const { socket } = useContext(VirtualSpaceContext);
  const [context, setContext] = useState([]);

  useEffect(() => {
    socket.on("viewers", ({ users }) => {
      setContext(users);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Chip
      variant="outlined"
      icon={
        <AvatarGroup max={4}>
          {context.map((user, index) => (
            <Avatar
              key={index}
              alt={user.username ? user.username.toUpperCase() : "Guest"}
              sx={{ bgcolor: user.color }}
              src="/"
            />
          ))}
        </AvatarGroup>
      }
      label={
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ color: "text.secondary" }}
        >
          {`${context.length} viewers`}
        </Typography>
      }
      sx={{
        padding: "0px",
        margin: "0px",
        borderWidth: "0px",
        width: "auto",
        justifyContent: "start",
        alignContent: "center",
      }}
    />
  );
}
