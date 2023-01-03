import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import CardItem from '../components/pagesComponents/index/CardItem';
import { getTakeCares } from '../utils/getTakeCaresData';
import { useAuth } from '../components/Auth';
import { useEffect } from 'react';

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
          <Flex alignItems="center" justifyContent="space-evenly">
            <CardItem
              head="Cuidados activos"
              body={totalNumber}
              footer="Ver detalle"
              href="takecares"
            />
            <CardItem head="Animales" body={5} footer="Ver detalle" />
            <CardItem head="Hola mundo" body={4} footer="Ver detalle" />
          </Flex>
        </GridItem>
        <GridItem pl="2" area={'footer'}></GridItem>
      </Grid>
    </Box>
  );
}

export async function getServerSideProps() {
  const data = await getTakeCares();
  return {
    props: { data },
  };
}
