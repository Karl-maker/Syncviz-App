import Header from "./header";
import { Grid, Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: "background.default", color: "text.primary" }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={0} sm={0} md={2} display={{ xs: "none", lg: "block" }}>
          {
            // Side menu bar
          }
          Sidebar
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid item xs={12}>
            {
              // header (top of screen)
            }
            <Header />
          </Grid>
          <Grid item xs={12}>
            {
              // main body with page
            }
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
