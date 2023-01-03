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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  StackDivider,
  Heading,
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../../utils/constants';
const DetailsCaresButton = ({ pet, cares }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(`${API_URL}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      console.log('Calificacion guardada');
      const myRating = await res.json();
      console.log(myRating);
    }
  };
  const [activeRating, setActiveRating] = useState(false);

  const rating = cares?.rating?.rating || 0;

  const { id, name } = pet;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button onClick={onOpen}>Detalle X</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setActiveRating(false);
        }}
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informacion de {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Puntuacion</Th>
                    <Th> ¿Retirado? </Th>
                    <Th>Fecha de salida</Th>
                    <Th>Calificar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      {rating
                        ? `${'* '
                            .repeat(rating)
                            .padEnd(10, '\u00A0')} - ${rating}/5`
                        : 'No calificado aun'}
                    </Td>
                    <Td> {cares?.withdrawn ? 'Retirado' : 'No retirado'} </Td>
                    <Td>{cares?.exitDate}</Td>
                    <Td>
                      <Button
                        isDisabled={!cares?.withdrawn}
                        onClick={() => setActiveRating((prev) => !prev)}
                      >
                        Calificar
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            {activeRating && (
              <Card>
                <CardHeader>
                  <Heading size="md">Calificar cuidado de {name}</Heading>
                </CardHeader>

                <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box mb="10px">
                        <Heading size="xs" textTransform="uppercase" mb="10px">
                          Calificacion
                        </Heading>
                        <FormControl>
                          <RadioGroup>
                            <Stack direction="row">
                              <Radio
                                value="1"
                                {...register('rating', {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                              >
                                1
                              </Radio>
                              <Radio
                                value="2"
                                {...register('rating', {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                              >
                                2
                              </Radio>
                              <Radio
                                value="3"
                                {...register('rating', {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                              >
                                3
                              </Radio>
                              <Radio
                                value="4"
                                {...register('rating', {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                              >
                                4
                              </Radio>
                              <Radio
                                value="5"
                                {...register('rating', {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                              >
                                5
                              </Radio>
                            </Stack>
                          </RadioGroup>
                          <FormHelperText>
                            Selecciona la puntuacion que le das al cuidado.
                          </FormHelperText>
                        </FormControl>
                      </Box>
                      <Box>
                        <Heading pb="5px" size="xs" textTransform="uppercase">
                          Comentario
                        </Heading>
                        <FormControl>
                          <Input
                            type="text"
                            {...register('comment', { required: true })}
                          />
                          <FormHelperText>
                            Comenta porfavor que tal estuvo el cuidado.
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Stack>
                    <Button
                      mt="10px"
                      colorScheme="blue"
                      type="submit"
                      // onClick={onClose}
                    >
                      Añadir calificacion
                    </Button>
                  </form>
                </CardBody>
              </Card>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setActiveRating(false);
              }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsCaresButton;
