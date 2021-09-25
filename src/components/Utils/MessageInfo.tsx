import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageInfo(props: {
  openMsg: boolean;
  typeMessage: string;
  message: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(props.openMsg);
    if (props.openMsg) {
      setOpen(true);
    }
  }, [props.openMsg]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let content = <></>;

  if (props.typeMessage === "success") {
    content = (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">{props.message}</Alert>
        </Snackbar>
      </Stack>
    );
  }

  return content;
}
