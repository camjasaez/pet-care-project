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
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Heading,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../../utils/constants';
import { respondError, respondSuccess } from '../../../utils/toast';
import { useEffect, useState } from 'react';

const DetailsCaresButton = ({ petId, cares }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setActiveRating(false);
    const res = await fetch(`${API_URL}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      const myRating = await res.json();
      const resRating = await fetch(
        `${API_URL}/care/${cares._id}/rating/${myRating.data._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (resRating.status === 200) {
        respondSuccess('Calificacion enviada correctamente');
        return;
      }
    }
    respondError('Error al enviar la calificacion');
  };
  const [activeRating, setActiveRating] = useState(false);
  const [pet, setPet] = useState({});

  const rating = cares?.rating?.rating || 0;
  const comment = cares?.rating?.comment || '';

  useEffect(() => {
    fetch(`${API_URL}/pet/${petId}`)
      .then((res) => res.json())
      .then((res) => setPet(res.data));
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Detalle</Button>

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
          <ModalHeader>Informacion de {pet?.name}</ModalHeader>
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
                      <Flex direction="column">
                        {rating
                          ? `${'* '
                              .repeat(rating)
                              .padEnd(10, '\u00A0')} - ${rating}/5`
                          : 'No calificado aun'}
                        <Popover>
                          <PopoverTrigger>
                            <Button isDisabled={!comment}>Ver detalle</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Comentario</PopoverHeader>
                            <PopoverBody>{comment}</PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Flex>
                    </Td>
                    <Td> {cares?.withdrawn ? 'Retirado' : 'No retirado'} </Td>
                    <Td>
                      {cares?.exitDate
                        ? new Date(cares.exitDate).toLocaleDateString('es-ES', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          })
                        : ''}
                    </Td>
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
                      isLoading={isSubmitting}
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
