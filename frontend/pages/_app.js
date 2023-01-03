// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import Layout from '../components/Layout';
import { createStandaloneToast } from '@chakra-ui/toast';
import { AuthProvider } from '../components/Auth';

const { ToastContainer } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
