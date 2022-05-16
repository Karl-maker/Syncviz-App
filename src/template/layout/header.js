import { Grid, IconButton } from "@mui/material";
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
        xs={2}
        sm={4}
        md={6}
        lg={12}
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
          <DrawerButton element={<MenuBar />}>
            <IconButton
              color="primary"
              aria-label="menu button"
              component="span"
            >
              <CgMenuRight style={{ fontSize: "40px" }} />
            </IconButton>
          </DrawerButton>
        </div>
      </Grid>
    </Grid>
  );
}
