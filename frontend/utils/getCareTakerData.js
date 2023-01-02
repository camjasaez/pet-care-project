export async function getCareTaker() {
  try {
    const res = await fetch("http://localhost:5000/api/caretaker");
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
export async function deleteCareTaker(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/caretaker/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
export async function editCareTakerData(data) {
  try {
    const res = await fetch(`http://localhost:5000/api/caretaker`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
}
export async function postCareTaker(data) {
  try {
    const res = await fetch(`http://localhost:5000/api/caretaker`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    res.status === 201 && console.log("Cuidador agregado");
  } catch (error) {
    console.er(error);
  }
}
