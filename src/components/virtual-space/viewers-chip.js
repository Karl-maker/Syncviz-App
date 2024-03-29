import { Typography, Chip } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { VscEye } from "react-icons/vsc";
import { VirtualSpaceContext } from "../../widgets/virtual-space";

export default function ViewersChip({ showAvatars }) {
  const { socket } = useContext(VirtualSpaceContext);
  const [context, setContext] = useState([]);

  useEffect(() => {
    socket.on("viewers", ({ users }) => {
      setContext(users);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Chip
      variant="outlined"
      label={
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{
            color: "text.secondary",
            alignItems: "center",
            display: "flex",
          }}
        >
          <>{context.length}</> <VscEye style={{ marginLeft: "5px" }} />
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
