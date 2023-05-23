import useSWR from 'swr'
import { ethers } from 'ethers'
import { 
  TraceMakananResult,
  TracePemotonganResult, 
  TraceProdukDistributorResult, 
  TraceProdukRPHResult, 
  TraceRequest 
} from './types';
import { traceAddress } from '../constant/metadata';
import Trace from '../constant/TraceABI.json'

const TraceProvider = new ethers.InfuraProvider('matic-mumbai')

const TraceFetcher = (args: TraceRequest): Promise<Array<any>> => {
  const traceabilityContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)

  let filter = traceabilityContract.filters.TracePemotongan()
  switch (args.type) {
    case 'pemotongan':
      filter = traceabilityContract.filters.TracePemotongan();
      break;
    case 'produkRPH':
      filter = traceabilityContract.filters.TraceProdukRPH();
      break;
    case 'produkDistributor':
      filter = traceabilityContract.filters.TraceProdukDistributor();
      break;
    case 'makanan':
      filter = traceabilityContract.filters.TraceMakanan();
      break;
  }
  const data = traceabilityContract.queryFilter(filter)

  return data;
}

export function useTracePemotongan() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'pemotongan'},
    TraceFetcher
  )
  const result: Array<TracePemotonganResult> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const result: TracePemotonganResult = {
      ID_Pemotongan: item.args?.ID_Pemotongan,
      Akun_RPH: item.args?.Akun_RPH,
      jenis_kelamin: item.args?.jenis_kelamin,
      tanggal_pemotongan: item.args?.tanggal_pemotongan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceProdukRPH() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'produkRPH'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const result: TraceProdukRPHResult = {
      ID_ProdukRPH: item.args?.ID_ProdukRPH,
      ID_Pemotongan: item.args?.ID_Pemotongan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceProdukDistributor() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'produkDistributor'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const result: TraceProdukDistributorResult = {
      ID_ProdukDistributor: item.args?.ID_ProdukDistributor,
      ID_ProdukRPH: item.args?.ID_ProdukRPH,
      Akun_Distributor: item.args?.Akun_Distributor,
      durasi_penyimpanan: item.args?.durasi_penyimpanan,
      waktu_pengiriman: item.args?.waktu_pengiriman,
      waktu_tiba: item.args?.waktu_tiba,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceMakanan() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'makanan'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const result: TraceMakananResult = {
      ID_Makanan: item.args?.ID_Makanan,
      ID_ProdukDistributor: item.args?.ID_ProdukDistributor,
      Akun_RumahMakan: item.args?.Akun_RumahMakan,
      nama: item.args?.nama,
      tanggal_pengolahan: item.args?.tanggal_pengolahan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}


