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
import { React } from "react";
import { Router } from "next/router";
import { useRouter } from "next/router";
import { editCareTakerData } from "../../utils/getCareTakerData";
import { useForm } from "react-hook-form";

function caretaker({}) {
  const router = useRouter();
  const onSubmit = (data) => {
    const_id = router.query.id;
    console.log(data);
    editCareTakerData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input type="text" placeholder="name" {...register("name")} />
        <Input type="text" placeholder="rut" {...register("rut")} />
        <Input type="text" placeholder="number" {...register("number")} />

        <Button
          type="submit"
          isLoading={isSubmitting}
          onClick={() => router.push("/caretakers")}
        >
          guardar
        </Button>
      </FormControl>
    </form>
  );
}
export default caretaker;
