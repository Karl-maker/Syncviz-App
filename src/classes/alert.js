import { Chip, Typography } from "@mui/material";
import Message from "./message";
import { IoIosAlert } from "react-icons/io";

class Alert extends Message {
  constructor(message, { timestamp }) {
    super(message, { timestamp });
  }

  display() {
    return (
      <Chip
        sx={{ bgcolor: "#d63031", color: "#fff" }}
        avatar={<IoIosAlert color="#fff" />}
        label={
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{
              width: "100%",
              display: "inline-block",
              whiteSpace: "pre-line",
            }}
          >
            {this._message}
          </Typography>
        }
      />
    );
  }
}

export default Alert;
