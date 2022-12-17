import { API_URL } from './constants';

export async function getTakeCares() {
  try {
    const res = await fetch(`${API_URL}/takecare`);
    const { data } = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}
