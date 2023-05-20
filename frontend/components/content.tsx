import type { NextPage } from 'next'
import { 
  Flex, 
  Box,
} 
from '@chakra-ui/react'
import MenuComponent from './menu'

const Content: NextPage = () => {          
  return (
    <Flex 
    direction={'column'} 
    justifyContent={'center'} 
    alignItems={'center'}
    >
      <Box width={'100%'}>
        <Box margin={'10px'}>
          <MenuComponent/>
        </Box>
      </Box>
    </Flex>
  )
}

export default Content