import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

export default function EditCar(props) {
    const [car, setCar] = useState(props.params.data);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {

        // form validation
        if (!car.brand || !car.model || !car.color || !car.fuel || !car.modelYear || !car.price) {
            props.setStatus({ message: 'Please fill all fields', type: 'error' });
            return;
        }
        if (car.modelYear < 1900 || car.modelYear > new Date().getFullYear()) {
            props.setStatus({ message: "Enter a valid model year", type: "error" });
            return;
        }
        if (car.price <= 0) {
            props.setStatus({ message: "Price must be higher than 0", type: "error" });
            return;
        }

        // update car
        console.log("editCar/handleSave", car);
        console.log("url: ", car._links.car.href);
        const success = await props.updateCar(car._links.car.href, car);

        if (!success) {
            console.error("Edit failed");
            props.setStatus({message: `Editing ${car.brand} failed`, type: 'error'})
        } else {
            props.setStatus({message: `${car.brand} ${car.model} edited successfully`, type: 'success'})
        }

        // close dialog
        setOpen(false);

        await props.loadCars();
    }

    const fuelOptions = [
        'E95', 'E98', 'Diesel', 'Hybrid', 'Electric'
    ];

    return (
        <>
            <Button onClick={handleClickOpen} size="small" variant="contained" sx={{ height: '70%', width: '80%' }}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Update car</DialogTitle>

                <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <TextField
                        sx={{ m: 1, width: "45%" }}
                        label="Brand"
                        value={car.brand}
                        onChange={(event) => setCar({ ...car, brand: event.target.value })}>
                    </TextField>
                    <TextField
                        sx={{ m: 1, width: "45%" }}
                        label="Model"
                        value={car.model}
                        onChange={(event) => setCar({ ...car, model: event.target.value })}>
                    </TextField>
                    <TextField
                        sx={{ m: 1, width: "45%" }}
                        label="Color"
                        value={car.color}
                        onChange={(event) => setCar({ ...car, color: event.target.value })}>
                    </TextField>
                    <TextField
                        select
                        sx={{ m: 1, width: "45%" }}
                        label="Fuel"
                        value={car.fuel}
                        onChange={(event) => setCar({ ...car, fuel: event.target.value })}>
                            {fuelOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        sx={{ m: 1, width: "45%" }}
                        label="Model Year"
                        value={car.modelYear}
                        type="number"
                        onChange={(event) => setCar({ ...car, modelYear: event.target.value })}>
                    </TextField>
                    <TextField
                        sx={{ m: 1, width: "45%" }}
                        label="Price"
                        value={car.price}
                        type="number"
                        onChange={(event) => setCar({ ...car, price: event.target.value })}>
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}