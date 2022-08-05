import VirtualSpaceWidget from "../widgets/virtual-space";
import { useState, useMemo, useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import VirtualSpaceClass from "../classes/virtual-space";
import { UserAccountContext } from "../context/user";

export default function CreateVirtualSpace() {
  // Create Space On Site

  /*

  Cannot re make another Metaverse room from refreshing so a re-render tracker is made

  */

  const [live, goLive] = useState(false);
  const { user } = useContext(UserAccountContext);

  /*

  1. Fill out info
  2. Create Metaverse Room

  */

  const virtualSpace = useMemo(() => {
    let vs = new VirtualSpaceClass(null, {
      description: "Welcome to my Metaverse Room!",
      attendee: user,
    });

    return vs;

    // eslint-disable-next-line
  }, []);

  const socket = useMemo(() => {
    let io = virtualSpace.connect({});

    goLive(true);

    return io;

    // eslint-disable-next-line
  }, [virtualSpace]);

  return (
    <>
      {live ? (
        <VirtualSpaceWidget
          manage={true}
          socket={socket}
          virtualSpace={virtualSpace}
        />
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!live}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
