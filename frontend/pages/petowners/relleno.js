import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Spacer,
  Box,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { createPetOwner, getPetOwner } from "../../utils/getPetOwnerData";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Petowner({}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const aux = {
      rut: data.rut,
      name: data.name,
      lastName: data.lastName,
      number: data.number,
      email: data.email,
      address: data.address,
    };

    console.log(aux);
    createPetOwner(aux);
    router.push("/petowners");
  };

  return (
    <Box>
      <Stack  alignItems="center" justifyContent="center">
      <Flex  p= "30px" bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)">
    
        <TableContainer>
          <Text fontSize="3xl" fontWeight="bold" mb="1rem">
            Agregar Dueño
          </Text>
          
          <Box bg="white" h="5xp" w="100%" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="rut">
                <FormLabel>Rut</FormLabel>
                <Input placeholder="Rut" {...register("rut")} />
              </FormControl>
              <FormControl id="name">
                <Text fontWeight="bold" mb="1rem">
                  Nombre
                </Text>
                <Input placeholder="Nombre" {...register("name")} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Apellido</FormLabel>
                <Input placeholder="Apellido" {...register("lastName")} />
              </FormControl>

              <Stack spacing={2} direction="row">
                <FormControl id="number">
                  <FormLabel>Telefono</FormLabel>
                  <Input
                    placeholder="+569 + Su numero"
                    {...register("number")}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" {...register("email")} />
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row">
                <FormControl id="address">
                  <FormLabel>Direccion</FormLabel>
                  <Input placeholder="Direccion" {...register("address")} />
                </FormControl>
              </Stack>
              <Stack spacing={2} direction="row">

            <ButtonGroup spacing={4} mt="15px">
              
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Guardar Dueño
              </Button>
              <Button onClick={() => router.push("/petowners")}>Atras</Button>
            </ButtonGroup>
            </Stack>
            </form>

            
        </TableContainer>
        </Flex>

      </Stack>

    </Box>
  );
}

{
  /* <Card direction={{ base: "column" }}>
      <CardHeader>
        <Text>Pagina de Petowner</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>

            <Stack spacing={2} direction="row">
              <FormControl id="rut">
                <FormLabel>Rut</FormLabel>
                <Input placeholder="Rut" {...register("rut")} />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Nombre</FormLabel>
                <Input placeholder="Nombre" {...register("name")} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Apellido</FormLabel>
                <Input placeholder="Apellido" {...register("lastName")} />
              </FormControl>
            </Stack>
            <Stack spacing={2} direction="row">
              <FormControl id="number">
                <FormLabel>Telefono</FormLabel>
                <Input placeholder="+569 + Su numero" {...register("number")} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" {...register("email")} />
              </FormControl>
            </Stack>
            <Stack spacing={2} direction="row">
              <FormControl id="address">
                <FormLabel>Direccion</FormLabel>
                <Input placeholder="Direccion" {...register("address")} />
              </FormControl>
            </Stack>
            <CardBody>
            <ButtonGroup spacing={4}>
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                Guardar Dueño
              </Button>
              <Button onClick={() => router.push("/petowners")}>atras</Button>
            </ButtonGroup>
            </CardBody>
          </CardBody>
        </form>
      </CardHeader>
    </Card> */
}

export async function getServerSideProps() {
  const data = await getPetOwner();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { petowners: data },
  };
}

export default Petowner;
