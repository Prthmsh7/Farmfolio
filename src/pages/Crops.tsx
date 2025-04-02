import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Flex,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiTrash2, FiSun, FiDroplet } from 'react-icons/fi';

// Mock crops data
const initialCrops = [
  {
    id: 1,
    name: 'Corn',
    variety: 'Sweet Corn',
    farm: 'Green Valley Farm',
    plantDate: '2023-04-10',
    harvestDate: '2023-07-15',
    status: 'Growing',
    progress: 65,
    area: '40 acres',
    notes: 'Performing well. Recent rainfall was beneficial.',
    wateringNeeds: 'Medium',
    sunNeeds: 'Full Sun',
  },
  {
    id: 2,
    name: 'Wheat',
    variety: 'Hard Red Winter Wheat',
    farm: 'Green Valley Farm',
    plantDate: '2023-02-20',
    harvestDate: '2023-07-01',
    status: 'Growing',
    progress: 85,
    area: '60 acres',
    notes: 'Excellent growth. No disease or pest issues observed.',
    wateringNeeds: 'Low',
    sunNeeds: 'Full Sun',
  },
  {
    id: 3,
    name: 'Tomatoes',
    variety: 'Beefsteak',
    farm: 'Meadow Brook Orchard',
    plantDate: '2023-05-01',
    harvestDate: '2023-08-15',
    status: 'Growing',
    progress: 40,
    area: '5 acres',
    notes: 'Some signs of early blight. Monitoring closely.',
    wateringNeeds: 'High',
    sunNeeds: 'Full Sun',
  },
  {
    id: 4,
    name: 'Soybeans',
    variety: 'Roundup Ready',
    farm: 'Green Valley Farm',
    plantDate: '2023-05-15',
    harvestDate: '2023-10-10',
    status: 'Growing',
    progress: 30,
    area: '20 acres',
    notes: 'Good emergence. No issues to report.',
    wateringNeeds: 'Medium',
    sunNeeds: 'Full Sun',
  },
];

