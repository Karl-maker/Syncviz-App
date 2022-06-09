import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

function PaperComponent(props) {
  return (
    <div>
      <Paper {...props} />
    </div>
  );
}

export default function DialogButton({
  children,
  title,
  content,
  actions,
  setOpen,
  open,
  element,
  action_sx,
  sx,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="delete-alert"
      >
        <DialogTitle sx={{ color: "text.tertiary" }}>{title}</DialogTitle>
        <DialogContent>
          {element ? (
            element
          ) : (
            <DialogContentText sx={{ color: "text.tertiary" }}>
              {content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={action_sx}>{actions}</DialogActions>
      </Dialog>
    </div>
  );
}
