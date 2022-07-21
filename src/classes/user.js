import { Chip, Avatar } from "@mui/material";

class User {
  constructor(username, theme) {
    this._username = username;
    this._theme = theme;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get theme() {
    return this._theme;
  }

  set theme(theme) {
    this._theme = theme;
  }

  display({ backgroundColor, color }) {
    return (
      <Chip
        label={this._username}
        size="small"
        sx={{
          color: color || "",
          backgroundColor: backgroundColor || "",
        }}
        avatar={
          <Avatar
            src="/"
            sx={{ bgcolor: this._theme, color: "#ffff" }}
            alt={this._username}
          />
        }
      />
    );
  }
}

export default User;
