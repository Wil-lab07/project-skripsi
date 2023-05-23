import type { NextPage } from 'next'
import { 
  Flex, 
  Box,
  HStack,
  Button
} 
from '@chakra-ui/react'
import MenuComponent from './menu'
import TableComponent from './table'
import { useState } from 'react'

const Content: NextPage = () => {  
  const [dataType, setDataType] = useState('pemotongan')        
  return (
    <>
      <Box width={'100%'}>
        <Box margin={'10px'}>
          <MenuComponent/>
        </Box>
      </Box>
      <Flex width={'100%'} alignItems={'center'} justifyContent={'center'} direction={'column'}>
        <TableComponent/>
      </Flex>
    </>
  )
}

export default Content