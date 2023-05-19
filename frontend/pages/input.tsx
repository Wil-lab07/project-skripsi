import { 
    Box,
    Button, 
    Flex,
    Text 
} from '@chakra-ui/react'
import {
    useAccount, 
    useConnect, 
    useEnsName, 
    useContractRead
} from 'wagmi'
import { InjectedConnector } from '@wagmi/core'
import Trace from '../constant/TraceABI.json'
import { 
    smartContractAddress,
    accessRPH,
    accessDISTRIBUTOR,
    accessRUMAH_MAKAN,
    accessADMIN 
} from '../constant/metadata'
import { useState } from 'react'
import { RejectAccess } from '../components/reject'

export default function Input() {
    const {address, isConnected} = useAccount()
    const {data: ensName} = useEnsName({address})
    const {connect} = useConnect({
        connector: new InjectedConnector()
    })
    const [access, setAccess] = useState(false)

    const { data: rphResult, isError: rphError, isLoading: rphLoading } = useContractRead({
        address: smartContractAddress,
        abi: Trace.abi,
        functionName: 'hasRole',
        args: [accessRPH, address],
        watch: true
    })

    const { data: distributorResult, isError: distributorError, isLoading: distributorLoading } = useContractRead({
        address: smartContractAddress,
        abi: Trace.abi,
        functionName: 'hasRole',
        args: [accessDISTRIBUTOR, address],
        watch: true
    })

    const { data: rumahMakanResult, isError: rumahMakanError, isLoading: rumahMakanLoading } = useContractRead({
        address: smartContractAddress,
        abi: Trace.abi,
        functionName: 'hasRole',
        args: [accessRUMAH_MAKAN, address],
        watch: true
    })

    const { data: adminResult, isError: adminError, isLoading: adminLoading } = useContractRead({
        address: smartContractAddress,
        abi: Trace.abi,
        functionName: 'hasRole',
        args: [accessADMIN, address],
        watch: true
    })

    const Connect = () => {
        return (
            <>
                <Flex 
                    direction={'column'} 
                    justifyContent={'center'} 
                    alignItems={'center'}
                    height={'100vh'}
                >
                    <Button 
                        colorScheme='blue' 
                        size={'lg'}
                        onClick={() => connect()}
                    >
                        Connect Wallet
                    </Button>
                </Flex>
            </>
        )
    }

    const Content = (props: {addr: string | undefined}) => {        
        return (
            <>
                {rphResult || distributorResult || rumahMakanResult || adminResult
                    ?
                    <>Hello</> 
                    :
                    <RejectAccess/>
                }
            </>
        )
    }

    return (
        <>
            {isConnected ? <Content addr={address}/> : <Connect />}
        </>
    )
}
  