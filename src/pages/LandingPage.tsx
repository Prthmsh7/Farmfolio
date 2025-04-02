import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBarChart2, FiCloud, FiCpu, FiDatabase, FiLayers, FiTrendingUp } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'green.500'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue('brand.100', 'gray.900')} 
        py={20}
        backgroundImage="url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0,0,0,0.6)',
          zIndex: 0
        }}
      >
        <Container maxW={'7xl'} zIndex={1} position="relative">
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
              color={'white'}>
              Manage Your Farm <br />
              <Text as={'span'} color={'brand.400'}>
                with Precision
              </Text>
            </Heading>
            <Text color={'gray.200'} maxW={'3xl'}>
              FarmFolio provides comprehensive farm management tools to help farmers
              track crops, manage inventory, analyze data, and maximize productivity.
              Streamline your farming operations and make data-driven decisions.
            </Text>
            <Stack spacing={6} direction={'row'}>
              <Button
                as={RouterLink}
                to="/register"
                rounded={'full'}
                px={6}
                colorScheme={'green'}
                bg={'brand.500'}
                _hover={{ bg: 'brand.600' }}>
                Get Started
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                rounded={'full'}
                px={6}>
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box p={4} mt={10}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>Key Features</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Everything you need to manage your farm efficiently in one place
          </Text>
        </Stack>

        <Container maxW={'6xl'} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FiBarChart2} w={10} h={10} />}
              title={'Advanced Analytics'}
              text={'Get insights into your farm performance with detailed analytics and reports. Track yield, revenue, and expenses.'}
            />
            <Feature
              icon={<Icon as={FiLayers} w={10} h={10} />}
              title={'Crop Management'}
              text={'Manage all your crops from planting to harvest. Monitor growth stages, schedule tasks, and track results.'}
            />
            <Feature
              icon={<Icon as={FiTrendingUp} w={10} h={10} />}
              title={'Financial Tracking'}
              text={'Keep track of all farm income and expenses. Generate detailed financial reports and projections.'}
            />
            <Feature
              icon={<Icon as={FiCloud} w={10} h={10} />}
              title={'Weather Integration'}
              text={'Access real-time weather data and forecasts to plan your farming activities efficiently.'}
            />
            <Feature
              icon={<Icon as={FiDatabase} w={10} h={10} />}
              title={'Inventory Management'}
              text={'Track seeds, fertilizers, equipment, and other inventory items. Get alerts for low stock items.'}
            />
            <Feature
              icon={<Icon as={FiCpu} w={10} h={10} />}
              title={'Smart Recommendations'}
              text={'Receive AI-powered recommendations for crop rotation, fertilization, and pest control.'}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={16} mt={10}>
        <Container maxW={'5xl'}>
          <Heading textAlign={'center'} mb={10}>
            Trusted by Farmers Across India
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              borderRadius={'lg'}
              boxShadow={'lg'}>
              <Text fontStyle={'italic'} mb={4}>
                "FarmFolio has transformed how I manage my 50-acre farm. The analytics and tracking features have helped me increase my crop yield by 20%."
              </Text>
              <Text fontWeight={'bold'}>— Rajesh Patel, Gujarat</Text>
            </Box>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              borderRadius={'lg'}
              boxShadow={'lg'}>
              <Text fontStyle={'italic'} mb={4}>
                "The crop management tools are excellent. I can track everything from planting to harvest, and the weather integration helps me plan better."
              </Text>
              <Text fontWeight={'bold'}>— Anita Sharma, Punjab</Text>
            </Box>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              p={8}
              borderRadius={'lg'}
              boxShadow={'lg'}>
              <Text fontStyle={'italic'} mb={4}>
                "Financial tracking has been a game-changer for my vineyard. I can now make data-driven decisions that have improved my profitability."
              </Text>
              <Text fontWeight={'bold'}>— Vikram Singh, Maharashtra</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={useColorModeValue('brand.100', 'brand.900')} py={16}>
        <Container maxW={'5xl'}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            align={'center'}
            justify={'space-between'}>
            <Stack flex={1} spacing={4}>
              <Heading fontSize={'3xl'}>
                Ready to transform your farming operations?
              </Heading>
              <Text fontSize={'lg'}>
                Join thousands of farmers who are already using FarmFolio to manage their farms more efficiently.
              </Text>
            </Stack>
            <Button
              as={RouterLink}
              to="/register"
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              bg={'brand.500'}
              _hover={{ bg: 'brand.600' }}>
              Get Started Free
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
} 