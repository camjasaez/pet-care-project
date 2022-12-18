import { get } from 'react-hook-form';

export async function getPets() {
  try {
    const res = await fetch('http://localhost:5000/api/pet', { method: 'GET' });

    console.log(res.status);
    if (res.status === 204) return [];

    const pets = await res.json();

    const { data } = pets;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPetOwner() {
  try {
    const res = await fetch('http://localhost:5000/api/petowner', {
      method: 'GET',
    });

    console.log(res.status);
    if (res.status === 204) return [];

    const owners = await res.json();

    const { data } = owners;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPet(pet, id) {
  try {
    const res = await fetch(`http://localhost:5000/api/pet/${id}`, {
      method: 'POST',
      body: JSON.stringify(pet),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    res.status === 201 && console.log('Pet created');
  } catch (err) {
    console.log(err);
  }
}

export async function updatePet(pet) {
  try {
    const res = await fetch(`http://localhost:5000/api/pet/${pet.id}`, {
      method: 'PUT',
      body: JSON.stringify(pet),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    res.status === 200 && console.log('Pet updated');
  } catch (err) {
    console.log(err);
  }
}

export async function deletePet(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/pet/${id}`, {
      method: 'DELETE',
    });

    res.status === 204 && console.log('Pet deleted');
  } catch (err) {
    console.log(err);
  }
}
