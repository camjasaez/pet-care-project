import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import { getCares } from '../../utils/getCaresData';
import { useRouter } from 'next/router';

function Care({ data: cares }) {
  const router = useRouter();
  return (
    <Card>
      <CardBody>
        <Text>Pagina de Cares</Text>
        <Button onClick={() => router.replace(router.asPath)}>
          Recarga la wea
        </Button>
      </CardBody>
    </Card>
  );
}

export default Care;

export async function getServerSideProps() {
  const { data } = await getCares();

  return {
    props: { data },
  };
}
