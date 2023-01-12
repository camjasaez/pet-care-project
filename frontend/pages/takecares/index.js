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
  Container,
  Box,
} from '@chakra-ui/react';
import { getTakeCares } from '../../utils/getTakeCaresData';
import DetailsButton from '../../components/pagesComponents/takecares/DetailsButton';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';
import DetailsCaresButton from '../../components/pagesComponents/takecares/DetailsCaresButton';
import { MdOutlineAdd } from 'react-icons/md';

function Takecare({ data: takecare }) {
  const { user, checkAuth } = useAuth();

  const { pets = [] } = user?.petowner || [];

  const petByOwner = pets?.map((pet) => pet._id);

  useEffect(() => {
    checkAuth();
  }, []);

  const careTotalActives = (cares) =>
    cares.filter(({ withdrawn }) => !withdrawn).length;

  const router = useRouter();

  const UserLayout = (
    <Card bg="#12595e">
      <CardBody>
        <Flex alignItems="center" justifyContent="center">
          <TableContainer>
            <Table
              variant="simple"
              bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
            >
              <Thead>
                <Tr>
                  <Th>Nombre Cuidador</Th>
                  <Th>Nombre Mascota</Th>
                  <Th>Fecha de inicio</Th>
                  <Th>Detalles</Th>
                </Tr>
              </Thead>
              <Tbody>
                {takecare?.map(({ careTaker, cares, _id }) =>
                  cares.map(
                    (care) =>
                      petByOwner?.includes(care.pet._id) && (
                        <Tr key={care._id}>
                          <Td>{careTaker?.name}</Td>
                          <Td>{care.pet?.name}</Td>
                          <Td>
                            {new Date(care.entryDate).toLocaleDateString(
                              'es-ES',
                              {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                              }
                            )}
                          </Td>
                          <Td>
                            <DetailsCaresButton
                              cares={care}
                              petId={care.pet._id}
                            />
                          </Td>
                        </Tr>
                      )
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </CardBody>
    </Card>
  );

  const AdminLayout = (
    <Card bg="#12595e">
      <CardBody>
        <Button
          colorScheme="blue"
          leftIcon={<MdOutlineAdd />}
          mx="2"
          onClick={() => router.push('/takecares/cares')}
        >
          Añadir cuidado
        </Button>
        <Flex alignItems="center" justifyContent="center" mt="30px">
          <TableContainer>
            <Table
              variant="simple"
              bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
            >
              <Thead>
                <Tr>
                  <Th>Nombre Cuidador</Th>
                  <Th>Fecha de inicio</Th>
                  <Th>Cuidados activos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {takecare?.map(({ careTaker, cares, _id }) => (
                  <Tr key={_id}>
                    <Td>{careTaker?.name}</Td>
                    <Td>
                      {new Date(cares[0]?.entryDate).toLocaleDateString(
                        'es-ES',
                        {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                        }
                      )}
                    </Td>
                    <Td>{careTotalActives(cares)}</Td>
                    <Td>
                      <DetailsButton cares={cares} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </CardBody>
    </Card>
  );

  return (
    <Container maxW="5xl" h="100vh">
      <Text fontSize="3xl" fontWeight="bold" mb="1rem">
        Cuidados
      </Text>
      <Box bg="white" h="5px" w="100%" />
      {user?.type === 'admin' ? AdminLayout : UserLayout}
    </Container>
  );
}

export default Takecare;

export async function getServerSideProps() {
  const data = await getTakeCares();

  return {
    props: { data },
  };
}
