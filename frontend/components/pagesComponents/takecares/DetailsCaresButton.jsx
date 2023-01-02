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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const DetailsCaresButton = ({ pet, cares }) => {
  const {
    rating: { rating },
  } = cares;

  const { id, name } = pet;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button onClick={onOpen}>Detalle X</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informacion de {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" size="md">
                <TableCaption>Lista de los cuidados de ...</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Puntuacion</Th>
                    <Th> ¿Retirado? </Th>
                    <Th>Fecha de salida</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{`${'* '
                      .repeat(rating)
                      .padEnd(10, '\u00A0')} - ${rating}/5`}</Td>
                    <Td> {cares.withdrawn ? 'Retirado' : 'No retirado'} </Td>
                    <Td>{cares.exitDate}</Td>
                  </Tr>
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

export default DetailsCaresButton;
