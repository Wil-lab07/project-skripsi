import type { NextPage } from 'next'
import { useTracePemotongan } from '../swr/useTrace'
import { Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";

const TablePemotongan: NextPage = () => {          
  const data = useTracePemotongan()
  
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_Pemotongan',
      label: 'ID Pemotongan',
    },
    {
      name: 'Akun_RPH',
      label: 'Penginput',
    },
    {
      name: 'jenis_kelamin',
      label: 'Jenis Kelamin',
    },
    {
      name: 'tanggal_pemotongan',
      label: 'Tanggal Pemotongan',
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
  
export default TablePemotongan



