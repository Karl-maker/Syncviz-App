import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiEarthFill } from "react-icons/ri";
import { FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PAGES from "../../utils/constants/page-names";

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
        icon={
          <RiEarthFill
            size={25}
            onClick={() => navigate(PAGES.METAVERSE_FEED)}
          />
        }
      />
      <BottomNavigationAction
        disableRipple
        icon={
          <Button
            onClick={() => {
              navigate(PAGES.CREATE_METAVERSE);
              navigate(0);
            }}
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
      <BottomNavigationAction
        icon={
          <FaInfo
            size={20}
            onClick={() => navigate(PAGES.HELP)}
            elevation={0}
          />
        }
      />
    </BottomNavigation>
  );
}
