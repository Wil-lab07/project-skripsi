import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowDownwardRounded } from '@mui/icons-material';
import MenuComponent from '../../components/menu';
import TraceMakanan from '../../components/traceMakanan';
import TraceDistributor from '../../components/traceDistributor';
import TraceRPH from '../../components/traceRPH';
import TracePemotongan from '../../components/tracePemotongan';

const Tracing: NextPage = () => {
  const [idProdukDistributor, setIdProdukDistributor] = useState<string>(); 
  const [idProdukRPH, setIdProdukRPH] = useState<string>();
  const [idPemotongan, setIdPemotongan] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // if (
  //   //     idProdukDistributor != undefined || idProdukDistributor != ""
  //   //   ) {
  //   //   setLoading(false)
  //   // }
  //   console.log(idPemotongan)
  // }, [idPemotongan])

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
        py={'100px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <TraceMakanan setIdProdukDistributor={setIdProdukDistributor}/>
            <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
            <TraceDistributor id={idProdukDistributor} setIdProdukRPH={setIdProdukRPH}/>
            <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
            <TraceRPH id={idProdukRPH} setIdPemotongan={setIdPemotongan}/>
            <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
            <TracePemotongan id={idPemotongan}/>
          </>
        )}
      </Flex>
    </>
  )
}

export default Tracing;