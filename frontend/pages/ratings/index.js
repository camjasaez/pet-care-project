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
} from '@chakra-ui/react';
import { getCares } from '../../utils/getCaresData';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';

function Rating({ cares }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container>
      <Card size="sm">
        <CardBody>
          <Text>Pagina de Ratings</Text>
          <TableContainer>
            <Table variant="simple" size="sm">
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
