import {
  Card,
  CardHeader,
  Flex,
  Text,
  Input,
  CardBody,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Divider,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Cares = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Card>
        <CardHeader>
          {/* <Text align="center"> Busca el nombre de la mascota a cuidar</Text> */}
          <Flex gap={2} alignItems="end">
            <FormControl>
              <FormLabel>Nombre de la mascota</FormLabel>
              <Select placeholder="Select country">
                {/* <option>United Arab Emirates</option>
                <option>Nigeria</option> */}
              </Select>
            </FormControl>
            <Button>Añadir</Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre de la mascota</Th>
                  <Th>Nombre del dueño</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Divider />
          <Flex pt="20px" alignItems="center" justifyContent="space-evenly">
            <Button colorScheme="red">Cancelar</Button>
            <Button colorScheme="teal">Aceptar</Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Cares;
