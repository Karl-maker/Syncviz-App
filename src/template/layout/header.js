import { Grid } from "@mui/material";
import { CgMenuRight } from "react-icons/cg";
import DrawerButton from "../buttons/drawer";
import MenuBar from "../navigation/menu";

export default function Header() {
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
        md={0}
        lg={1}
        display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
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
        md={6}
        lg={10}
        sx={{
          paddingLeft: "10px",
        }}
      >
        <img src="./logo192.png" alt="syncviz-logo" height={90} />
      </Grid>
      <Grid
        item
        xs={2}
        sm={4}
        md={6}
        display={{ xs: "block", md: "block", lg: "none" }}
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
            <CgMenuRight style={{ fontSize: "40px", marginRight: "5px" }} />
          </DrawerButton>
        </div>
      </Grid>
      <Grid
        item
        xs={0}
        sm={0}
        md={0}
        lg={1}
        display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        sx={{ bgcolor: "background.default", height: "100%" }}
      >
        {
          // White space
        }
      </Grid>
    </Grid>
  );
}
