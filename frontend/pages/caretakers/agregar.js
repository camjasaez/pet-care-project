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
} from '@chakra-ui/react';
import { Router } from 'next/router';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/Auth';
import { postCareTaker } from '../../utils/getCareTakerData';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <label>
          Nombre:
          <Input {...register('name')} />
        </label>
        <label>
          Rut:
          <Input {...register('rut')} />
        </label>
        <label>
          Telefono:
          <Input {...register('number')} />
        </label>
        <Button
          type="submit"
          isLoading={isSubmitting}
          onClick={() => router.push('/caretakers')}
        >
          guardar
        </Button>
      </FormControl>
    </form>
  );
}

export default caretaker;
