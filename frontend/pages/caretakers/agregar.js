import {
  Card,
  CardHeader,
  CardBody,
  CardFoote,
  Text,
  Spacer,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  Box,
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import { Router } from "next/router";
import { useRouter } from "next/router";
import { useAuth } from "../../components/Auth";
import { postCareTaker } from "../../utils/getCareTakerData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function caretaker({}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postCareTaker(data);
  };

  return (
    <Box>
      <Stack alignItems="center" justifyContent="center">
        <Flex
          p="40px"
          bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)"
        >
          <TableContainer>
            <Text fontSize="3xl" fontWeight="bold" mb="1rem">
              Agregar Cuidador
            </Text>
            <Box bg="white" h="5xp" w="100%" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Nombre:</FormLabel>

                <Input placeholder=" Nombre" {...register("name")} />
              </FormControl>
              <FormControl>
                <FormLabel>Rut:</FormLabel>

                <Input placeholder="Rut" {...register("rut")} />
              </FormControl>
              <FormControl>
                <FormLabel>Telefono:</FormLabel>

                <Input placeholder="Numero " {...register("number")} />
              </FormControl>
              <Button
                type="submit"
                isLoading={isSubmitting}
                onClick={() => router.push("/caretakers")}
                mt="15px"
                colorScheme="teal"
              >
                Guardar
              </Button>
            </form>
          </TableContainer>
        </Flex>
      </Stack>
    </Box>
  );
}

export default caretaker;
