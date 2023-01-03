import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Text,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../utils/constants';
import { useAuth } from '../../components/Auth';
import { useEffect } from 'react';

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
          return;
        }

        if (petowner) {
          login({ type: 'user', petowner });
          return;
        }

        //! recordar los Toast
        console.log('No encontradop');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md"> Login</Heading>
      </CardHeader>
      <CardBody>
        <Text>Ingresa tu rut, sin puntos ni guion</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NumberInput>
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
          <Button isLoading={isSubmitting} colorScheme="blue" type="submit">
            Entrar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default Login;
