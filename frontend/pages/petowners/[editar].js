import {
  Text,
  FormControl,
  Input,
  Button,
  Box,
  Stack,
  TableContainer,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { React } from "react";
import { useRouter } from "next/router";
import { editPetOwner } from "../../utils/getPetOwnerData";
import { set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../components/Auth";

function caretaker({}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const id_dueno = router.query.editar;

  const { register, handleSubmit } = useForm();

  const setValue = async (data) => {
    const duenoData = {
      rut: data.rut,
      name: data.name,
      lastName: data.lastName,
      number: data.number,
      email: data.email,
      address: data.address,
    };

    await editPetOwner(duenoData, id_dueno);
    router.push("/petowners");
  };

  return (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <Flex
          p="30px"
          bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
        >
          <TableContainer mt={4} w="100%">
            <Text fontWeight="bold" fontSize="3xl" mb="1rem">
              Editar Dueño
            </Text>
            <Box bg="white" h="5px" w="100%" />

            <form onSubmit={handleSubmit(setValue)}>
              <FormControl>
                <Text fontWeight="bold" mb="1rem">
                  Rut
                </Text>
                <Input
                  name="rut"
                  placeholder="Ingrese rut"
                  {...register("rut")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Nombre
                </Text>
                <Input
                  name="name"
                  placeholder="Ingrese nombre"
                  {...register("name")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Apellido
                </Text>
                <Input
                  name="lastName"
                  placeholder="Ingrese apellido"
                  {...register("lastName")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Numero
                </Text>
                <Input
                  name="number"
                  placeholder="Ingrese numero"
                  {...register("number")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Email
                </Text>
                <Input
                  name="email"
                  placeholder="Ingrese correo"
                  {...register("email")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Direccion
                </Text>
                <Input
                  name="address"
                  placeholder="Ingrese direccion"
                  {...register("address")}
                />
              </FormControl>
              <ButtonGroup spacing={4} mt="15px">
                <Button colorScheme="green" mr={3} type="submit" mt={4}>
                  Guardar
                </Button>
              </ButtonGroup>
            </form>
          </TableContainer>
        </Flex>
      </Stack>
    </Box>
  );
}
export default caretaker;
