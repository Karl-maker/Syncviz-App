import Message from "./message";
import { Chip, Avatar } from "@mui/material";

class Prompt extends Message {
  constructor(message, { timestamp }) {
    super(message, { timestamp });
  }

  // @override

  display() {
    return (
      <Chip
        avatar={<Avatar src="/" />}
        label={this._message.toLowerCase()}
        size="small"
        style={{ alignContent: "center" }}
      />
    );
  }
}

export default Prompt;
