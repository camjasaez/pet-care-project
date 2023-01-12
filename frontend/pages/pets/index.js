import {
  Tooltip,
  Text,
  Button,
  Table,
  Stack,
  Thead,
  Flex,
  Box,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import {
  MdOutlineAdd,
  MdOutlineCreate,
  MdOutlineRemove,
  MdSettingsBackupRestore,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { getPets, deletePet, getPetOwner } from '../../utils/data/petData';
import { respondError } from '../../utils/toast';
import { useAuth } from '../../components/Auth';

function Pet({ data }) {
  const { user, checkAuth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const pets = user?.petowner?.pets;

  useEffect(() => {
    checkAuth();
  }, []);

  const botonEliminar = () => {
    router.replace(router.asPath);
    respondError(
      'La mascota ha sido eliminada exitosamente',
      'Mascota eliminada'
    );
    onClose();
  };

  const editarMascota = (id) => {
    router.push(`/pets/${id}`);
  };

  const agregarMascota = () => {
    router.push('/pets/add');
  };

  const router = useRouter();

  const AdminLayout = (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <TableContainer mt={4}>
          {/* Titulo */}
          <Text fontSize="3xl" fontWeight="bold" mb="1rem">
            Mascotas
          </Text>
          <Box bg="white" h="5px" w="1000px" />

          {/* Boton para agregar */}
          <Flex flexDirection="row" p="25">
            <Button
              onClick={agregarMascota}
              colorScheme="blue"
              leftIcon={<MdOutlineAdd />}
              mx="2"
            >
              Agregar mascota
            </Button>

            <Button
              onClick={() => router.replace(router.asPath)}
              colorScheme="green"
              leftIcon={<MdSettingsBackupRestore />}
              mx="2"
            >
              Refrescar
            </Button>
          </Flex>

          {/* tabla */}
          <Flex justifyContent="center">
            <Table
              variant="simple"
              width="500px"
              height="300px"
              overflowY="scroll"
              bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
            >
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Animal</Th>
                  <Th>Raza</Th>
                  <Th>Descripción</Th>
                  <Th>Botones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((pet) => (
                  <Tr key={pet._id}>
                    <Td>{pet.name}</Td>
                    <Td>{pet.animal}</Td>
                    <Td>{pet.breed}</Td>
                    <Td> {pet.description}</Td>
                    <Td>
                    <Tooltip label="Editar">
                        <Button
                          leftIcon={<MdOutlineCreate />}
                          colorScheme="green"
                          onClick={() => {
                            editarMascota(pet._id);
                          }}
                          type="reset"
                          mx="2"
                        >
                          Editar
                        </Button>
                      </Tooltip>
                      <Tooltip label="Eliminar">
                        <Button
                          colorScheme="red"
                          onClick={onOpen}
                          leftIcon={<MdOutlineRemove />}
                          type="submit"
                          mx="2"
                        >
                          Eliminar
                        </Button>
                      </Tooltip>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Eliminar Mascota
                            </AlertDialogHeader>

                            <AlertDialogBody>¿Estas seguro?</AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  deletePet(pet._id) && botonEliminar()
                                }
                                ml={3}
                              >
                                Eliminar
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                      {/* <Tooltip label="Editar">
                        <Button
                          leftIcon={<MdOutlineCreate />}
                          colorScheme="green"
                          onClick={() => {
                            editarMascota(pet._id);
                          }}
                          type="reset"
                          mx="2"
                        >
                          Editar
                        </Button>
                      </Tooltip> */}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </TableContainer>
      </Stack>
    </Box>
  );

  const UserLayout = (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <TableContainer mt={4}>
          {/* Titulo */}
          <Text fontSize="3xl" fontWeight="bold" mb="1rem">
            Mascotas
          </Text>
          <Box bg="white" h="5px" w="1000px" />

          {/* tabla */}
          <Flex justifyContent="center">
            <Table
              variant="simple"
              width="500px"
              height="300px"
              overflowY="scroll"
              bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
            >
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Animal</Th>
                  <Th>Raza</Th>
                  <Th>Descripción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pets?.map((pet) => (
                  <Tr key={pet._id}>
                    <Td>{pet.name}</Td>
                    <Td>{pet.animal}</Td>
                    <Td>{pet.breed}</Td>
                    <Td> {pet.description}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </TableContainer>
      </Stack>
    </Box>
  );

  return user?.type === 'admin' ? AdminLayout : UserLayout;
}

export async function getServerSideProps() {
  const data = await getPets();
  const owners = await getPetOwner();

  return {
    props: { data, owners },
  };
}

export default Pet;
