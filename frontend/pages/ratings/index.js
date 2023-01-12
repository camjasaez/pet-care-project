import {
  Card,
  CardBody,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Container,
  Box,
} from '@chakra-ui/react';
import { getCares } from '../../utils/getCaresData';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';

function Rating({ cares }) {
  const { checkAuth } = useAuth();
  console.log(cares);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container>
      <Text fontSize="3xl" fontWeight="bold" mb="1rem">
        Ratings
      </Text>
      <Box bg="white" h="5px" w="100%" />
      <Card size="sm" bg="#12595e">
        <CardBody>
          <TableContainer>
            <Table
              variant="simple"
              size="sm"
              bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
            >
              <Thead>
                <Tr>
                  <Th>Nombre mascota</Th>
                  <Th>Calificacion</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cares?.map(
                  (care) =>
                    care?.rating?.rating && (
                      <Tr key={care._id}>
                        <Td>{care.pet.name}</Td>
                        <Td>
                          <Flex
                            direction="column"
                            justify="center"
                            align="flex-start"
                          >
                            {care.rating.rating
                              ? `${'* '
                                  .repeat(care.rating.rating)
                                  .padEnd(10, '\u00A0')} - ${
                                  care.rating.rating
                                }/5`
                              : 'No calificado aun'}
                            <Popover>
                              <PopoverTrigger>
                                <Button isDisabled={!care.rating.comment}>
                                  Ver detalle
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Comentario</PopoverHeader>
                                <PopoverBody>{care.rating.comment}</PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Flex>
                        </Td>
                      </Tr>
                    )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Rating;

export async function getServerSideProps() {
  const data = await getCares();
  return {
    props: { cares: data },
  };
}
