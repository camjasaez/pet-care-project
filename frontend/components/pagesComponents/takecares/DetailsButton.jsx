import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { respondError, respondSuccess } from '../../../utils/toast';

const DetailsButton = ({ cares }) => {
  const [submit, setSubmit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleWithdrawal = async (retirated, withdrawnId) => {
    setSubmit((submitState) => !submitState);

    const body = { withdrawn: !retirated };
    const res = await fetch(`http://localhost:5000/api/care/${withdrawnId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setSubmit((submitState) => !submitState);
      router.replace(router.asPath);
      respondSuccess('Se ha realizado correctamente');
      return;
    }
    respondError('Ha ocurrido un error');
  };

  return (
    <>
      <Button onClick={onOpen}>Detalle</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" size="md">
                <TableCaption>Lista de los cuidados de ...</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Nombre mascota</Th>
                    <Th>Fecha de entrada</Th>
                    <Th>Fecha de salida</Th>
                    <Th> ¿Retirado? </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cares?.map((care) => (
                    <Tr key={care._id}>
                      <Td>{care?.pet?.name}</Td>
                      <Td>
                        {new Date(care.entryDate).toLocaleDateString('es-ES', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                        })}
                      </Td>
                      <Td>
                        {care.exitDate
                          ? new Date(care.exitDate).toLocaleDateString(
                              'es-ES',
                              {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                              }
                            )
                          : ''}
                      </Td>
                      <Td>{care.withdrawn ? 'Si' : 'No'}</Td>
                      <Td>
                        <Button
                          isLoading={submit}
                          onClick={() =>
                            handleWithdrawal(care.withdrawn, care._id)
                          }
                        >
                          {care.withdrawn ? 'Devolver' : 'Retirar'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsButton;
