import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Image,
  Flex,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const { forgotPassword, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      
      toast({
        title: 'Email Sent',
        description: 'If an account exists with this email, you will receive a password reset link',
        status: 'success',
        duration: 5000,
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
            <Heading size={{ base: 'xs', md: 'sm' }}>Reset your password</Heading>
            <Text color="fg.muted">
              Enter your email and we'll send you a link to reset your password
            </Text>
          </Stack>
        </Stack>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {isSubmitted ? (
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6" align="center">
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                Check your email for a password reset link
              </Alert>
              <Button 
                as={RouterLink} 
                to="/login" 
                colorScheme="green" 
                width="full"
              >
                Back to Login
              </Button>
            </Stack>
          </Box>
        ) : (
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
                </Stack>
                <Stack spacing="4">
                  <Button 
                    colorScheme="green" 
                    type="submit" 
                    isLoading={isLoading}
                  >
                    Send Reset Link
                  </Button>
                  <Button 
                    variant="outline" 
                    as={RouterLink} 
                    to="/login"
                  >
                    Back to Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 