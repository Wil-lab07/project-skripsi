import type { NextPage } from 'next';
import { Flex, Button } from '@chakra-ui/react';
import {
  useAccount,
  useConnect,
  useContractRead,
} from 'wagmi'
import { useEffect, useState } from 'react';
import { InjectedConnector } from 'wagmi/connectors/injected'
import { polygonMumbai } from 'viem/chains';
import Trace from '../constant/TraceABI.json'
import { 
  traceAddress,
  accessRPH,
  accessDISTRIBUTOR,
  accessRUMAH_MAKAN,
  accessADMIN 
} from '../constant/metadata'
import Reject from '../components/reject';
import Grant from '../components/grant';

const Operator : NextPage = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    chainId: polygonMumbai.id
  })
  const [hasAccess, setHasAccess] = useState(false)

  const { data: rphResult, isError: rphError, isLoading: rphLoading } = useContractRead({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'hasRole',
    args: [accessRPH, address!],
    watch: true
  })
  const { data: distributorResult, isError: distributorError, isLoading: distributorLoading } = useContractRead({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'hasRole',
    args: [accessDISTRIBUTOR, address!],
    watch: true
  })  
  const { data: rumahMakanResult, isError: rumahMakanError, isLoading: rumahMakanLoading } = useContractRead({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'hasRole',
    args: [accessRUMAH_MAKAN, address!],
    watch: true
  })  
  const { data: adminResult, isError: adminError, isLoading: adminLoading } = useContractRead({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'hasRole',
    args: [accessADMIN, address!],
    watch: true
  })

  // Hooks
  useEffect(() => {
    setHasAccess(true)
  }, [address])
  
  if (!hasAccess) return null

  if (!isConnected) {
    return (
      <>
        <Flex
          h="100vh"
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button
            colorScheme='blue'
            size='lg'
            onClick={() => connect()}
          >
            Connect Wallet 
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <>
      {rphResult! || distributorResult! || rumahMakanResult! || adminResult! 
      ? 
        <Grant/> 
      : 
        <Reject/>
      }
    </>  
  )
}

export default Operator;