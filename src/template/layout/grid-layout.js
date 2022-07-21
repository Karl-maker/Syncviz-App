import { Grid } from "@mui/material";

export default function GridLayout({ children }) {
  return (
    <Grid container spacing={0}>
      {children}
    </Grid>
  );
}