export default function Crops() {
  const [crops, setCrops] = useState(initialCrops);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    name: '',
    variety: '',
    farm: '',
    plantDate: '',
    harvestDate: '',
    status: 'Planned',
    progress: 0,
    area: '',
    notes: '',
    wateringNeeds: 'Medium',
    sunNeeds: 'Full Sun',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      variety: '',
      farm: '',
      plantDate: '',
      harvestDate: '',
      status: 'Planned',
      progress: 0,
      area: '',
      notes: '',
      wateringNeeds: 'Medium',
      sunNeeds: 'Full Sun',
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const handleAddCrop = () => {
    const newCrop = {
      id: crops.length + 1,
      ...formValues,
    };
    setCrops([...crops, newCrop]);
    resetForm();
    onClose();
  };

  const handleEditCrop = (crop: typeof initialCrops[0]) => {
    setFormValues(crop);
    setEditMode(true);
    setCurrentId(crop.id);
    onOpen();
  };

  const handleUpdateCrop = () => {
    const updatedCrops = crops.map((crop) =>
      crop.id === currentId ? { ...crop, ...formValues } : crop
    );
    setCrops(updatedCrops);
    resetForm();
    onClose();
  };

  const handleDeleteCrop = (id: number) => {
    const updatedCrops = crops.filter((crop) => crop.id !== id);
    setCrops(updatedCrops);
  };

  const handleOpenAddModal = () => {
    resetForm();
    onOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned':
        return 'blue';
      case 'Planted':
        return 'teal';
      case 'Growing':
        return 'green';
      case 'Harvesting':
        return 'orange';
      case 'Completed':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">Crop Management</Heading>
        <Flex gap={4}>
          <ButtonGroup isAttached variant="outline">
            <Button
              isActive={viewMode === 'cards'}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
            <Button
              isActive={viewMode === 'table'}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </ButtonGroup>
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="green"
            onClick={handleOpenAddModal}
          >
            Add Crop
          </Button>
        </Flex>
      </Flex>

      {viewMode === 'cards' ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {crops.map((crop) => (
            <Card key={crop.id}>
              <CardHeader pb={2}>
                <Flex justify="space-between" align="flex-start">
                  <Box>
                    <Heading size="md">{crop.name}</Heading>
                    <Text>{crop.variety}</Text>
                  </Box>
                  <Badge colorScheme={getStatusColor(crop.status)}>
                    {crop.status}
                  </Badge>
                </Flex>
              </CardHeader>

              <CardBody pt={0}>
                <Flex justify="space-between" fontSize="sm" color="gray.500">
                  <Text>Farm: {crop.farm}</Text>
                  <Text>Area: {crop.area}</Text>
                </Flex>

                <Divider my={3} />

                <Stack spacing={3}>
                  <Box>
                    <Flex justify="space-between">
                      <Text fontWeight="semibold">Growth Progress</Text>
                      <Text>{crop.progress}%</Text>
                    </Flex>
                    <Progress
                      value={crop.progress}
                      colorScheme={getStatusColor(crop.status)}
                      size="sm"
                      mt={1}
                    />
                  </Box>

                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Flex align="center" color="blue.500">
                        <Icon as={FiDroplet} mr={1} />
                        <Text fontSize="sm">{crop.wateringNeeds}</Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Flex align="center" color="orange.500">
                        <Icon as={FiSun} mr={1} />
                        <Text fontSize="sm">{crop.sunNeeds}</Text>
                      </Flex>
                    </Box>
                  </SimpleGrid>

                  <Box>
                    <Text fontWeight="semibold">Dates:</Text>
                    <Flex justify="space-between" mt={1}>
                      <Text fontSize="sm">Planted: {crop.plantDate}</Text>
                      <Text fontSize="sm">Harvest: {crop.harvestDate}</Text>
                    </Flex>
                  </Box>

                  {crop.notes && (
                    <Box>
                      <Text fontWeight="semibold">Notes:</Text>
                      <Text fontSize="sm">{crop.notes}</Text>
                    </Box>
                  )}
                </Stack>

                <Divider my={3} />

                <ButtonGroup spacing={4} width="100%">
                  <Button
                    flex={1}
                    size="sm"
                    leftIcon={<Icon as={FiEdit} />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleEditCrop(crop)}
                  >
                    Edit
                  </Button>
                  <Button
                    flex={1}
                    size="sm"
                    leftIcon={<Icon as={FiTrash2} />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDeleteCrop(crop.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Crop</Th>
                <Th>Variety</Th>
                <Th>Farm</Th>
                <Th>Plant Date</Th>
                <Th>Harvest Date</Th>
                <Th>Status</Th>
                <Th>Progress</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {crops.map((crop) => (
                <Tr key={crop.id}>
                  <Td fontWeight="semibold">{crop.name}</Td>
                  <Td>{crop.variety}</Td>
                  <Td>{crop.farm}</Td>
                  <Td>{crop.plantDate}</Td>
                  <Td>{crop.harvestDate}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(crop.status)}>
                      {crop.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Progress
                      value={crop.progress}
                      colorScheme={getStatusColor(crop.status)}
                      size="sm"
                      width="100px"
                    />
                  </Td>
                  <Td>
                    <ButtonGroup size="sm" spacing={2}>
                      <Button
                        leftIcon={<Icon as={FiEdit} />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => handleEditCrop(crop)}
                      >
                        Edit
                      </Button>
                      <Button
                        leftIcon={<Icon as={FiTrash2} />}
                        colorScheme="red"
                        variant="outline"
                        onClick={() => handleDeleteCrop(crop.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Crop Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit Crop' : 'Add New Crop'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Crop Name</FormLabel>
                <Input
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter crop name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Variety</FormLabel>
                <Input
                  name="variety"
                  value={formValues.variety}
                  onChange={handleInputChange}
                  placeholder="Enter variety"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Farm</FormLabel>
                <Select
                  name="farm"
                  value={formValues.farm}
                  onChange={handleInputChange}
                  placeholder="Select farm"
                >
                  <option value="Green Valley Farm">Green Valley Farm</option>
                  <option value="Sunset Ranch">Sunset Ranch</option>
                  <option value="Meadow Brook Orchard">Meadow Brook Orchard</option>
                  <option value="Blue Lake Vineyard">Blue Lake Vineyard</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Area</FormLabel>
                <Input
                  name="area"
                  value={formValues.area}
                  onChange={handleInputChange}
                  placeholder="e.g., 40 acres"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Plant Date</FormLabel>
                <Input
                  name="plantDate"
                  type="date"
                  value={formValues.plantDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Expected Harvest Date</FormLabel>
                <Input
                  name="harvestDate"
                  type="date"
                  value={formValues.harvestDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formValues.status}
                  onChange={handleInputChange}
                >
                  <option value="Planned">Planned</option>
                  <option value="Planted">Planted</option>
                  <option value="Growing">Growing</option>
                  <option value="Harvesting">Harvesting</option>
                  <option value="Completed">Completed</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Progress (%)</FormLabel>
                <Input
                  name="progress"
                  type="number"
                  min={0}
                  max={100}
                  value={formValues.progress}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Watering Needs</FormLabel>
                <Select
                  name="wateringNeeds"
                  value={formValues.wateringNeeds}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sun Needs</FormLabel>
                <Select
                  name="sunNeeds"
                  value={formValues.sunNeeds}
                  onChange={handleInputChange}
                >
                  <option value="Full Sun">Full Sun</option>
                  <option value="Partial Sun">Partial Sun</option>
                  <option value="Shade">Shade</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl mt={4}>
              <FormLabel>Notes</FormLabel>
              <Textarea
                name="notes"
                value={formValues.notes}
                onChange={handleInputChange}
                placeholder="Enter any notes about this crop"
                rows={3}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={editMode ? handleUpdateCrop : handleAddCrop}
            >
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
} 