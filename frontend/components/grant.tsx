import type { NextPage } from 'next'
import { 
  Flex, 
  Text, 
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} 
from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

const Grant: NextPage = () => {          
  const { push } = useRouter()  
  return (
    <Flex 
    direction={'column'} 
    justifyContent={'center'} 
    alignItems={'center'}
    >
      <Box width={'100%'}>
        <Box margin={'10px'}>
          <Menu>
            <MenuButton as={Button}>
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=> push('/')}>Input Pemotongan</MenuItem>
              <MenuItem>Input RPH</MenuItem>
              <MenuItem>Input Distributor</MenuItem>
              <MenuItem>Input Makanan</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Flex>
  )
}

export default Grant