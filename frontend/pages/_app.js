// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import Layout from '../components/Layout';
import { createStandaloneToast } from '@chakra-ui/toast';
import styled from '../styles/fondo.css';

const { ToastContainer } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} styled />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
