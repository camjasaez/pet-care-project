import { Text, FormControl, Input, Button } from '@chakra-ui/react';
import { React } from 'react';
import { useRouter } from 'next/router';
import { editPetOwner } from '../../utils/getPetOwnerData';
import { set, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../../components/Auth';

function caretaker({}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const id_dueno = router.query.editar;

  const { register, handleSubmit } = useForm();

  const setValue = async (data) => {
    const duenoData = {
      rut: data.rut,
      name: data.name,
      lastName: data.lastName,
      number: data.number,
      email: data.email,
      address: data.address,
    };

    console.log(duenoData);
    await editPetOwner(duenoData, id_dueno);
    router.push('/petowners');
  };

  return (
    <form onSubmit={handleSubmit(setValue)}>
      <FormControl>
        <Text fontWeight="bold" mb="1rem">
          Rut
        </Text>
        <Input name="rut" placeholder="Ingrese rut" {...register('rut')} />
        <Text fontWeight="bold" mb="1rem">
          Nombre
        </Text>
        <Input name="name" placeholder="Ingrese nombre" {...register('name')} />
        <Text fontWeight="bold" mb="1rem">
          Apellido
        </Text>
        <Input
          name="lastName"
          placeholder="Ingrese apellido"
          {...register('lastName')}
        />
        <Text fontWeight="bold" mb="1rem">
          Numero
        </Text>
        <Input
          name="number"
          placeholder="Ingrese numero"
          {...register('number')}
        />
        <Text fontWeight="bold" mb="1rem">
          Email
        </Text>
        <Input
          name="email"
          placeholder="Ingrese correo"
          {...register('email')}
        />
        <Text fontWeight="bold" mb="1rem">
          Direccion
        </Text>
        <Input
          name="address"
          placeholder="Ingrese direccion"
          {...register('address')}
        />

        <Button type="submit">guardar</Button>
      </FormControl>
    </form>
  );
}
export default caretaker;
