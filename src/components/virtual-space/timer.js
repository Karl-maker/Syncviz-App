import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { BiTimeFive } from "react-icons/bi";
import { Chip, Skeleton } from "@mui/material";

export default function Timer() {
  const { socket } = useContext(VirtualSpaceContext);
  const [time, setTime] = useState(
    <Skeleton animation="wave" variant="circular" width={10} height={10} />
  );

  useEffect(() => {
    socket.on("timer", ({ time_left, prompt }) => {
      if (time_left) setTime(`${time_left} left`);
      if (prompt) setTime(`${prompt}`);
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
