import { Card, CardHeader, CardBody, CardFoote, Text } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Stack, Button } from '@chakra-ui/react';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';
import { getCareTaker, deleteCareTaker } from '../../utils/getCareTakerData';
import { useRouter } from 'next/router';

function Caretaker({ caretaker }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const accionEditar = (id) => {
    router.push(`/caretakers/${id}`);
  };

  const router = useRouter();

  return (
    <Card direction={{ base: 'column' }}>
      <CardHeader>
        <Text fontSize="2xl">Cuidadores</Text>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>nombre</Th>
                  <Th>rut</Th>
                  <Th isNumeric>numero de telefono</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {caretaker.map((caretaker) => (
                  <Tr key={caretaker._id}>
                    <Td>{caretaker.name}</Td>
                    <Td>{caretaker.rut}</Td>
                    <Td isNumeric>{caretaker.number}</Td>
                    <Td>
                      <CardBody>
                        <Stack direction="row" spacing={4}>
                          <Button
                            type="reset"
                            onClick={() => {
                              accionEditar(caretaker._id);
                            }}
                          >
                            editar
                          </Button>

                          <Button
                            onClick={() => {
                              deleteCareTaker(caretaker._id) &&
                                router.replace(router.asPath);
                            }}
                          >
                            eliminar
                          </Button>
                        </Stack>
                      </CardBody>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Card>
            <Button onClick={() => router.push('/caretakers/agregar')}>
              agregar cuidador
            </Button>
          </Card>
        </CardBody>
      </CardHeader>
    </Card>
  );
}

export async function getServerSideProps() {
  const data = await getCareTaker();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { caretaker: data },
  };
}
export default Caretaker;
