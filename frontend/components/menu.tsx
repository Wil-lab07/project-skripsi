import type { NextPage } from 'next'
import { 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} 
from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const MenuComponent: NextPage = () => {          
  const { push } = useRouter()  
  return (
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
  )
}

export default MenuComponent