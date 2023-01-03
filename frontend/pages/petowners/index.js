import { useRouter } from "next/router";

import {
  Card,
  CardHeader,
  CardBody,
  CardFoote,
  Text,
  Stack,
  Button,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { getPetOwner } from "../../utils/getPetOwnerData";
import { deletePetOwner } from "../../utils/getPetOwnerData";

function PetOwner({ petowner }) {
  const router = useRouter();
  return (
    <Card direction={{ base: "column" }}>
      <CardHeader>
        <Text fontSize="2xl">Dueños</Text>
        <CardBody>
          <Button onClick={() => router.push("/petowners/relleno")}>
            agregar dueños
          </Button>
        </CardBody>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Apellido</Th>
                  <Th>Rut</Th>
                  <Th isNumeric>Numero de telefono</Th>
                  <Th>Correo electronico</Th>
                  <Th>Direccion</Th>
                </Tr>
              </Thead>
              <Tbody>
                {petowner.map((petowner) => (
                  <Tr>
                    <Td>{petowner.name}</Td>
                    <Td>{petowner.lastName}</Td>
                    <Td>{petowner.rut}</Td>
                    <Td isNumeric>{petowner.number}</Td>
                    <Td>{petowner.email}</Td>
                    <Td>{petowner.address}</Td>
                    <Td>
                      <CardBody>
                        <Stack direction="row" spacing={4}>
                          <Button>editar</Button>

                          <Button
                            onClick={() => {
                              deletePetOwner(petowner._id) &&
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
        </CardBody>
      </CardHeader>
    </Card>
  );
}

export async function getServerSideProps() {
  const data = await getPetOwner();
  console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { petowner: data },
  };
}

export default PetOwner;
