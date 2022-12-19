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
  Select,
  FormControl,
} from '@chakra-ui/react';
import {
  MdDone,
  MdOutlineClose,
  MdOutlineAdd,
  MdOutlineCreate,
  MdOutlineRemove,
} from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  getPets,
  createPet,
  deletePet,
  getPetOwner,
  updatePet,
} from '../../utils/data/petData';

function Pet({ data, owners }) {
  const [id, setId] = useState({ id: '' });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    const petData = {
      name: data.name,
      animal: data.animal,
      breed: data.breed,
      description: data.description,
    };

    createPet(petData, data.ownerId);
    router.replace(router.asPath);
  };

  const setValue = (data) => {
    const petData = {
      name: data.name,
      animal: data.animal,
      breed: data.breed,
      description: data.description,
    };

    updatePet(petData, id);
    router.replace(router.asPath);
  };

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  return (
    <TableContainer>
      {/* Boton para agregar */}
      <Button leftIcon={<MdOutlineAdd />} onClick={onAddOpen} type="reset">
        Agregar Mascota
      </Button>

      {/* Modal para agregar */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar mascota</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <ModalBody>
              <FormControl mt={4} isRequired>
                <Text fontWeight="bold" mb="1rem">
                  Dueño
                </Text>
                <Select
                  placeholder="Selecciona al Dueño"
                  {...register('ownerId')}
                >
                  {owners.map((owner) => (
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
                  onClick={() => onAddClose() && router.replace(router.asPath)}
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
                  onClick={() => onAddClose()}
                  type="reset"
                  leftIcon={<MdOutlineClose />}
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
                >
                  Limpiar
                </Button>
              </Tooltip>
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
                <Button
                  colorScheme="red"
                  onClick={() =>
                    deletePet(pet._id) && router.replace(router.asPath)
                  }
                  leftIcon={<MdOutlineRemove />}
                  type="submit"
                >
                  Eliminar
                </Button>
                <Button
                  leftIcon={<MdOutlineCreate />}
                  colorScheme="green"
                  onClick={() => {
                    onEditOpen();
                    setId(pet._id);
                  }}
                  type="reset"
                >
                  Editar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal para editar */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar mascota</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(setValue)} autoComplete="off">
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
                  onClick={onEditClose}
                  leftIcon={<MdDone />}
                >
                  Editar
                </Button>
              </Tooltip>
              <Tooltip label="Cancelar">
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => onEditClose()}
                  type="reset"
                  leftIcon={<MdOutlineClose />}
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
                >
                  Limpiar
                </Button>
              </Tooltip>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
}

export async function getServerSideProps() {
  const data = await getPets();
  const owners = await getPetOwner();

  return {
    props: { data, owners },
  };
}

export default Pet;
