import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Card,
  Stack,
  CardBody,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { getPets } from '../utils/data/petData';
import { useAuth } from '../components/Auth';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home({ data: number }) {
  const totalNumber = number.length || 0;
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Box>
      <Grid
        templateAreas={`"header header"
                  "main main"
                  " footer footer"`}
        gridTemplateRows={'1fr 1fr 1fr'}
        gridTemplateColumns={'150px 1fr'}
        h="100vh"
        fontWeight="bold"
      >
        <GridItem pl="2" area={'header'}></GridItem>
        <GridItem pl="2" area={'main'}>
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              src="/images/PetCare.jpg"
              width={5184 / 10}
              height={3456 / 10}
            />
            <Stack>
              <CardBody>
                <Heading as="h2" size="3xl" noOfLines={1}>
                  PetCare
                </Heading>
                <Spacer />
                <Text fontSize="3xl" pt="10">
                  Esta pagina web esta creada para el cuidado de mascotas.
                </Text>
                <Spacer />
                <Text fontSize="3xl" pt="10">
                  Actualmente tenemos {totalNumber} mascotas felizmente
                  registradas.
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </GridItem>
        <GridItem pl="2" area={'footer'}></GridItem>
      </Grid>
    </Box>
  );
}

export async function getServerSideProps() {
  const data = await getPets();
  return {
    props: { data },
  };
}
