import { get } from 'react-hook-form';
import { API_URL } from '../constants';

export async function getPets() {
  try {
    const res = await fetch(`${API_URL}/pet`, {
      method: 'GET',
    });

    console.log(res.status);
    if (res.status === 204) return [];

    const pets = await res.json();

    const { data } = pets;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPet(id) {
  try {
    const res = await fetch(`${API_URL}/pet/${id}`, {
      method: 'GET',
    });

    if (res.status === 204) return [];

    const pets = await res.json();

    const { data } = pets;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPet(pet, id) {
  try {
    const res = await fetch(`${API_URL}/pet/${id}`, {
      method: 'POST',
      body: JSON.stringify(pet),
      headers: { 'Content-type': 'application/json' },
    });

    res.status === 201 && console.log('Pet created');
  } catch (err) {
    console.log(err);
  }
}

export async function updatePet(petBody, petId) {
  try {
    const res = await fetch(`${API_URL}/pet/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(petBody),
      headers: { 'Content-type': 'application/json' },
    });

    res.status === 200 && console.log('Pet updated');
  } catch (err) {
    console.log(err);
  }
}

export async function deletePet(id) {
  try {
    const res = await fetch(`${API_URL}/pet/${id}`, {
      method: 'DELETE',
    });

    res.status === 204 && console.log('Pet deleted');
  } catch (err) {
    console.log(err);
  }
}

export async function getPetOwner() {
  try {
    const res = await fetch(`${API_URL}/petowner`, {
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

export async function getPetOwnerById(id) {
  try {
    const res = await fetch(`${API_URL}/petowner/${id}`, {
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
