import Header from "./header";
import { Grid, Box } from "@mui/material";
import MenuBar from "../navigation/menu";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        <Grid item xs={12}>
          {
            // header (top of screen)
          }
          <Header />
        </Grid>
        <Grid container sx={{ bgcolor: "background.default", height: "100vh" }}>
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
            xs={0}
            sm={0}
            md={0}
            lg={3}
            display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
            sx={{
              bgcolor: "background.default",
              height: "100%",
              paddingLeft: "0px",
              paddingRight: "40px",
            }}
          >
            {
              // Side menu bar
            }
            <MenuBar />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            {
              // main body with page
            }
            {children}
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
      </Grid>
    </Box>
  );
}
