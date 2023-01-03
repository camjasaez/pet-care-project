import React from 'react';
import { useRouter } from 'next/router';
import { getPets, createPet, getPetOwner } from '../../utils/data/petData';
import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Text,
  TableContainer,
  Tooltip,
  Stack,
} from '@chakra-ui/react';
import { MdDone, MdOutlineClose, MdOutlineRemove } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { respondSuccess } from '../../utils/toast';
import { useEffect } from 'react';

import { useAuth } from '../../components/Auth';

function AddPet({ owners }) {
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const petData = {
      name: data.name,
      animal: data.animal,
      breed: data.breed,
      description: data.description,
    };

    createPet(petData, data.ownerId);
    router.push('/pets');
  };

  return (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <TableContainer mt={4}>
          <Text fontWeight="bold" fontSize="3xl" mb="1rem">
            Agregar Mascota
          </Text>
          <Box bg="white" h="5px" w="1000px" />
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" required>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Dueño
              </Text>
              <Select
                placeholder="Selecciona al Dueño"
                {...register('ownerId')}
              >
                {owners &&
                  owners.map((owner) => (
                    <option key={owner._id} value={owner._id}>
                      {owner.name}
                    </option>
                  ))}
              </Select>
              <Text fontWeight="bold" mb="1rem">
                Nombre
              </Text>
              <Input placeholder="Nombre" {...register('name')} />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Animal
              </Text>
              <Input placeholder="Animal" {...register('animal')} />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Raza
              </Text>
              <Input placeholder="Raza" {...register('breed')} />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Descripción
              </Text>
              <Input placeholder="Descripción" {...register('description')} />
            </FormControl>

            <Tooltip label="Aceptar">
              <Button
                colorScheme="green"
                mr={3}
                type="submit"
                onClick={() => {
                  respondSuccess(
                    'La mascota ha sido agregada exitosamente',
                    'Mascota agregada'
                  );
                }}
                mt={4}
                isLoading={isSubmitting}
                leftIcon={<MdDone />}
              >
                Agregar
              </Button>
            </Tooltip>
            <Tooltip label="Cancelar">
              <Button
                colorScheme="red"
                mr={3}
                type="reset"
                leftIcon={<MdOutlineClose />}
                onClick={() => {
                  router.push('/pets');
                }}
                mt={4}
              >
                Cancelar
              </Button>
            </Tooltip>
            <Tooltip label="Limpiar">
              <Button
                colorScheme="blue"
                mr={3}
                type="reset"
                leftIcon={<MdOutlineRemove />}
                mt={4}
              >
                Limpiar
              </Button>
            </Tooltip>
          </form>
        </TableContainer>
      </Stack>
    </Box>
  );
}
export async function getServerSideProps() {
  const data = await getPets();
  const owners = await getPetOwner();

  return {
    props: { data, owners },
  };
}
export default AddPet;
