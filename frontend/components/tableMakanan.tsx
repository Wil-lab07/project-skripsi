import type { NextPage } from 'next'
import { useTraceMakanan } from '../swr/useTrace'
import { Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";

const TableMakanan: NextPage = () => {          
  const data = useTraceMakanan()
  
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_Makanan',
      label: 'ID',
    },
    {
      name: 'ID_ProdukDistributor',
      label: 'ID Produk Distributor',
    },
    {
      name: 'Akun_RumahMakan',
      label: 'Penginput',
    },
    {
      name: 'nama',
      label: 'Nama Makanan',
    },
    {
      name: 'tanggal_pengolahan',
      label: 'Tanggal Pengolahan',
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
  
export default TableMakanan



