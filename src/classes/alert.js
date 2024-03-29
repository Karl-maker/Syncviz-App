import { Chip, Typography } from "@mui/material";
import Message from "./message";
import { IoIosAlert } from "react-icons/io";

class Alert extends Message {
  constructor(message, { timestamp, type }) {
    super(message, { timestamp });
    this._type = type || "alert";
  }

  display() {
    return (
      <Chip
        sx={{
          bgcolor: this._type === "info" ? "" : "#d63031",
          color: this._type === "info" ? "" : "#fff",
        }}
        avatar={<IoIosAlert color={this._type === "info" ? "" : "#fff"} />}
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
