import { VirtualSpaceContext } from "../../widgets/virtual-space";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  IconButton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BiCubeAlt } from "react-icons/bi";
import { useState, useContext } from "react";
import { useMediaQuery, Button } from "@mui/material";
import DialogButton from "../../template/buttons/dialog";
import MEDIA from "../../utils/constants/media";

export default function ManageVirtualSpace() {
  // Have Virtual Room there WITH snackbar
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const [add3DDialog, setAdd3DDialog] = useState(false);
  const [blob, setBlob] = useState(null);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const actions = [
    {
      name: "Add Scene",
      icon: <BiCubeAlt color="#fff" />,
      action: () => setAdd3DDialog(true),
    },
  ];

  const Input = styled("input")({});
  const fileUpload = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Virtual Space Manager"
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
        title="Add 3D Scene"
        content={
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input
                accept=".gltf, .glb" //"model/gltf+json"
                id="icon-button-file"
                type="file"
                onChange={fileUpload}
              />
              <IconButton
                aria-label="upload 3d-files"
                component="span"
                sx={{ color: "text.tertiary" }}
              >
                <BiCubeAlt />
              </IconButton>
            </label>
          </Stack>
        }
        open={add3DDialog}
        setOpen={setAdd3DDialog}
        actions={
          <>
            <Button
              variant="filled"
              onClick={() => {}}
              sx={{ color: "text.tertiary" }}
            >
              Add
            </Button>
            <Button
              variant="filled"
              onClick={() => setAdd3DDialog(false)}
              sx={{ color: "text.tertiary" }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}
