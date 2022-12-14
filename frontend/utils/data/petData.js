export async function getPets() {
  //Fetch es el que te hace las peticiones a la API
  const res = await fetch('http://localhost:5000/api/pet', { method: 'GET' });

  console.log(res.status);
  if (res.status === 204) return [];

  const pets = await res.json();

  const { data } = pets;
  return data;
}

export async function createPet(pet) {
  const res = await fetch('http://localhost:5000/api/pet', {
    method: 'POST',
    body: JSON.stringify(pet),
  });

  res.status === 201 && console.log('Pet created');
}
