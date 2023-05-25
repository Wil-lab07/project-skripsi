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
  import { TraceProdukDistributorResult } from "../swr/types"
  import { traceAddress } from "../constant/metadata"
  import { ethers } from "ethers"
  import Trace from "../constant/TraceABI.json"
  import { CheckCircle, LocalShipping } from "@mui/icons-material"
  
  type TraceDistributorProps = {
    id: string | undefined;
    setIdProdukRPH: Dispatch<SetStateAction<string | undefined>>
  }
  
  const TraceDistributor: FunctionComponent<TraceDistributorProps> = ({ id, setIdProdukRPH }) => {
    const [data, setData] = useState<TraceProdukDistributorResult>();
    const TraceProvider = new ethers.InfuraProvider('matic-mumbai')
    const TraceContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)
    
    useEffect(() => {
      if (id) {
        console.time('traceDistributorAsync')
        TraceContract.produkDistributor(id).then((res: TraceProdukDistributorResult) => {
          setIdProdukRPH(res.ID_ProdukRPH)
          setData(res)
        })
        .catch((err: Error) => console.log(err))
      }
    }, [id])
  
    if (data != undefined) {
      console.timeEnd('traceDistributorAsync')
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
          <Text color='white' fontSize='xl' fontWeight='bold'>Distributor</Text>
          <LocalShipping sx={{ color: 'white' }}/>
        </HStack>
        <UnorderedList color='white' spacing={'10px'} mt='10px'>
          <ListItem>ID: {id}</ListItem>
          <ListItem>ID Produk RPH: {data?.ID_ProdukRPH}</ListItem>
          <ListItem>Penginput: {data?.Akun_Distributor}</ListItem>
          <ListItem>Tanggal Penyimpanan: {convertDate(data?.durasi_penyimpanan)}</ListItem>
          <ListItem>Tanggal Pengiriman: {convertDate(data?.waktu_pengiriman)}</ListItem>
          <ListItem>Tanggal Penerimaan: {convertDate(data?.waktu_tiba)}</ListItem>
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
  
  export default TraceDistributor;