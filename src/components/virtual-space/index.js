import { Typography, Box, Grid, Chip } from "@mui/material";
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
    socket.on("connect", () => {
      virtualSpace.join();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    socket.on("attributes", ({ virtual_space }) => {
      const { name, description, createdAt } = virtual_space;

      virtualSpace.name = name;
      virtualSpace.description = description;
      virtualSpace.createdAt = createdAt;

      setContext({ name, description, createdAt });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Box sx={{ width: "100%", padding: "15px" }}>
      <Viewer />
      <Typography
        variant="h5"
        sx={{ marginTop: "30px" }}
        gutterBottom
        component="div"
      >
        {context.name}
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: "text.secondary" }}>
        {context.description}
      </Typography>
      {
        // Extra Info
      }
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
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
