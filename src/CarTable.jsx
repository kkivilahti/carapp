import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { addCar, updateCar } from "./fetchCars";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

ModuleRegistry.registerModules([AllCommunityModule]);

export function CarTable({ cars, removeCar, loadCars, setStatus }) {

  // table column settings
  const colDefs = useMemo(() => [
    { field: "brand", sortable: true, filter: true, width: 220 },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true },
    { field: "fuel", sortable: true, filter: true },
    { field: "modelYear", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <EditCar
          updateCar={updateCar}
          params={params}
          loadCars={loadCars}
          setStatus={setStatus} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => {
        const car = params.data;
        return <Button
          variant="contained" size="small" color="error"
          sx={{ height: '70%', width: '80%' }}
          onClick={() => removeCar(car)}
        >
          Delete
        </Button>
      },
      width: 120,
    },
  ], []);

  const gridOptions = {
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 120,
    },
  };

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 3, alignItems: "center", justifyContent: "center", maxHeight: 650, mt: 5, mb: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6, margin: 2 }}>
        <Typography variant="h4">Cars ({cars.length})</Typography>
        <AddCar addCar={addCar} loadCars={loadCars} setStatus={setStatus} />
      </Box>
      <Box sx={{ flexGrow: 1, width: "80%", height: 300 }} >
        <AgGridReact
          rowData={cars}
          rowHeight={45}
          columnDefs={colDefs}
          gridOptions={gridOptions}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 50]} />
      </Box>
    </Stack>
  );
}