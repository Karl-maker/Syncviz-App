import { Chip, Avatar, Divider, Typography } from "@mui/material";

class Message {
  constructor(message, { timestamp, username, color }) {
    this._message = message || "";
    this._timestamp = timestamp || "";
    this._username = username || "";
    this._color = color || null;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  display() {
    return (
      <Chip
        sx={{
          height: "auto",
          padding: "0px",
          paddingTop: "5px",
          paddingRight: "5px",
          alignContent: "start",
        }}
        label={
          <>
            <Chip
              size="small"
              avatar={
                <Avatar
                  src="/"
                  sx={{ bgcolor: this._color, color: "#ffff" }}
                  alt={this._username}
                />
              }
              label={this._username.toLowerCase()}
              sx={{
                bgcolor: "transparent",
                height: "auto",
                marginBottom: "5px",
              }}
            />
            <Divider />
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
          </>
        }
      />
    );
  }

  /*

  <Card elevation={0} sx={{ borderRadius: "10px", padding: "5px" }}>
                <Chip
                  label={
                    <Chip
                      avatar={<Avatar src="/" />}
                      label={this._username.toLowerCase()}
                      size="small"
                      sx={{
                        height: "auto",
                        minHeight: "25px",
                        marginBottom: "5px",
                      }}
                    />
                  }
                  size="small"
                  sx={{
                    height: "auto",
                    minHeight: "25px",
                    marginBottom: "5px",
                  }}
                />
                <Divider />
                <Typography variant="caption" display="block" gutterBottom>
                  {this._message}
                </Typography>
              </Card>


  */
}

export default Message;
