import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 9800, expenses: 2000, profit: 7800 },
  { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
  { name: 'Aug', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Sep', revenue: 5000, expenses: 3000, profit: 2000 },
  { name: 'Oct', revenue: 6000, expenses: 3500, profit: 2500 },
  { name: 'Nov', revenue: 7000, expenses: 4000, profit: 3000 },
  { name: 'Dec', revenue: 8000, expenses: 4500, profit: 3500 },
];

const cropYieldData = [
  { name: 'Wheat', yield: 12000, target: 10000 },
  { name: 'Corn', yield: 19000, target: 20000 },
  { name: 'Soybeans', yield: 8780, target: 9000 },
  { name: 'Barley', yield: 6890, target: 8000 },
  { name: 'Rice', yield: 3990, target: 3500 },
];

const revenueByFarmData = [
  { name: 'Green Valley Farm', value: 45000 },
  { name: 'Sunset Ranch', value: 28000 },
  { name: 'Meadow Brook Orchard', value: 18000 },
  { name: 'Blue Lake Vineyard', value: 12000 },
];

const weatherData = [
  { date: '1', temperature: 65, rainfall: 0.0, humidity: 62 },
  { date: '2', temperature: 68, rainfall: 0.0, humidity: 58 },
  { date: '3', temperature: 72, rainfall: 0.1, humidity: 65 },
  { date: '4', temperature: 71, rainfall: 0.3, humidity: 72 },
  { date: '5', temperature: 69, rainfall: 0.9, humidity: 85 },
  { date: '6', temperature: 64, rainfall: 0.2, humidity: 78 },
  { date: '7', temperature: 68, rainfall: 0.0, humidity: 65 },
  { date: '8', temperature: 72, rainfall: 0.0, humidity: 60 },
  { date: '9', temperature: 75, rainfall: 0.0, humidity: 55 },
  { date: '10', temperature: 77, rainfall: 0.0, humidity: 52 },
  { date: '11', temperature: 76, rainfall: 0.0, humidity: 54 },
  { date: '12', temperature: 74, rainfall: 0.2, humidity: 58 },
  { date: '13', temperature: 70, rainfall: 0.5, humidity: 75 },
  { date: '14', temperature: 68, rainfall: 0.1, humidity: 68 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('yearly');
  const cardBg = useColorModeValue('white', 'gray.800');
  
  const filteredMonthlyData = 
    timeframe === 'quarterly' 
      ? monthlyData.filter((_, i) => i % 3 === 0)
      : timeframe === 'halfYearly'
      ? monthlyData.filter((_, i) => i % 6 === 0)
      : monthlyData;

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading as="h1" mb={6}>
        Farm Analytics
      </Heading>

      <Flex justify="flex-end" mb={6}>
        <FormControl maxW="200px">
          <Select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="halfYearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </FormControl>
      </Flex>

      <StatGroup mb={8}>
        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Total Revenue (YTD)</StatLabel>
          <StatNumber>$58,000</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Total Expenses (YTD)</StatLabel>
          <StatNumber>$34,500</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Net Profit (YTD)</StatLabel>
          <StatNumber>$23,500</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.5%
          </StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="lg" shadow="md">
          <StatLabel>Yield Performance</StatLabel>
          <StatNumber>92%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            4.87%
          </StatHelpText>
        </Stat>
      </StatGroup>

      <Tabs variant="enclosed" mb={8}>
        <TabList>
          <Tab>Financial</Tab>
          <Tab>Crop Yield</Tab>
          <Tab>Weather</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Card>
                <CardHeader>
                  <Heading size="md">Revenue vs Expenses</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={filteredMonthlyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Bar 
                          dataKey="revenue" 
                          name="Revenue" 
                          fill="#82ca9d" 
                        />
                        <Bar 
                          dataKey="expenses" 
                          name="Expenses" 
                          fill="#8884d8" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Profit Trend</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredMonthlyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="profit"
                          name="Profit"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Revenue by Farm</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByFarmData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueByFarmData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Card>
                <CardHeader>
                  <Heading size="md">Crop Yield vs Target</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cropYieldData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="yield" 
                          name="Actual Yield" 
                          fill="#82ca9d" 
                        />
                        <Bar 
                          dataKey="target" 
                          name="Target Yield" 
                          fill="#8884d8" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Yield Performance by Crop</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cropYieldData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="yield"
                        >
                          {cropYieldData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Card>
                <CardHeader>
                  <Heading size="md">Temperature & Rainfall (Last 14 Days)</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weatherData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 2]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="temperature"
                          name="Temperature (°F)"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="rainfall"
                          name="Rainfall (inches)"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Humidity (Last 14 Days)</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={weatherData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="humidity"
                          name="Humidity (%)"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Card mb={8}>
        <CardHeader>
          <Heading size="md">Key Insights</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="sm" mb={2}>Financial Health</Heading>
              <Text>Revenue is trending upward with a 23.36% increase compared to last year. Expenses have been decreased by 9.05%.</Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="sm" mb={2}>Crop Performance</Heading>
              <Text>Wheat and Rice are exceeding yield targets, while Corn, Soybeans, and Barley are slightly below target.</Text>
            </Box>
            <Box p={4} borderWidth="1px" borderRadius="lg">
              <Heading size="sm" mb={2}>Weather Impact</Heading>
              <Text>Recent rainfall has benefited crop growth, with temperatures remaining optimal for current growing stages.</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
} 