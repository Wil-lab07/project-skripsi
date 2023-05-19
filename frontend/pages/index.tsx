import { 
  Flex, 
  Text
} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Flex 
        direction={'column'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={'100vh'}
      >
        <Text>Welcome to Trace App</Text>
      </Flex>
    </>
  )
}
