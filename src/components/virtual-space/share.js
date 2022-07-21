import { IconButton, Card, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RiShareFill } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import DialogButton from "../../template/buttons/dialog";
import { useState, useRef, useContext } from "react";
import copyText from "../../utils/others/clipboard";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import PAGES from "../../utils/constants/page-names";

export default function Share() {
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const [open, toggleOpen] = useState(false);
  const theme = useTheme();
  const clipboard = useRef();

  const createLink = (href) => {
    return href.replace(
      PAGES.CREATE_METAVERSE,
      `${PAGES.METAVERSE_ROOM}/?id=${virtualSpace.id}`
    );
  };

  return (
    <>
      <DialogButton
        action_sx={{ justifyContent: "center" }}
        title="Share"
        element={
          <>
            <Card
              elevation={0}
              sx={{
                padding: 1,
                bgcolor: "background.screen",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                readOnly
                ref={clipboard}
                value={
                  virtualSpace.manage
                    ? createLink(window.location.href)
                    : window.location.href
                }
                style={{
                  fontSize: "15px",
                  outline: "none",
                  borderWidth: "0px",
                  backgroundColor: "transparent",
                  color: theme.palette.mode === "dark" ? "#fff" : "#2d3436",
                }}
              ></input>
              <Button
                startIcon={<MdOutlineContentCopy />}
                sx={{ marginLeft: 0 }}
                variant="outlined"
                onClick={() => {
                  copyText(clipboard.current);
                }}
              >
                COPY
              </Button>
            </Card>
          </>
        }
        open={open}
        setOpen={toggleOpen}
        actions={
          <Button variant="filled" onClick={() => toggleOpen(false)}>
            Cancel
          </Button>
        }
      />
      <IconButton sx={{ marginTop: "10px" }} onClick={() => toggleOpen(true)}>
        <RiShareFill />
      </IconButton>
    </>
  );
}
