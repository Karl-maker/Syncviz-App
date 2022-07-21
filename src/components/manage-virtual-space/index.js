import { VirtualSpaceContext } from "../../widgets/virtual-space";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
//import { styled } from "@mui/material/styles";
import { BiLogOut } from "react-icons/bi";
import { useState, useContext } from "react";
import DialogButton from "../../template/buttons/dialog";
import MEDIA from "../../utils/constants/media";
import { useNavigate } from "react-router-dom";

export default function ManageVirtualSpace() {
  // Have Virtual Room there WITH snackbar
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const navigate = useNavigate();
  const [endMetaverseRoomDialog, toggleEndMetaverseRoomDialog] =
    useState(false);
  //const [blob, setBlob] = useState(null);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const actions = [
    {
      name: "End Metaverse Room",
      icon: <BiLogOut color="#fff" />,
      action: () => toggleEndMetaverseRoomDialog(true),
    },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Metaverse Room Manager"
        sx={{
          position: "fixed",
          bottom: mobile ? 65 : 30,
          right: mobile ? 16 : 60,
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
      <DialogButton
        title="End Metaverse Room"
        content={
          <Typography>This will end room for all other users</Typography>
        }
        open={endMetaverseRoomDialog}
        setOpen={toggleEndMetaverseRoomDialog}
        actions={
          <>
            <Button
              variant="filled"
              onClick={() => {
                virtualSpace.end();
                navigate(0);
              }}
            >
              End
            </Button>
            <Button
              variant="filled"
              onClick={() => toggleEndMetaverseRoomDialog(false)}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}
