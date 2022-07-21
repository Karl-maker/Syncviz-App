import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { BiCube } from "react-icons/bi";
import DialogButton from "../../template/buttons/dialog";

export default function SetupVirtualSpace(props) {
  const { setSetup, setup, attributes, setAttributes } = props;
  // Create Space On Site

  /*

  Cannot re make another Metaverse room from refreshing so a re-render tracker is made

  */

  /*

  1. Fill out info
  2. Create Metaverse Room

  */

  return (
    <>
      <DialogButton
        noClickOff
        title="Start Metaverse Room"
        content={
          <>
            <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
              Give your room a caption and other attributes
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <TextField
                key="outlined-multiline-description"
                label="Caption"
                placeholder="Write a caption..."
                multiline
                fullWidth
                rows={2}
                maxRows={4}
                value={attributes.description}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ margin: "10px" }}>
                        <BiCube />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setAttributes((attribute) => ({
                    ...attribute,
                    description: e.target.value,
                  }));
                }}
                sx={{ alignSelf: "center", width: "100%" }}
              />
            </div>
          </>
        }
        open={setup}
        setOpen={setSetup}
        actions={
          <>
            <Button
              variant="filled"
              onClick={() => {
                setSetup(false);
              }}
            >
              Go Live
            </Button>
            <Button
              variant="filled"
              onClick={() => {
                // Send to home page
              }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}
