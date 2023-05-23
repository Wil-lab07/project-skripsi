import type { NextPage } from 'next'
import { useState } from 'react'
import { ethers } from 'ethers'
import { traceAddress } from '../constant/metadata'
import Trace from '../constant/TraceABI.json'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const TablePemotongan: NextPage = () => {          
  const [dataType, setDataType] = useState('pemotongan')

  

  const ListenToEvent = () => {
    // contract.on("TracePemotongan", (ID_Pemotongan, Akun_RPH, jenis_kelamin, tanggal_pemotongan, status_kehalalan, date, event) => {
    //   let data = {
    //     ID_Pemotongan,
    //     Akun_RPH,
    //     jenis_kelamin,
    //     tanggal_pemotongan,
    //     status_kehalalan,
    //     date,
    //     event
    //   }
    //   console.log(data)
    // }) 
  }
  ListenToEvent()

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
  
export default TablePemotongan



