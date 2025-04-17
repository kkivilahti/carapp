// Dialog borrowed from https://mui.com/material-ui/react-dialog/

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteDialog({ car, ok, cancel }) {

    return <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            Delete the car?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the car {car.brand} {car.model}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => cancel()}
                variant="contained">
                Cancel
            </Button>
            <Button
                onClick={() => ok(car)}
                autoFocus
                color="error"
                variant="contained"
            >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}