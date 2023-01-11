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
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function editPetOwner(id) {
  try {
    const res = await fetch('http://localhost:5000/api/petowner/${id}', {
      method: 'PUT',
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
