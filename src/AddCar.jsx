import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCar(props) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: 0,
        price: 0
    });

    const fuelOptions = [
        'E95', 'E98', 'Diesel', 'Hybrid', 'Electric'
    ];

    // boolean variable for dialog (open = true, close = false)
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

        // save car
        console.log("AddCar/handleSave", car);
        const success = await props.addCar(car);

        if (!success) {
            console.error("Adding a new car failed");
            props.setStatus({ message: "Adding a new car failed", type: 'error' });
        } else {
            props.setStatus({ message: `${car.brand} ${car.model} added successfully`, type: 'success' });
        }

        // close dialog
        setOpen(false);

        // clear the form
        setCar({ brand: '', model: '', color: '', fuel: '', modelYear: 0, price: 0 });

        await props.loadCars();
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>New car</Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add car</DialogTitle>

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