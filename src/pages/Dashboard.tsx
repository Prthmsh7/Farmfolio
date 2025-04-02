import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { FiUsers, FiTrendingUp, FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts with Rupee values
const cropYieldData = [
  { name: 'Jan', wheat: 4000, corn: 2400, rice: 2400 },
  { name: 'Feb', wheat: 3000, corn: 1398, rice: 2210 },
  { name: 'Mar', wheat: 2000, corn: 9800, rice: 2290 },
  { name: 'Apr', wheat: 2780, corn: 3908, rice: 2000 },
  { name: 'May', wheat: 1890, corn: 4800, rice: 2181 },
  { name: 'Jun', wheat: 2390, corn: 3800, rice: 2500 },
];

const revenueData = [
  { name: 'Jan', revenue: 325000 },
  { name: 'Feb', revenue: 242000 },
  { name: 'Mar', revenue: 405000 },
  { name: 'Apr', revenue: 231000 },
  { name: 'May', revenue: 153000 },
  { name: 'Jun', revenue: 194000 },
];

const cropDistributionData = [
  { name: 'Wheat', value: 40 },
  { name: 'Rice', value: 25 },
  { name: 'Corn', value: 20 },
  { name: 'Pulses', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Custom tooltip formatter to display rupee values
const rupeesFormatter = (value: number) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

// Weather data for the farm location
const weatherData = [
  { day: 'Today', temp: '32°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Tomorrow', temp: '28°C', condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Wed', temp: '26°C', condition: 'Rainy', icon: '🌧️' },
  { day: 'Thu', temp: '30°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Fri', temp: '31°C', condition: 'Sunny', icon: '☀️' },
];

interface StatsCardProps {
  title: string;
  stat: string;
  icon: React.ReactElement;
  bgColor: string;
  hint?: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, bgColor, hint } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      rounded={'lg'}
      bg={bgColor}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
          {hint && (
            <Text fontSize="xs" color="gray.500" mt={1}>
              {hint}
            </Text>
          )}
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Dashboard() {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">Farm Dashboard</Heading>
        <HStack spacing={2}>
          <Badge colorScheme="green" p={2} borderRadius="md">
            <Flex align="center">
              <Icon as={FiAlertCircle} mr={1} />
              <Text>Weather Alert: Heavy rain expected on Wednesday</Text>
            </Flex>
          </Badge>
        </HStack>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Active Farms'}
          stat={'4'}
          icon={<Icon as={FiUsers} w={8} h={8} />}
          bgColor={cardBg}
        />
        <StatsCard
          title={'Total Crops'}
          stat={'12'}
          icon={<Icon as={FiTrendingUp} w={8} h={8} />}
          bgColor={cardBg}
          hint="Across all farms"
        />
        <StatsCard
          title={'Harvests This Month'}
          stat={'7'}
          icon={<Icon as={FiCalendar} w={8} h={8} />}
          bgColor={cardBg}
        />
        <StatsCard
          title={'Revenue (YTD)'}
          stat={'₹47,65,000'}
          icon={<Icon as={FiDollarSign} w={8} h={8} />}
          bgColor={cardBg}
          hint="23% increase from last year"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 8 }} mt={10}>
        <Card>
          <CardHeader>
            <Heading size="md">Crop Yield (last 6 months)</Heading>
          </CardHeader>
          <CardBody>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cropYieldData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wheat" name="Wheat" fill="#8884d8" />
                  <Bar dataKey="corn" name="Corn" fill="#82ca9d" />
                  <Bar dataKey="rice" name="Rice" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Revenue (last 6 months)</Heading>
          </CardHeader>
          <CardBody>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => rupeesFormatter(Number(value))} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue (₹)" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 5, lg: 8 }} mt={10}>
        <Card>
          <CardHeader>
            <Heading size="md">Crop Distribution</Heading>
          </CardHeader>
          <CardBody>
            <Box height="250px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {cropDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Recent Activities</Heading>
          </CardHeader>
          <CardBody>
            <Text>Planted new corn crop - 2 days ago</Text>
            <Text mt={2}>Harvested wheat field - 1 week ago</Text>
            <Text mt={2}>Added new farm location - 2 weeks ago</Text>
            <Text mt={2}>Irrigation system updated - 3 weeks ago</Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Weather Forecast</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={5} spacing={2}>
              {weatherData.map((day, index) => (
                <Box 
                  key={index}
                  textAlign="center" 
                  p={2} 
                  borderWidth="1px" 
                  borderRadius="lg"
                  bg={day.condition.includes('Rain') ? 'blue.50' : 'yellow.50'}
                >
                  <Text fontWeight="bold">{day.day}</Text>
                  <Text fontSize="2xl">{day.icon}</Text>
                  <Text>{day.temp}</Text>
                  <Text fontSize="xs">{day.condition}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card mt={10}>
        <CardHeader>
          <Heading size="md">Upcoming Tasks</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
            <Box p={4} borderWidth="1px" borderRadius="lg" bg="red.50">
              <Text fontWeight="bold" color="red.600">Tomorrow</Text>
              <Text>Fertilize corn fields (North Farm)</Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="lg" bg="yellow.50">
              <Text fontWeight="bold" color="yellow.600">3 days</Text>
              <Text>Inspect irrigation system (All Farms)</Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="lg" bg="green.50">
              <Text fontWeight="bold" color="green.600">1 week</Text>
              <Text>Harvest tomatoes (East Farm)</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      <StatGroup mt={10}>
        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Crop Health Index</StatLabel>
          <StatNumber>85%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            5.3%
          </StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Water Usage</StatLabel>
          <StatNumber>2,450 Liters</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Soil Quality Index</StatLabel>
          <StatNumber>76%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            2.5%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
} 