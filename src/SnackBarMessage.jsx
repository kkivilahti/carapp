import { Snackbar, Alert } from "@mui/material";

export default function SnackBarMessage({status}) {

    return (
        <>
            <Snackbar
                open={true}
                autoHideDuration={6000}>
                    <Alert variant="filled" severity={status.type} sx={{ width: '100%' }}>
                        {status.message}
                    </Alert>
            </Snackbar>
        </>
    );
}