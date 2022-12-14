import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { getPets } from '../../utils/data/petData';

function Pet({ data }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Animal</Th>
            <Th>Raza</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((pet) => (
            <Tr key={pet._id}>
              <Td>{pet.name}</Td>
              <Td>{pet.animal}</Td>
              <Td>{pet.breed}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps() {
  const data = await getPets();

  return {
    props: { data },
  };
}

export default Pet;
