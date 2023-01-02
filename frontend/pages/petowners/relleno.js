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
} from "@chakra-ui/react";
import { postPetOwner } from "../../utils/getPetOwnerData";

function Petowner({ }) {

  return (
    <Card direction={{ base: "column" }}>
      <CardHeader>
        <Text>Pagina de Petowner</Text>
        <CardBody>
          <Stack spacing={2} direction="row">
            <FormControl id="first-name" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input placeholder="Nombre" />
            </FormControl>
            <FormControl id="last-name" isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input placeholder="Apellido" />
            </FormControl>
          </Stack>
        </CardBody>

        <CardBody>
          <Stack spacing={2} direction="row">
            <FormControl id="rut" isRequired>
              <FormLabel>Rut</FormLabel>
              <Input placeholder="Rut" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
          </Stack>
        </CardBody>

        <CardBody>
          <Stack spacing={2} direction="row">
            <FormControl id="address" isRequired>
              <FormLabel>Direccion</FormLabel>
              <Input placeholder="Direccion" />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder="+569 + Su numero" />
            </FormControl>
          </Stack>
        </CardBody>

        <CardBody>
          <Stack spacing={2} direction="row">
            <Button
              colorScheme="orange"
              onClick={() => {
                postPetOwner( );

              }}
            >
              Guardar Dueño
            </Button>
          </Stack>
        </CardBody>
      </CardHeader>
    </Card>
  );
}

// export async function getServerSideProps() {
//   const data = await postPetOwner();
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { petowner: data },
//   };
// }

export default Petowner;
