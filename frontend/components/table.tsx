import type { NextPage } from 'next'
import { useState } from 'react'
import { 
  Button,
  Flex,
  HStack,
} 
from '@chakra-ui/react'
import TablePemotongan from './tablePemotongan'

const TableComponent: NextPage = () => {          
  const [dataType, setDataType] = useState('pemotongan')
  return (
    <>
      <Flex>
        <HStack spacing="10px">
          <Button
            colorScheme={dataType === 'pemotongan' ? 'blue' : 'gray'}
            onClick={() => setDataType('pemotongan')}
          >
            Pemotongan
          </Button>
          <Button
            colorScheme={dataType === 'rph' ? 'blue' : 'gray'}
            onClick={() => setDataType('rph')}
          >
            RPH
          </Button>
          <Button
            colorScheme={dataType === 'distributor' ? 'blue' : 'gray'}
            onClick={() => setDataType('distributor')}
          >
            Distributor
          </Button>
          <Button
            colorScheme={dataType === 'makanan' ? 'blue' : 'gray'}
            onClick={() => setDataType('makanan')}
          >
            Makanan
          </Button>
        </HStack>
      </Flex>
      <Flex 
        marginTop={'10px'} 
        border='solid red' 
        w='100%'
        justifyContent={'center'}
        alignItems={'center'}
      >
        {dataType === 'pemotongan' && <TablePemotongan/>}
      </Flex>
    </>
  )
}

export default TableComponent