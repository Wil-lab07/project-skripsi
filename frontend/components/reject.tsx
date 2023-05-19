import type { NextPage } from 'next'
import { Flex, Text } from '@chakra-ui/react'

const Reject: NextPage = () => {
  return (
    <>
      <Flex 
        direction={'column'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={'100vh'}
      >
        <Flex 
          borderRadius={'md'}
          bgColor={'red.500'}
          justifyContent={'center'} 
          alignItems={'center'}
          color={'white'}
          fontSize={'xl'}
        >
          <Text margin={'20px'}>Maaf, anda tidak memiliki akses pada halaman ini</Text>
        </Flex>
      </Flex>
    </> 
  )
}

export default Reject