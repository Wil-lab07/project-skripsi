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
import { Menu as _Menu } from '@mui/icons-material'

const MenuComponent: NextPage = () => {          
  const { push } = useRouter()  
  return (
    <Menu>
      <MenuButton as={Button} colorScheme='purple'>
        <_Menu sx={{ color: 'white' }}/>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=> push('/operator')}>Operator</MenuItem>
        <MenuItem onClick={()=> push('/operator/input/pemotongan')}>Input Pemotongan</MenuItem>
        <MenuItem onClick={()=> push('/operator/input/rph')}>Input RPH</MenuItem>
        <MenuItem onClick={()=> push('/operator/input/distributor')}>Input Distributor</MenuItem>
        <MenuItem onClick={()=> push('/operator/input/makanan')}>Input Makanan</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuComponent