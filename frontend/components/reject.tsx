import { 
    Box,
    Button, 
    Flex,
    Text 
} from '@chakra-ui/react'

export const RejectAccess = () => {
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