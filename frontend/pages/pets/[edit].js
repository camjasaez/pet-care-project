import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  TableContainer,
  Tooltip,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { updatePet, getPets } from '../../utils/data/petData';
import { respondInfo } from '../../utils/toast';
import { MdDone, MdOutlineClose, MdOutlineRemove } from 'react-icons/md';

function EditPet({ data }) {
  const router = useRouter();
  const id_pet = router.query.edit;

  const { register, handleSubmit } = useForm();

  const setValue = async (data) => {
    const petData = {
      name: data.name,
      animal: data.animal,
      breed: data.breed,
      description: data.description,
    };

    await updatePet(petData, id_pet);
    router.push('/pets');
  };

  return (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <TableContainer mt={4}>
          <Text fontWeight="bold" fontSize="3xl" mb="1rem">
            Editar Mascota
          </Text>
          <Box bg="white" h="5px" w="1000px" />
          <form onSubmit={handleSubmit(setValue)} autoComplete="off">
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Nombre
              </Text>
              <Input name="name" placeholder="Nombre" {...register('name')} />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Animal
              </Text>
              <Input
                name="animal"
                placeholder="Animal"
                {...register('animal')}
              />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Raza
              </Text>
              <Input name="breed" placeholder="Raza" {...register('breed')} />
            </FormControl>
            <FormControl mt={4} required>
              <Text fontWeight="bold" mb="1rem">
                Descripción
              </Text>
              <Input
                name="description"
                placeholder="Descripción"
                {...register('description')}
              />
            </FormControl>
            <Tooltip label="Aceptar">
              <Button
                colorScheme="green"
                mr={3}
                type="submit"
                onClick={() => {
                  respondInfo(
                    'La mascota ha sido editada exitosamente',
                    'Mascota editada'
                  );
                }}
                leftIcon={<MdDone />}
                mt={4}
              >
                Editar
              </Button>
            </Tooltip>
            <Tooltip label="Cancelar">
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => router.push('/pets')}
                type="reset"
                leftIcon={<MdOutlineClose />}
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

  return {
    props: { data },
  };
}

export default EditPet;
