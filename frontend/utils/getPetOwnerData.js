export async function getPetOwner() {
  try {
    const res = await fetch("http://localhost:5000/api/petowner");
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
    const res = await fetch(`http://localhost:5000/api/petowner/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
export async function editPetOwner(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/petowner/${id}`, {
      method: "PUT",
    });
  } catch (error) {
    console.error(error);
  }
}
export async function postPetOwner(){
try {
    const data = {
        name: "Relleno",
        lastName: "Relleno",
        rut: "Relleno",
        email: "Relleno",
        address: "Relleno",
        phone: "Relleno"
      };

    const res = await fetch("http://localhost:5000/api/petowner");
    method: "POST"
    if (res.status === 200) {
      const responseData = await res.json(data);
      const { data } = responseData;
      return data;
    }
    res.status === 201 && console.log("Dueño agregado");
    return null;
  } catch (error) {
    console.error(error);
  } 
}
