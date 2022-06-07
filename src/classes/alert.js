import { Chip } from "@mui/material";
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
        label={this._message}
      />
    );
  }
}

export default Alert;
