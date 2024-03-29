import type { NextPage } from 'next'
import { useTraceProdukRPH } from '../swr/useTrace'
import { Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";

const TableRPH: NextPage = () => {          
  const data = useTraceProdukRPH()
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_ProdukRPH',
      label: 'ID',
    },
    {
      name: 'ID_Pemotongan',
      label: 'ID Pemotongan',
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
  
export default TableRPH



