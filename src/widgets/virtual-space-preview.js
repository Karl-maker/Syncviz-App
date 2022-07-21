import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { countTimeLeft } from "../utils/others/date";
import { BiTimeFive } from "react-icons/bi";

export default function VirtualSpacePreview({
  id,
  description,
  time_limit,
  current_amount_attending,
  created_at,
  theme,
  host,
}) {
  const [time, setTime] = useState(null);
  const TEXT_COLOR = theme === "#ffff" ? "#2d3436" : "#ffff";

  useEffect(() => {
    setInterval(function () {
      setTime(countTimeLeft(new Date(created_at), time_limit));
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        border: theme === "#ffff" ? "1px solid" : "0px",
        borderColor: theme === "#ffff" ? "#dfe6e9" : "transparent",
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        backgroundColor: theme,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "50%",
            paddingLeft: "5px",
          }}
        >
          <Chip
            label={"LIVE"}
            size="small"
            sx={{
              bgcolor: "transparent",
              fontSize: "12px",
              fontWeight: "bold",
              color: TEXT_COLOR,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "50%",
            paddingRight: "5px",
          }}
        >
          <Chip
            label={time && time}
            size="small"
            icon={<BiTimeFive style={{ color: TEXT_COLOR }} />}
            sx={{ color: TEXT_COLOR, bgcolor: "transparent" }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "5px",
          height: "145px",
        }}
      ></div>

      <div
        style={{
          marginTop: "5px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(5px)",
          borderEndEndRadius: "10px",
          borderEndStartRadius: "10px",
          height: "100px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div>
          {host.display({
            backgroundColor: "transparent",
            color: TEXT_COLOR,
          })}
          <br />
          <Typography
            sx={{
              margin: "5px",
              color: TEXT_COLOR,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
            variant="body2"
          >
            {description}
          </Typography>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
        >
          <Chip
            label={`${current_amount_attending} viewer${
              current_amount_attending > 1 ? "s" : ""
            }`}
            size="small"
            sx={{ color: TEXT_COLOR, fontSize: "9px", opacity: 1 }}
          />
        </div>
      </div>
    </Box>
  );
}
