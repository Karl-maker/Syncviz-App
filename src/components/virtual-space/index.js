import { Typography, Box, Grid, Skeleton } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { UserAccountContext } from "../../context/user";
import ViewersChip from "./viewers-chip";
import Viewer from "./viewer";

export default function VirtualSpaceComponent() {
  const { user, save } = useContext(UserAccountContext);
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);
  const [context, setContext] = useState({
    name: "",
    description: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    socket.on("attributes", ({ virtual_space }) => {
      const { _id, name, description, createdAt, time_limit, user, url } =
        virtual_space;

      virtualSpace.id = _id;
      virtualSpace.name = name;
      virtualSpace.description = description;
      virtualSpace.time_limit = time_limit;
      virtualSpace.createdAt = createdAt;
      virtualSpace.host = user;
      virtualSpace.url = url;

      setContext({ name, description, createdAt });
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    virtualSpace.attendee.username = user.username;
    virtualSpace.attendee.theme = user.theme;
    virtualSpace.updateUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

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
        <Grid item xs={6}>
          {
            // Current Viewers List
          }
          <ViewersChip showAvatars />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {
            // Date of creation
          }
        </Grid>
      </Grid>
    </Box>
  );
}
