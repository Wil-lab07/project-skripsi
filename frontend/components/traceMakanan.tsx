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
import { useRouter } from "next/router"
import { TraceMakananResult } from "../swr/types"
import { traceAddress } from "../constant/metadata"
import { ethers } from "ethers"
import Trace from "../constant/TraceABI.json"
import { CheckCircle, Restaurant } from "@mui/icons-material"

type TraceMakananProps = {
  setIdProdukDistributor: Dispatch<SetStateAction<string | undefined>>
}

const TraceMakanan: FunctionComponent<TraceMakananProps> = ({ setIdProdukDistributor }) => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<TraceMakananResult>();
  const TraceProvider = new ethers.InfuraProvider('matic-mumbai')
  const TraceContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)
  
  useEffect(() => {
    if (id) {
      console.time('traceMakananAsync')
      TraceContract.makanan(id).then((res: TraceMakananResult) => {
        setData(res)
        setIdProdukDistributor(res.ID_ProdukDistributor)
      })
      .catch((err: Error) => console.log(err))
    }
  }, [id])

  if (data != undefined) {
    console.timeEnd('traceMakananAsync')
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
      pb='14px'
      flexDirection='column'
    >
      <HStack>
        <Text color='white' fontSize='xl' fontWeight='bold'>Rumah Makan</Text>
        <Restaurant sx={{ color: 'white' }}/>
      </HStack>
      <UnorderedList color='white' spacing={'10px'} mt='10px'>
        <ListItem>ID: {id}</ListItem>
        <ListItem>ID Distributor: {data?.ID_ProdukDistributor}</ListItem>
        <ListItem>Penginput: {data?.Akun_RumahMakan}</ListItem>
        <ListItem>Nama Makanan: {data?.nama}</ListItem>
        <ListItem>Tanggal Pengolahan: {convertDate(data?.tanggal_pengolahan)}</ListItem>
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

export default TraceMakanan;