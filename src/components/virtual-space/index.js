import { Typography, Box, Grid, Chip, Skeleton } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { checkHowManyDaysAgo } from "../../utils/others/date";
import ViewersChip from "./viewers-chip";
import Viewer from "./viewer";

export default function VirtualSpaceComponent() {
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [context, setContext] = useState({
    name: "",
    description: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    socket.on("attributes", ({ virtual_space }) => {
      const { name, description, createdAt } = virtual_space;

      virtualSpace.name = name;
      virtualSpace.description = description;
      virtualSpace.createdAt = createdAt;

      setContext({ name, description, createdAt });
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Box sx={{ width: "100%", padding: "5px", margin: "0px", height: "100%" }}>
      <Viewer />
      {/* <Typography
        variant="h5"
        sx={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}
        gutterBottom
        component="div"
      >
        {context.name ? (
          context.name
        ) : (
          <Skeleton variant="text" width="30%" height="20px" />
        )}
        </Typography> */}
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          color: "text.secondary",
          marginTop: "30px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        {context.description ? (
          context.description
        ) : (
          <>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </>
        )}
      </Typography>
      {
        // Extra Info
      }
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "10px", paddingLeft: "5px", paddingRight: "5px" }}
      >
        <Grid item xs={8}>
          {
            // Current Viewers List
          }
          <ViewersChip />
        </Grid>
        <Grid item xs={4}>
          {
            // Date of creation
          }
          <Chip
            variant="outlined"
            label={
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ color: "text.secondary" }}
              >
                {checkHowManyDaysAgo(new Date(context.createdAt), new Date())}
              </Typography>
            }
            sx={{ borderWidth: "0px", width: "100%", justifyContent: "end" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
