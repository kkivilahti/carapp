export async function getCars() {
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.cars;
}

export async function deleteCar(car) {
    const response = await fetch(car._links.car.href, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
}

export async function addCar(car) {
    console.log("function addCar");
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(car),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}

export async function updateCar(url, car) {
    console.log("function updateCar");
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(car),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}