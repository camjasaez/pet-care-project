import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../utils/constants';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';
import { respondError, respondSuccess } from '../../utils/toast';

const Login = () => {
  const { login, user, redirect } = useAuth();

  useEffect(() => {
    if (user) {
      redirect('/');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const { rut } = data;

    const responseCareTaker = fetch(`${API_URL}/caretaker`);
    const responsePetOwner = fetch(`${API_URL}/petowner`);

    Promise.all([responseCareTaker, responsePetOwner])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((res) => {
        const [caretakers, petowners] = res;

        const { data: caretakersData } = caretakers;
        const { data: petownersData } = petowners;

        const caretaker = caretakersData.find(
          (caretaker) => caretaker.rut === rut
        );

        const petowner = petownersData.find((petowner) => petowner.rut === rut);

        if (caretaker) {
          login({ type: 'admin', caretaker });
          respondSuccess('Bienvenido');
          return;
        }

        if (petowner) {
          login({ type: 'user', petowner });
          respondSuccess('Bienvenido');
          return;
        }

        respondError('No se encontro el usuario');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="300px"
      margin="100px auto"
    >
      <Card align="center" maxW="sm" bg="linear-gradient(90deg, rgba(1,3,3,0.3253676470588235) 100%, rgba(79,209,197,1) 100%, rgba(79,209,197,1) 100%)">
        <CardHeader>
          <Heading>Login</Heading>
        </CardHeader>
        <CardBody>
          <Text>Ingresa tu rut, sin puntos ni guion</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NumberInput mt={4}>
              <NumberInputField
                placeholder="Ej: 123456789"
                size="sm"
                {...register('rut', {
                  required: true,
                  pattern: /^\d+$/,
                  maxLength: 9,
                })}
              />
              {errors.rut?.type === 'required' && (
                <Text color="red">El rut es querido</Text>
              )}
              {errors.rut?.type === 'pattern' && (
                <Text color="red">Formato no valido</Text>
              )}
            </NumberInput>
            <Button
              isLoading={isSubmitting}
              colorScheme="blue"
              type="submit"
              mt={4}
            >
              Entrar
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Login;
