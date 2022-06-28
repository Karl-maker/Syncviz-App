import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BottomNavigationBar() {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  return (
    <BottomNavigation
      sx={{
        bgcolor: "background.default",
        margin: 0,
        height: "6vh",
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        disableRipple
        icon={
          <Button
            onClick={() => navigate("/create")}
            elevation={0}
            sx={{
              borderRadius: "10px",
              bgcolor: "background.default",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "20px",
              paddingRight: "20px",
              border: 1,
              borderColor: "background.screen",
              color: "text.primary",
            }}
          >
            <IoIosAdd size={25} />
          </Button>
        }
      />
    </BottomNavigation>
  );
}
