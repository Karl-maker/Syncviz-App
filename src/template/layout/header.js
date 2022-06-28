import { Grid, useMediaQuery } from "@mui/material";
import { CgMenuRight } from "react-icons/cg";
import DrawerButton from "../buttons/drawer";
import MenuBar from "../navigation/menu";
import MEDIA from "../../utils/constants/media";

export default function Header() {
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
    >
      <Grid
        item
        xs={0}
        sm={0}
        md={1}
        lg={1}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
        sx={{ bgcolor: "background.default", height: "100%" }}
      >
        {
          // White space
        }
      </Grid>
      <Grid
        item
        xs={2}
        sm={4}
        md={10}
        lg={10}
        sx={{
          paddingLeft: "10px",
        }}
      >
        <img src="./logo192.png" alt="syncviz-logo" height={mobile ? 70 : 80} />
      </Grid>
      <Grid
        item
        xs={2}
        sm={4}
        display={{ sm: "block", md: "none", lg: "none" }}
      >
        {
          // Doesn't show on larger screens
        }
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <DrawerButton
            element={<MenuBar text_color="text.tertiary" />}
            anchor="bottom"
            height="auto"
          >
            <CgMenuRight
              style={{ fontSize: mobile ? "30px" : "40px", marginRight: "5px" }}
            />
          </DrawerButton>
        </div>
      </Grid>
      <Grid
        item
        xs={0}
        sm={0}
        md={1}
        lg={1}
        display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
        sx={{ bgcolor: "background.default", height: "100%" }}
      >
        {
          // White space
        }
      </Grid>
    </Grid>
  );
}
