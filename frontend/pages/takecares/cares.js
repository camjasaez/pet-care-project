import {
  Card,
  CardHeader,
  Flex,
  CardBody,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { deleteCare } from '../../utils/getCaresData';
import { useAuth } from '../../components/Auth';
import { respondError, respondSuccess } from '../../utils/toast';
import { API_URL } from '../../utils/constants';

const Cares = ({ petOwners }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [cares, setCares] = useState([]); //cares
  const [selectCare, setSelectCare] = useState([]);
  const [submit, setSubmit] = useState(false);

  const { user } = useAuth() || {};

  const onSubmit = async (data) => {
    const newCare = {
      pet: data.pet,
    };

    const res = await fetch(`${API_URL}/care`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCare),
    });

    const {
      data: { _id },
    } = await res.json();
    setCares((prev) => [...prev, _id]);

    const petOwnerFilter = petOwners.filter(
      (petOwner) => petOwner._id === data.petOwner
    );

    const petFilter = petOwnerFilter[0].pets.filter(
      (pet) => pet._id === data.pet
    );

    setSelectCare((prev) => [
      ...prev,
      { petOwner: petOwnerFilter[0].name, pet: petFilter[0].name, idCare: _id },
    ]);
  };

  async function handleSubmitTakeCare() {
    setSubmit((submitState) => !submitState);
    const newTakeCare = {
      careTaker: user?.caretaker._id,
      cares,
    };

    const res = await fetch(`${API_URL}/takecare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTakeCare),
    });

    if (res.status === 201) {
      setSubmit((submitState) => !submitState);
      respondSuccess('Cuidado creado con exito!');
      router.push('/takecares');
      return;
    }
    respondError('Error al crear el cuidado!');
  }

  const [selectPetOwner, setSelectPetOwner] = useState([]);

  const handleChange = (event) => {
    setSelectPetOwner(event.target.value);
  };

  const handleDeleteCare = async (caresId) => {
    const res = await deleteCare(caresId);
    if (res) {
      setCares((prev) => prev.filter((care) => care !== caresId));
      setSelectCare((prev) => prev.filter((care) => care.idCare !== caresId));
      respondSuccess('Cuidado eliminado con exito!');
      return;
    }

    respondError('Error al eliminar el cuidado!');
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Card bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)">
        <CardHeader>
          {/* <Text align="center"> Busca el nombre de la mascota a cuidar</Text> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex pt="5px" gap={2} alignItems="end">
              <FormControl>
                <FormLabel>Ingresa el nombre del dueño</FormLabel>
                <Select
                  placeholder="Nombre del dueño"
                  {...register('petOwner', { required: true })}
                  onChange={handleChange}
                >
                  {petOwners?.map((petOwner) => (
                    <option key={petOwner._id} value={petOwner._id}>
                      {`${petOwner.name} ${petOwner.lastName}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Flex pt="5px" gap={2} alignItems="end">
              <FormControl>
                <FormLabel>Ingresa el nombre de la mascota</FormLabel>
                <Select
                  placeholder="Nombre de la mascota"
                  {...register('pet', { required: true })}
                >
                  {petOwners?.map(({ pets, _id }) => {
                    if (_id === selectPetOwner) {
                      return pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {`${pet.name} - ${pet.animal}`}
                        </option>
                      ));
                    }
                  })}
                </Select>
              </FormControl>
              <Button type="submit" isLoading={isSubmitting}>
                Añadir
              </Button>
            </Flex>
          </form>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre de la mascota</Th>
                  <Th>Nombre del dueño</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectCare.map((care) => (
                  <Tr key={care.pet}>
                    <Td>{care.pet}</Td>
                    <Td>{care.petOwner}</Td>
                    <Td>
                      <Button onClick={() => handleDeleteCare(care.idCare)}>
                        Borrar
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Divider />
          <Flex pt="20px" alignItems="center" justifyContent="space-evenly">
            <Button colorScheme="red" onClick={() => router.push('/takecares')}>
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleSubmitTakeCare}
              isLoading={submit}
            >
              Aceptar
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Cares;

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/petowner`);
  const { data: petOwners } = await res.json();
  return {
    props: { petOwners }, // will be passed to the page component as props
  };
}
