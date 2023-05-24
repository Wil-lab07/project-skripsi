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
            colorScheme={dataType === 'pemotongan' ? 'purple' : 'gray'}
            onClick={() => setDataType('pemotongan')}
          >
            Pemotongan
          </Button>
          <Button
            colorScheme={dataType === 'rph' ? 'purple' : 'gray'}
            onClick={() => setDataType('rph')}
          >
            RPH
          </Button>
          <Button
            colorScheme={dataType === 'distributor' ? 'purple' : 'gray'}
            onClick={() => setDataType('distributor')}
          >
            Distributor
          </Button>
          <Button
            colorScheme={dataType === 'makanan' ? 'purple' : 'gray'}
            onClick={() => setDataType('makanan')}
          >
            Makanan
          </Button>
        </HStack>
      </Flex>
      <Flex 
        marginTop={'30px'} 
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