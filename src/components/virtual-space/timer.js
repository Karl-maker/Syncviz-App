import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Chip, Skeleton, Typography } from "@mui/material";

export default function Timer() {
  const { socket } = useContext(VirtualSpaceContext);
  const [displayTime, showDisplayTime] = useState(true);
  const [time, setTime] = useState(
    <Skeleton animation="wave" variant="circular" width={10} height={10} />
  );

  useEffect(() => {
    socket.on("timer", ({ time_left, prompt }) => {
      if (time_left) setTime(`${time_left} left`);
      if (prompt) setTime(`${prompt}`);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <>
      {displayTime ? (
        <Chip
          onClick={() => showDisplayTime(!displayTime)}
          icon={
            <Chip
              label={
                <Typography
                  variant="overline"
                  sx={{ color: "#fff", fontSize: "10px", fontWeight: "bold" }}
                >
                  LIVE
                </Typography>
              }
              size="small"
              sx={{ fontSize: "10px" }}
            />
          }
          label={time || null}
          sx={{
            width: "auto",
            justifyContent: "end",
          }}
        />
      ) : (
        <Chip
          onClick={() => showDisplayTime(!displayTime)}
          label={
            <Typography
              variant="overline"
              sx={{
                color: "#fff",
                fontSize: "10px",
                fontWeight: "bold",
                marginLeft: "2px",
                marginRight: "2px",
              }}
            >
              LIVE
            </Typography>
          }
          size="small"
          sx={{ fontSize: "10px" }}
        />
      )}
    </>
  );
}
