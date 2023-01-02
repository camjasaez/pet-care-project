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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { getPetOwner } from "../../utils/getPetOwnerData";
import { deletePetOwner } from "../../utils/getPetOwnerData";

import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function PetOwner({ petowner }) {
  const router = useRouter();
  return (
    <Card direction={{ base: "column" }}>
      <CardHeader>
        <Text fontSize="2xl">Dueños</Text>
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
                          <Button
                            onClick={() =>
                              window.location.assign("../../petowners/relleno")
                            }
                          >
                            agregar
                          </Button>

                          <Button>editar</Button>

                          <Button
                            onClick={() => {
                              deletePetOwner(petowner._id) &&
                                router.reload(router.asPath);
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
            {/* </Stack> */}
          </TableContainer>
        </CardBody>
      </CardHeader>
    </Card>
  );
}

export async function getServerSideProps() {
  const data = await getPetOwner();
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
