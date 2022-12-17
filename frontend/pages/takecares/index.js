import {
  Card,
  CardHeader,
  CardBody,
  CardFoote,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Button,
} from '@chakra-ui/react';
import { getTakeCares } from '../../utils/getTakeCaresData';
import { useState } from 'react';
import DetailsButton from '../../components/pagesComponents/takecares/DetailsButton';
import { useRouter } from 'next/router';
function Takecare({ data: takecare }) {
  const [activeCares, setActiveCares] = useState(0);

  const careTotalActives = (cares) =>
    cares.filter(({ withdrawn }) => withdrawn).length;
  const router = useRouter();
  return (
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
                  <Th>Nombre</Th>
                  <Th>Numero</Th>
                  <Th>Cuidados activos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {takecare?.map(({ careTaker, cares }) => (
                  <Tr key={careTaker._id}>
                    <Td>{careTaker.name}</Td>
                    <Td>{careTaker.number}</Td>
                    <Td>{careTotalActives(cares)}</Td>
                    <Td>
                      <DetailsButton />
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
}

export default Takecare;

export async function getServerSideProps() {
  const data = await getTakeCares();

  return {
    props: { data },
  };
}
