import { API_URL } from './constants';

export async function getCares() {
  try {
    const res = await fetch(`${API_URL}/care`);
    if (res.status === 200) {
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCare(id) {
  try {
    const res = await fetch(`${API_URL}/care/${id}`, {
      method: 'DELETE',
    });
    console.log(res);
    return res.status === 200;
  } catch (error) {
    console.log(error);
  }
}
