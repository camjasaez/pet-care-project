import { Grid, GridItem, Flex, List, ListItem } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/caretakers', label: 'Caretaker' },
  { href: '/petowners', label: 'Pet Owner' },
  { href: '/pets', label: 'Pet' },
  // { href: '/cares', label: 'Care' },
  { href: '/ratings', label: 'Rating' },
  { href: '/takecares', label: 'Take Care' },
];

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Head>
        <title>Pet Care</title>
        <meta name="description" content="Pet care" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        templateAreas={`"nav main"
                        "nav main"  
                        "nav main"`}
        gridTemplateRows={'55px 1fr 30px'}
        gridTemplateColumns={'15% 1fr'}
        h="100vh"
        gap="1"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="teal.300" area={'nav'}>
          <Flex direction="column" align="center">
            <List>
              {links.map(({ href, label }) => (
                <ListItem p="10px" key={href}>
                  {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
                  <Link href={href}>{label}</Link>
                </ListItem>
              ))}
            </List>
          </Flex>
        </GridItem>
        <GridItem pl="2" area={'main'}>
          {children}
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
