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
import { getCareTaker } from "../../utils/getCareTakerData";
import { deleteCareTaker } from "../../utils/getCareTakerData";
import { Agregar } from "./agregar";
import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Caretaker({ caretaker }) {
  const router = useRouter();
  return (
    <Card direction={{ base: "column" }}>
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
                  <Tr>
                    <Td>{caretaker.name}</Td>
                    <Td>{caretaker.rut}</Td>
                    <Td isNumeric>{caretaker.number}</Td>
                    <Td>
                      <CardBody>
                        <Stack direction="row" spacing={4}>
                          <Button
                            onClick={() => router.push("/caretakers/agregar")}
                          >
                            agregar
                          </Button>

                          <Button
                          // onClick={() => router.push("/caretakers/editar")}
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
