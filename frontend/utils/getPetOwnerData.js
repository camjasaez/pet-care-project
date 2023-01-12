import { API_URL } from '../utils/constants';

export async function getPetOwner() {
  try {
    const res = await fetch(`${API_URL}/petowner`, {
      method: 'GET',
    });
    if (res.status === 200) {
      const responseData = await res.json();
      const { data } = responseData;
      return data;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePetOwner(id) {
  try {
    const res = await fetch(`${API_URL}/petowner/${id}`, {
      method: 'GET',
    });
    if (res.ok) {
      const responseData = await res.json();
      const { data } = responseData;
      const petsToEliminate = data?.pets.map((pet) => pet);

      await fetch(`${API_URL}/petowner/${id}`, {
        method: 'DELETE',
      });

      if (petsToEliminate.length > 0) {
        for (const element of petsToEliminate) {
          await fetch(`${API_URL}/pet/${element._id}`, {
            method: 'DELETE',
          });
        }
      }

      return;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function editPetOwner(petOwner, id) {
  try {
    const res = await fetch(`${API_URL}/petowner/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petOwner),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createPetOwner(petowner) {
  try {
    const res = await fetch(`${API_URL}/petowner/`, {
      method: 'POST',
      body: JSON.stringify(petowner),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status === 201 && console.log('Petowner created');
  } catch (error) {
    console.error(error);
  }
}
