import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Button as={RouterLink} to="/student" data-testid="student-btn" colorScheme="teal">
        Go to Students
      </Button>
    </div>
  );
};

export default Home;