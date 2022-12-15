import {
  Tooltip,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  resolveStyleConfig,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getPets, createPet, deletePet } from '../../utils/data/petData';

function Pet({ data }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    createPet(data);
    router.replace(router.asPath);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <TableContainer>
      {/* Boton para agregar */}
      <Button onClick={onOpen} type="reset">
        Agregar Mascota
      </Button>

      {/* Modal para agregar */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar mascota</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <ModalBody>
              <FormControl mt={4} isRequired>
                <Text fontWeight="bold" mb="1rem">
                  Nombre
                </Text>
                <Input placeholder="Nombre" {...register('name')} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <Text fontWeight="bold" mb="1rem">
                  Animal
                </Text>
                <Input placeholder="Animal" {...register('animal')} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <Text fontWeight="bold" mb="1rem">
                  Raza
                </Text>
                <Input placeholder="Raza" {...register('breed')} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <Text fontWeight="bold" mb="1rem">
                  Descripción
                </Text>
                <Input placeholder="Descripción" {...register('description')} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Tooltip label="Aceptar">
                <Button
                  colorScheme="green"
                  mr={3}
                  type="submit"
                  onClick={onClose}
                  isLoading={isSubmitting}
                >
                  Agregar
                </Button>
              </Tooltip>
              <Tooltip label="Cancelar">
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
              </Tooltip>
              <Button colorScheme="red" mr={3} type="reset">
                Borrar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* tabla */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Animal</Th>
            <Th>Raza</Th>
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
                <Button
                  colorScheme="red"
                  onClick={() =>
                    deletePet(pet._id) && router.replace(router.asPath)
                  }
                  type="submit"
                >
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps() {
  const data = await getPets();

  return {
    props: { data },
  };
}

export default Pet;
