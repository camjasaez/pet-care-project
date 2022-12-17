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
} from '@chakra-ui/react';
import { getTakeCares } from '../../utils/getTakeCaresData';

function Takecare({ data: takecare }) {
  console.log(takecare);

  const careTotalActives = (cares) => {
    console.log('cares', cares);
    return cares.filter(({ withdrawn }) => withdrawn).length || 0;
  };

  return (
    <Card>
      <CardBody>
        <Text>Pagina de Takecare</Text>
        <Flex alignItems="center" justifyContent="center">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>into</Th>
                  <Th>Cuidados activos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {takecare?.map(({ careTaker, cares }) => (
                  <Tr key={careTaker._id}>
                    <Td>{careTaker.name}</Td>
                    <Td>{careTaker.number}</Td>
                    <Td>{cares.length}</Td>
                    {/*//!Mejorar esto, debe ser el largo de solo los activos */}
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
  const { data } = await getTakeCares();

  return {
    props: { data },
  };
}
