import { Text, FormControl, Input, Button } from '@chakra-ui/react';
import { React } from 'react';
import { useRouter } from 'next/router';
import { editCareTakerData } from '../../utils/getCareTakerData';
import { set, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../../components/Auth';

function caretaker({}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const id_cuidador = router.query.editar;

  const { register, handleSubmit } = useForm();

  const setValue = async (data) => {
    const cuidadorData = {
      name: data.name,
      rut: data.rut,
      number: data.number,
    };

    await editCareTakerData(cuidadorData, id_cuidador);
    router.push('/caretakers');
  };

  return (
    <form onSubmit={handleSubmit(setValue)}>
      <FormControl>
        <Text fontWeight="bold" mb="1rem">
          Nombre
        </Text>
        <Input type="text" placeholder="Ingrese nombre" {...register('name')} />
        <Text fontWeight="bold" mb="1rem">
          Rut
        </Text>
        <Input type="text" placeholder="Ingrese rut" {...register('rut')} />
        <Text fontWeight="bold" mb="1rem">
          Numero
        </Text>

        <Input
          type="text"
          placeholder="Ingrese numero"
          {...register('number')}
        />

        <Button type="submit">guardar</Button>
      </FormControl>
    </form>
  );
}
export default caretaker;
