import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column"
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Navbar />
      <Container 
        as="main" 
        maxW="container.xl" 
        flex="1" 
        py={8} 
        px={{ base: 4, md: 6 }}
        mt={2}
      >
        <Box 
          bg={useColorModeValue('white', 'gray.800')} 
          rounded="lg"
          p={{ base: 4, md: 6 }}
          shadow="sm"
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
} 