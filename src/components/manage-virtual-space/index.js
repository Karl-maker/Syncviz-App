import { VirtualSpaceContext } from "../../widgets/virtual-space";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useMediaQuery,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { IoOptions } from "react-icons/io5";
import { useState, useContext } from "react";
import MEDIA from "../../utils/constants/media";
import EndMetaverseRoom from "./end";
import Attributes from "./attributes";

export default function ManageVirtualSpace() {
  // Have Virtual Room there WITH snackbar
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const { virtualSpace } = useContext(VirtualSpaceContext);

  // Dialog Triggers
  const [endDialog, toggleEndDialog] = useState(false);
  const [attributesDialog, toggleAttributesDialog] = useState(false);

  // Options
  const actions = [
    {
      name: "End Metaverse Room",
      icon: <BiLogOut color="#fff" />,
      action: () => toggleEndDialog(true),
    },
    {
      name: "Edit attributes",
      icon: <IoOptions color="#fff" />,
      action: () => toggleAttributesDialog(true),
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
      {
        // Options Dialogs
      }
      <EndMetaverseRoom
        virtualSpace={virtualSpace}
        setOpen={toggleEndDialog}
        open={endDialog}
      />
      <Attributes
        virtualSpace={virtualSpace}
        setOpen={toggleAttributesDialog}
        open={attributesDialog}
      />
    </>
  );
}
