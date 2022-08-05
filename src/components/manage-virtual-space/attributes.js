import { useState } from "react";
import { MdWrapText } from "react-icons/md";
import DialogButton from "../../template/buttons/dialog";
import { Typography, TextField, InputAdornment, Button } from "@mui/material";

export default function Attributes({ virtualSpace, open, setOpen }) {
  const [attributes, setAttributes] = useState({ description: "" });

  return (
    <DialogButton
      noClickOff
      title="Edit Attributes"
      content={
        <>
          <Typography
            variant="subtitle1"
            sx={{ alignSelf: "center", marginBottom: "10px" }}
          >
            Give your room a caption
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
                  <InputAdornment position="end" sx={{ margin: "10px" }}>
                    <MdWrapText />
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
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              virtualSpace.updateAttributes({
                description: attributes.description,
              });

              setOpen(false);
            }}
          >
            Update
          </Button>
          <Button
            variant="filled"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </>
      }
    />
  );
}
