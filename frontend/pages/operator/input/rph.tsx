import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { 
  Flex, 
  Box,
} from '@chakra-ui/react';
import MenuComponent from '../../../components/menu';
import FormRPH from '../../../components/formRPH';

const RPH : NextPage = () => {
  const { isConnected } = useAccount()
  const { push } = useRouter()
  
  useEffect(() => {
    if (!isConnected) {
      push('/login')
    }
  }, [isConnected, push])

  return (
    <>
      <Box
        width={'100%'}
        position={'fixed'}
        top={'0'}
      >
        <Box margin={'10px'}>
          <MenuComponent/>
        </Box>
      </Box>
      <Flex 
        direction={'column'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={'100vh'}
      >
        <FormRPH/>
      </Flex>
    </>
  )
}

export default RPH;