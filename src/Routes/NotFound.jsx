import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box p={5} textAlign="center">
      <Heading as="h2" size="lg" mb={4}>
        404 - Not Found
      </Heading>
      <Text mb={4}>The page you are looking for does not exist.</Text>
      <Button colorScheme="teal" as={Link} to="/">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;