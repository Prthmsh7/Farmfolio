import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
  Image,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login, isLoading, error } = useAuth();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await login(email, password, rememberMe);
      
      toast({
        title: 'Success',
        description: 'You have been logged in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Navigate will be handled by login function in AuthContext
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  // Demo login with predefined credentials
  const handleDemoLogin = async () => {
    try {
      await login('demo@example.com', 'password123', true);
      toast({
        title: 'Demo Login',
        description: 'You have been logged in with demo credentials',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Flex justify="center">
            <Image 
              src="https://imgur.com/r4UJyR9.png" 
              alt="FarmFolio Logo" 
              width="80px" 
              height="80px" 
            />
          </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
            <Text color="fg.muted">
              Don't have an account? <Link as={RouterLink} to="/register" color="brand.500">Sign up</Link>
            </Text>
          </Stack>
        </Stack>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox 
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <Button variant="text" size="sm" as={RouterLink} to="/forgot-password" colorScheme="green">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="4">
                <Button 
                  colorScheme="green" 
                  type="submit" 
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDemoLogin} 
                  isLoading={isLoading}
                >
                  Demo Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
} 