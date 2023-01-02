import { Grid, GridItem, Flex, List, ListItem, Button } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from './Auth';

const links = [
  { href: '/', label: 'Home', type: ['user', 'admin'] },
  { href: '/caretakers', label: 'Caretaker', type: ['admin'] },
  { href: '/petowners', label: 'Pet Owner', type: ['admin'] },
  { href: '/pets', label: 'Pet', type: ['admin', 'user'] },
  // { href: '/cares', label: 'Care' },
  { href: '/ratings', label: 'Rating', type: ['user', 'admin'] },
  { href: '/takecares', label: 'Take Care', type: ['admin', 'user'] },
];

const Layout = (props) => {
  const { user, logout } = useAuth();
  console.log(user);
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
            {user && (
              <List>
                {links.map(
                  ({ href, label, type }) =>
                    type.includes(user.type) && (
                      <ListItem p="10px" key={href}>
                        {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
                        <Link href={href}>{label}</Link>
                      </ListItem>
                    )
                )}
              </List>
            )}
            {user && (
              <Button color={'teal.700'} onClick={logout}>
                Logout
              </Button>
            )}
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
