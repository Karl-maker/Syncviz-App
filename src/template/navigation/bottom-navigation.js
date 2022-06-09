import { BottomNavigation, BottomNavigationAction, Card } from "@mui/material";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function BottomNavigationBar() {
  const [value, setValue] = useState();

  return (
    <BottomNavigation
      sx={{ bgcolor: "background.screen" }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        disableRipple
        icon={
          <Card
            elevation={0}
            sx={{
              borderRadius: "10px",
              bgcolor: "background.default",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <IoIosAdd size={25} />
          </Card>
        }
      />
    </BottomNavigation>
  );
}
