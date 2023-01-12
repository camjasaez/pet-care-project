import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Stack,
  Button,
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

import { MdOutlineAdd, MdOutlineCreate, MdOutlineRemove } from "react-icons/md";
import { useEffect } from "react";
import { getPetOwner } from "../../utils/getPetOwnerData";
import { deletePetOwner } from "../../utils/getPetOwnerData";
import { useAuth } from "../../components/Auth";

function PetOwner({ petowner }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  return (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <Text fontSize="2xl">Dueños</Text>
        <Box bg="white" h="5px" w="1000px" />
        <Flex flexDirection="row" p="25">
          <Button
            colorScheme="blue"
            leftIcon={<MdOutlineAdd />}
            mx="2"
            onClick={() => router.push("/petowners/relleno")}
          >
            Agregar Dueños
          </Button>
        </Flex>

        {/* tabla de dueños */}
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
                <Tr key={petowner._id}>
                  <Td>{petowner.name}</Td>
                  <Td>{petowner.lastName}</Td>
                  <Td>{petowner.rut}</Td>
                  <Td isNumeric>{petowner.number}</Td>
                  <Td>{petowner.email}</Td>
                  <Td>{petowner.address}</Td>
                  <Td>
                    <Stack direction="row" spacing={4}>
                      <Button
                        leftIcon={<MdOutlineCreate />}
                        colorScheme="green"
                        onClick={() => {
                          router.push(`/petowners/${petowner._id}`);
                        }}
                        type="reset"
                        mx="2"
                      >
                        Editar
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deletePetOwner(petowner._id) &&
                            router.replace(router.asPath);
                        }}
                        leftIcon={<MdOutlineRemove />}
                        type="submit"
                        mx="2"
                      >
                        Eliminar
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
