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
  TableCaption,
  TableContainer,
  Flex,
  Button,
} from '@chakra-ui/react';
import { getTakeCares } from '../../utils/getTakeCaresData';
import DetailsButton from '../../components/pagesComponents/takecares/DetailsButton';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';
import DetailsCaresButton from '../../components/pagesComponents/takecares/DetailsCaresButton';

function Takecare({ data: takecare }) {
  const { user, checkAuth } = useAuth();

  const { pets = [] } = user?.petowner;

  console.log(pets);
  const petByOwner = pets?.map((pet) => pet);

  console.log('take kare', takecare);
  useEffect(() => {
    checkAuth();
  }, []);

  const careTotalActives = (cares) =>
    cares.filter(({ withdrawn }) => !withdrawn).length;

  const router = useRouter();

  console.log(user);
  const UserLayout = (
    <Card>
      <CardBody>
        <Text>Pagina de XYX</Text>
        <Flex alignItems="center" justifyContent="center">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                  petByOwner?.map((pet, index) => (
                    <Tr key={`${_id + pet._id}`}>
                      <Td>{careTaker?.name}</Td>
                      <Td>{pet.name}</Td>
                      <Td>
                        {new Date(cares[index]?.entryDate).toLocaleDateString(
                          'es-ES',
                          {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          }
                        )}
                      </Td>
                      <Td>
                        <DetailsCaresButton pet={pet} cares={cares[index]} />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </CardBody>
    </Card>
  );

  const AdminLayout = (
    <Card>
      <CardBody>
        <Text>Pagina de Takecare</Text>
        <Button onClick={() => router.push('/takecares/cares')}>
          Añadir cuidado
        </Button>
        <Flex alignItems="center" justifyContent="center">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
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

  return user?.type === 'admin' ? AdminLayout : UserLayout;
}

export default Takecare;

export async function getServerSideProps() {
  const data = await getTakeCares();

  return {
    props: { data },
  };
}
