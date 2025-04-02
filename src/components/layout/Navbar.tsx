import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  Button, 
  Stack, 
  Collapse, 
  Icon, 
  Link, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  useColorModeValue, 
  useBreakpointValue, 
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  CloseIcon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut, FiUser, FiHelpCircle } from 'react-icons/fi';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        boxShadow="sm">
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/dashboard"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('green.600', 'green.200')}
            fontWeight={'bold'}
            fontSize={'xl'}>
            FarmFolio
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {isAuthenticated && <DesktopNav currentPath={location.pathname} />}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    user?.profilePicture || 
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                  }
                />
              </MenuButton>
              <MenuList>
                <Box px={3} py={2}>
                  <Text fontWeight="bold">{user?.firstName} {user?.lastName}</Text>
                  <Text fontSize="sm" color="gray.500">{user?.email}</Text>
                </Box>
                <MenuDivider />
                <MenuItem as={RouterLink} to="/dashboard/profile" icon={<Icon as={FiUser} />}>
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/dashboard/settings" icon={<SettingsIcon />}>
                  Settings
                </MenuItem>
                <MenuItem as={RouterLink} to="/dashboard/help" icon={<Icon as={FiHelpCircle} />}>
                  Help & Support
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} icon={<Icon as={FiLogOut} />}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={RouterLink}
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                color={'green.600'}
                to={'/login'}>
                Sign In
              </Button>
              <Button
                as={RouterLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'green.500'}
                to={'/register'}
                _hover={{
                  bg: 'green.400',
                }}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isAuthenticated={isAuthenticated} logout={handleLogout} currentPath={location.pathname} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('green.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const activeColor = 'green.500';

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = currentPath.startsWith(navItem.href ?? '');
        
        return (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  as={RouterLink}
                  p={2}
                  to={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={isActive ? activeColor : linkColor}
                  borderBottom={isActive ? '2px solid' : 'none'}
                  borderColor={isActive ? activeColor : 'transparent'}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav 
                        key={child.label} 
                        {...child} 
                        isActive={currentPath === child.href}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, isActive }: NavItem & { isActive: boolean }) => {
  const activeColor = 'green.500';
  
  return (
    <Link
      as={RouterLink}
      to={href ?? '#'}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      color={isActive ? activeColor : undefined}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.500' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'green.500'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ 
  isAuthenticated, 
  logout,
  currentPath
}: { 
  isAuthenticated: boolean, 
  logout: () => void,
  currentPath: string
}) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      boxShadow="md"
      borderBottomRadius="md">
      {isAuthenticated && NAV_ITEMS.map((navItem) => (
        <MobileNavItem 
          key={navItem.label} 
          {...navItem} 
          isActive={currentPath.startsWith(navItem.href ?? '')}
        />
      ))}
      
      {isAuthenticated ? (
        <>
          <Box py={2} borderTopWidth={1} borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <Stack spacing={2}>
              <Text
                as={RouterLink}
                to="/dashboard/profile"
                fontWeight={600}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Profile
              </Text>
              <Text
                as={RouterLink}
                to="/dashboard/settings"
                fontWeight={600}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Settings
              </Text>
              <Text
                as={RouterLink}
                to="/dashboard/help"
                fontWeight={600}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Help & Support
              </Text>
            </Stack>
          </Box>
          <Box py={2}>
            <Text
              fontWeight={600}
              color={useColorModeValue('red.500', 'red.300')}
              onClick={logout}
              cursor="pointer">
              Sign Out
            </Text>
          </Box>
        </>
      ) : (
        <Stack spacing={4} align="center">
          <Button
            as={RouterLink}
            to="/login"
            w="full"
            variant="outline"
            colorScheme="green">
            Sign In
          </Button>
          <Button
            as={RouterLink}
            to="/register"
            w="full"
            colorScheme="green">
            Sign Up
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, isActive }: NavItem & { isActive: boolean }) => {
  const { isOpen, onToggle } = useDisclosure();
  const activeColor = 'green.500';

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={isActive ? activeColor : useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
            color={isActive ? activeColor : undefined}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => {
              const childIsActive = location.pathname === child.href;
              return (
                <Link
                  key={child.label}
                  as={RouterLink}
                  py={2}
                  to={child.href ?? '#'}
                  color={childIsActive ? activeColor : undefined}>
                  {child.label}
                </Link>
              );
            })}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Farms',
    href: '/dashboard/farms',
  },
  {
    label: 'Crops',
    href: '/dashboard/crops',
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
  },
]; 