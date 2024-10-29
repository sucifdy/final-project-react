import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Routes/Home';
import Student from './Routes/Student';
import AddStudent from './Routes/AddStudent';
import EditStudent from './Routes/EditStudent';
import NotFound from './Routes/NotFound';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student/:id" element={<EditStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    </ChakraProvider>
  );
}

export default App;
