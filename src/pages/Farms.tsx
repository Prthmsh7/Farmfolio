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
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { FiPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

// Mock farm data
const initialFarms = [
  {
    id: 1,
    name: 'Green Valley Farm',
    location: 'Springfield, OR',
    size: '120 acres',
    type: 'Crop',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
    description: 'A beautiful crop farm with corn, wheat, and soybeans. Established in 1995.',
  },
  {
    id: 2,
    name: 'Sunset Ranch',
    location: 'Boulder, CO',
    size: '320 acres',
    type: 'Livestock',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'A livestock ranch specializing in cattle and sheep. Family-owned since 1978.',
  },
  {
    id: 3,
    name: 'Meadow Brook Orchard',
    location: 'Yakima, WA',
    size: '75 acres',
    type: 'Orchard',
    image: 'https://images.unsplash.com/photo-1507484467459-0c01be16726e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'An orchard specializing in apples, pears, and cherries. Known for its exceptional fruit quality.',
  },
  {
    id: 4,
    name: 'Blue Lake Vineyard',
    location: 'Napa Valley, CA',
    size: '45 acres',
    type: 'Vineyard',
    image: 'https://images.unsplash.com/photo-1566750413863-0b8585d3f658?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
    description: 'A vineyard producing premium grapes for wine. Established in 2005.',
  },
];

export default function Farms() {
  const [farms, setFarms] = useState(initialFarms);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    name: '',
    location: '',
    size: '',
    type: 'Crop',
    image: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      location: '',
      size: '',
      type: 'Crop',
      image: '',
      description: '',
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const handleAddFarm = () => {
    const newFarm = {
      id: farms.length + 1,
      ...formValues,
    };
    setFarms([...farms, newFarm]);
    resetForm();
    onClose();
  };

  const handleEditFarm = (farm: typeof initialFarms[0]) => {
    setFormValues(farm);
    setEditMode(true);
    setCurrentId(farm.id);
    onOpen();
  };

  const handleUpdateFarm = () => {
    const updatedFarms = farms.map((farm) =>
      farm.id === currentId ? { ...farm, ...formValues } : farm
    );
    setFarms(updatedFarms);
    resetForm();
    onClose();
  };

  const handleDeleteFarm = (id: number) => {
    const updatedFarms = farms.filter((farm) => farm.id !== id);
    setFarms(updatedFarms);
  };

  const handleOpenAddModal = () => {
    resetForm();
    onOpen();
  };

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">My Farms</Heading>
        <Button 
          leftIcon={<Icon as={FiPlus} />} 
          colorScheme="green" 
          onClick={handleOpenAddModal}
        >
          Add Farm
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {farms.map((farm) => (
          <Card key={farm.id} maxW='sm' overflow='hidden'>
            <CardHeader p={0}>
              <Image
                src={farm.image}
                alt={farm.name}
                objectFit='cover'
                maxH='200px'
                w='100%'
              />
            </CardHeader>
            <CardBody>
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{farm.name}</Heading>
                <Text>
                  {farm.description}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text color='blue.600' fontSize='xl'>
                    {farm.location}
                  </Text>
                  <Badge colorScheme={
                    farm.type === 'Crop' ? 'green' :
                    farm.type === 'Livestock' ? 'orange' :
                    farm.type === 'Orchard' ? 'purple' :
                    'blue'
                  }>
                    {farm.type}
                  </Badge>
                </Flex>
                <Text fontWeight="bold">{farm.size}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' leftIcon={<Icon as={FiEye} />}>
                  View
                </Button>
                <Button variant='outline' colorScheme='green' leftIcon={<Icon as={FiEdit} />} onClick={() => handleEditFarm(farm)}>
                  Edit
                </Button>
                <Button variant='outline' colorScheme='red' leftIcon={<Icon as={FiTrash2} />} onClick={() => handleDeleteFarm(farm.id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Add/Edit Farm Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit Farm' : 'Add New Farm'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Farm Name</FormLabel>
              <Input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Enter farm name"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                placeholder="City, State"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Size</FormLabel>
              <Input
                name="size"
                value={formValues.size}
                onChange={handleInputChange}
                placeholder="e.g., 120 acres"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Farm Type</FormLabel>
              <Select 
                name="type" 
                value={formValues.type} 
                onChange={handleInputChange}
              >
                <option value="Crop">Crop</option>
                <option value="Livestock">Livestock</option>
                <option value="Orchard">Orchard</option>
                <option value="Vineyard">Vineyard</option>
                <option value="Mixed">Mixed</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={formValues.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Describe your farm"
                size="sm"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={editMode ? handleUpdateFarm : handleAddFarm}
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