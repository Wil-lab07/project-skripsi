import { 
    FunctionComponent,
    SetStateAction, 
    Dispatch, 
    useState,
    useEffect
  } from "react"
  import {
    Flex,
    Text,
    ListItem,
    UnorderedList,
    HStack,
  } from '@chakra-ui/react'
  import { TracePemotonganResult } from "../swr/types"
  import { traceAddress } from "../constant/metadata"
  import { ethers } from "ethers"
  import Trace from "../constant/TraceABI.json"
  import { CheckCircle, InventoryRounded } from "@mui/icons-material"
  
  type TracePemotonganProps = {
    id: string | undefined;
  }
  
  const TracePemotongan: FunctionComponent<TracePemotonganProps> = ({ id }) => {
    const [data, setData] = useState<TracePemotonganResult>();
    const TraceProvider = new ethers.InfuraProvider('matic-mumbai')
    const TraceContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)
    
    useEffect(() => {
      if (id) {
        console.time('tracePemotonganAsync')
        TraceContract.pemotongan(id).then((res: TracePemotonganResult) => {
          setData(res)
        })
        .catch((err: Error) => console.log(err))
      }
    }, [id])
  
    if (data != undefined) {
      console.timeEnd('tracePemotonganAsync')
    }
  
    const convertDate = (date: string | undefined) => {
      if (date != undefined) {
        const dateObj = new Date(date)
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          minute: 'numeric',
        }).format(dateObj);
        return formattedDate
      }
      return date
    }
  
    const convertUnixDate = (date: string | undefined) => {
      if (date != undefined) {
        const dateObj = Number(`${date}`) * 1000;
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          minute: 'numeric',
        }).format(dateObj);
        return formattedDate
      }
    
      return date
    }
  
    return (
      <Flex
        border="solid white" w='500px'
        borderRadius='10px'
        p='10px'
        flexDirection='column'
      >
        <HStack>
          <Text color='white' fontSize='xl' fontWeight='bold'>Produk RPH</Text>
          <InventoryRounded sx={{ color: 'white' }}/>
        </HStack>
        <UnorderedList color='white' spacing={'10px'} mt='10px'>
          <ListItem>ID: {id}</ListItem>
          <ListItem>Penginput: {data?.Akun_RPH}</ListItem>
          <ListItem>Jenis Kelamin: {data?.jenis_kelamin}</ListItem>
          <ListItem>Tanggal Pemotongan: {convertDate(data?.tanggal_pemotongan)}</ListItem>
          <ListItem>
            <HStack>
              <Text>Halal:</Text>
              <CheckCircle sx={{ color: '#3c9a5d' }}/>
            </HStack>
          </ListItem>
          <ListItem>Tanggal Input: {convertUnixDate(data?.date)}</ListItem>
        </UnorderedList>
      </Flex>
    )
  }
  
  export default TracePemotongan;