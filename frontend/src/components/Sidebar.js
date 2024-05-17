import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Sidebar = () => {
  return (
    <Box as="nav" bg="gray.800" color="white" minH="100vh" p="4">
      <Flex direction="column" as="ul">
        <Text fontSize="lg" mb="4">
          Dashboard
        </Text>
        <NextLink href="/" passHref>
          <Link as="li" mb="2">
            Home
          </Link>
        </NextLink>
        <NextLink href="/page1" passHref>
          <Link as="li" mb="2">
            Page 1
          </Link>
        </NextLink>
        <NextLink href="/page2" passHref>
          <Link as="li" mb="2">
            Page 2
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Sidebar;
