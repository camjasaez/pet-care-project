import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { Stack, Button } from "@chakra-ui/react";
import { useAuth } from "../../components/Auth";
import { useEffect } from "react";
import { getCareTaker, deleteCareTaker } from "../../utils/getCareTakerData";
import { useRouter } from "next/router";
import { MdOutlineAdd, MdOutlineCreate, MdOutlineRemove } from "react-icons/md";

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
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <Text fontSize="2xl">Cuidadores</Text>
        <Box bg="white" h="5px" w="1000px" />
        <Flex flexDirection="row" p="25">
          <Button
            colorScheme="blue"
            leftIcon={<MdOutlineAdd />}
            mx="2"  
            onClick={() => router.push("/caretakers/agregar")}
          >
            agregar cuidador
          </Button>
        </Flex>
        {/* tabla */}
        <Flex justifyContent="center">
          <Table
            variant="simple"
            width="500px"
            height="300px"
            overflowY="scroll"
            bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
          >
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
                    <Stack direction="row" spacing={4}>
                      <Button
                        colorScheme="green"
                        leftIcon={<MdOutlineCreate />}
                        type="reset"
                        onClick={() => {
                          accionEditar(caretaker._id);
                        }}
                        mx="2"
                      >
                        editar
                      </Button>

                      <Button
                        colorScheme={"red"}
                        onClick={() => {
                          deleteCareTaker(caretaker._id) &&
                            router.replace(router.asPath);
                        }}
                        leftIcon={<MdOutlineRemove />}
                        type="submit"
                        mx="2"
                      >
                        eliminar
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Stack>
    </Box>
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
