import {
  Text,
  FormControl,
  Input,
  Button,
  Box,
  Stack,
  TableContainer,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { React } from "react";
import { useRouter } from "next/router";
import { editCareTakerData } from "../../utils/getCareTakerData";
import { set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../components/Auth";

function caretaker({}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const id_cuidador = router.query.editar;

  const { register, handleSubmit } = useForm();

  const setValue = async (data) => {
    const cuidadorData = {
      name: data.name,
      rut: data.rut,
      number: data.number,
    };

    await editCareTakerData(cuidadorData, id_cuidador);
    router.push("/caretakers");
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
              Editar Cuidador
            </Text>
            <Box bg="white" h="5px" w="100%" />

            <form onSubmit={handleSubmit(setValue)}>
              <FormControl>
                <Text fontWeight="bold" mb="1rem">
                  Nombre
                </Text>
                <Input
                  type="text"
                  placeholder="Ingrese nombre"
                  {...register("name")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Rut
                </Text>
                <Input
                  type="text"
                  placeholder="Ingrese rut"
                  {...register("rut")}
                />
                <Text fontWeight="bold" mb="1rem">
                  Numero
                </Text>

                <Input
                  type="text"
                  placeholder="Ingrese numero"
                  {...register("number")}
                />
                
              </FormControl>
              <ButtonGroup spacing={4} mt="15px">
                  <Button colorScheme="green" mr={3} type="submit" mt={4}>
                    guardar
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
