import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" bg="teal.500" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="xl">My App</Text>
        <Flex>
          <Link as={RouterLink} to="/" color="white" mr="4" data-testid="home-page">
            Home
          </Link>
          <Link as={RouterLink} to="/student" color="white" mr="4" data-testid="student-page">
            Students
          </Link>
          <Link as={RouterLink} to="/add" color="white" data-testid="add-page">
            Add Student
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;