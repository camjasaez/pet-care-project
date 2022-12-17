import { API_URL } from './constants';

export async function getCares() {
  try {
    const res = await fetch(`${API_URL}/care`);
    const { data } = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}
