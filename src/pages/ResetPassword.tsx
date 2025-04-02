import { useState, useEffect } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { resetPassword, isLoading, error } = useAuth();

  useEffect(() => {
    // Extract token from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast({
        title: 'Error',
        description: 'Invalid or missing reset token',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [location, toast]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (!token) {
      toast({
        title: 'Error',
        description: 'No reset token provided',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await resetPassword(token, password);
      setIsResetSuccessful(true);
      
      toast({
        title: 'Success',
        description: 'Your password has been reset successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Error handling is done in the AuthContext
    }
  };

  // Redirect to login after a successful password reset
  useEffect(() => {
    if (isResetSuccessful) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isResetSuccessful, navigate]);

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
              Enter your new password below
            </Text>
          </Stack>
        </Stack>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {isResetSuccessful ? (
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
                Your password has been reset successfully
              </Alert>
              <Text>You will be redirected to the login page shortly.</Text>
              <Button 
                as={RouterLink} 
                to="/login" 
                colorScheme="green" 
                width="full"
              >
                Go to Login
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
                  <FormControl isInvalid={!!passwordError}>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                      }}
                      required
                    />
                    <FormErrorMessage>{passwordError}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={password !== confirmPassword && confirmPassword !== ''}>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {password !== confirmPassword && confirmPassword !== '' && (
                      <FormErrorMessage>Passwords do not match</FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Stack spacing="4">
                  <Button 
                    colorScheme="green" 
                    type="submit" 
                    isLoading={isLoading}
                    isDisabled={!token}
                  >
                    Reset Password
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