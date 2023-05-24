import type { NextPage } from 'next'
import { useTraceProdukDistributor } from '../swr/useTrace'
import { Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";

const TableDistributor: NextPage = () => {          
  const data = useTraceProdukDistributor()
  
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_ProdukDistributor',
      label: 'ID',
    },
    {
      name: 'ID_ProdukRPH',
      label: 'ID Produk RPH',
    },
    {
      name: 'Akun_Distributor',
      label: 'Penginput',
    },
    {
      name: 'durasi_penyimpanan',
      label: 'Tanggal Penyimpanan',
    },
    {
      name: 'waktu_pengiriman',
      label: 'Waktu Pengiriman',
    },
    {
      name: 'waktu_tiba',
      label: 'Waktu Tiba',
    },
    {
      name: 'status_kehalalan',
      label: 'Halal',
      options: {
        customBodyRender: () => {
          return (
            <>
              <CheckCircle sx={{ color: '#3c9a5d' }}/>
            </>
          )
        }
      }
    },
    {
      name: 'date',
      label: 'Tanggal Input',
    }
  ]

  return (
    <>
      <MUIDataTable
        title={"Data Pemotongan"}
        columns={column}
        data={data?.data}
        options={{
          rowsPerPage: 5,
          selectableRows: 'none',
          elevation: 1,
          textLabels: {
            body: {
              noMatch: data.isLoading ? (
                <Text>Loading...</Text>
              ) : (
                "Maaf, belum ada data yang tersedia"
              )
            }
          }
        }}
      />
    </>
  )
}
  
export default TableDistributor



