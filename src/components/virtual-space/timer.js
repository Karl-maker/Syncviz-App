import { useEffect, useState, useContext } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { Chip, Skeleton, Typography } from "@mui/material";
import { countTimeLeft } from "../../utils/others/date";
import { MdTimerOff } from "react-icons/md";

export default function Timer(props) {
  const { on } = props;
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const [time, setTime] = useState(
    <Skeleton animation="wave" variant="circular" width={10} height={10} />
  );

  useEffect(() => {
    setInterval(function () {
      setTime(
        countTimeLeft(new Date(virtualSpace.createdAt), virtualSpace.time_limit)
      );
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Chip
      icon={
        <Chip
          label={
            <Typography
              variant="overline"
              sx={{
                borderColor: "text.primary",
                color: "#ffff",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              <>{on ? "LIVE" : "DISCONNECTED"}</>
            </Typography>
          }
          size="small"
          sx={{ fontSize: "10px", bgcolor: on ? "#d63031" : "" }}
        />
      }
      label={
        (
          <Typography sx={{ fontSize: "10px" }}>
            {on ? (
              time
            ) : (
              <MdTimerOff style={{ marginTop: "3px", fontSize: "15px" }} />
            )}
          </Typography>
        ) || null
      }
      sx={{
        width: "auto",
        justifyContent: "end",
      }}
    />
  );
}
