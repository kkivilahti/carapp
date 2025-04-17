import { useEffect, useState } from "react";
import { CarTable } from "./CarTable";
import { AppBar, Toolbar, Typography, CssBaseline, Stack } from '@mui/material';
import { getCars, deleteCar } from "./fetchCars";
import DeleteDialog from "./DeleteDialog";
import SnackBarMessage from "./SnackBarMessage";


export default function App() {
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState({ message: '', type: '' });

  // when a car is being deleted, it is temporarily stored here
  const [rmCar, setRmCar] = useState(null);

  async function confirmDelete(car) {
    const success = await deleteCar(car);

    // set snackbar message
    if (!success) {
      console.error("Removing failed");
      setStatus({ message: `Removing ${car.brand} ${car.model} failed`, type: 'error' })
    } else {
      console.log("Removed: ", car);
      setStatus({ message: `${car.brand} ${car.model} removed successfully`, type: 'success' })

      // update list to avoid delay while loading car table
      setCars((prevCars) => prevCars.filter((c) => c.id !== car.id));
    }

    setRmCar(null);
    setCars(await getCars());
  }

  async function loadCars() {
    setCars(await getCars());
  }

  useEffect(() => {
    getCars().then(carArray => setCars(carArray))
  }, []);

  // clear status automatically
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus({ message: '', type: '' }), 6000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return <>
    <CssBaseline />
    <Stack flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="h1" sx={{ margin: 2, flexGrow: 1, textAlign: "center" }}>
            🛻 Car shop 🚚
          </Typography>
        </Toolbar>
      </AppBar>

      <CarTable cars={cars} removeCar={car => setRmCar(car)} loadCars={loadCars} setStatus={setStatus} />

      {rmCar && <DeleteDialog car={rmCar} ok={confirmDelete} cancel={() => setRmCar(null)} />}

      {status.message && <SnackBarMessage status={status} />}
    </Stack>
  </>
}
