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
