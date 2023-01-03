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

//!Esto deberia venir desde el login
const CARE_TAKER_ID = '63b23d2227677615315b8ccb';
//!

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

  const onSubmit = async (data) => {
    const newCare = {
      pet: data.pet,
    };

    const res = await fetch(`http://localhost:5000/api/care`, {
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
      careTaker: CARE_TAKER_ID,
      cares,
    };

    const res = await fetch(`http://localhost:5000/api/takecare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTakeCare),
    });

    if (res.status === 201) {
      setSubmit((submitState) => !submitState);
      router.push('/takecares');
      return;
    }
    console.log('Error!'); //!Recordar poner los toast correspondientes
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
      return;
    }

    //!Recordar poner los toast correspondientes
    console.log('Error Eliminando el cuidado!');
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Card>
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

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:5000/api/petowner`);
  const { data: petOwners } = await res.json();
  return {
    props: { petOwners }, // will be passed to the page component as props
  };
}
