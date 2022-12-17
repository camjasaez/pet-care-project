import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CardItem = ({ head, body, footer, href }) => {
  const router = useRouter();
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Flex
        h="200px"
        w="200px"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size="md">{head}</Heading>

        <Text py="2">{body}</Text>

        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => router.push(`/${href}`)}
        >
          {footer}
        </Button>
      </Flex>
    </Card>
  );
};

export default CardItem;
