import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { BiTimeFive } from "react-icons/bi";
import { Chip } from "@mui/material";

export default function Timer() {
  const { socket } = useContext(VirtualSpaceContext);
  const [time, setTime] = useState("--");

  useEffect(() => {
    socket.on("timer", ({ time_left }) => {
      setTime(time_left);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Chip
      icon={<BiTimeFive style={{ fontSize: "20px" }} />}
      label={time || null}
      sx={{
        width: "auto",
        justifyContent: "end",
      }}
    />
  );
}
