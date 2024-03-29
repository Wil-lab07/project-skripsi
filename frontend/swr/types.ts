export type TraceRequest = {
  type?: 'pemotongan' | 'rph' | 'distributor' | 'makanan';
}

export type TracePemotonganResult = {
  ID_Pemotongan: string,
  Akun_RPH: string,
  jenis_kelamin: string,
  tanggal_pemotongan: string,
  status_kehalalan: boolean,
  date: string
}

export type TraceProdukRPHResult = {
  ID_ProdukRPH: string,
  ID_Pemotongan: string,
  status_kehalalan: boolean,
  date: string
}

export type TraceProdukDistributorResult = {
  ID_ProdukDistributor: string,
  ID_ProdukRPH: string,
  Akun_Distributor: string,
  durasi_penyimpanan: string,
  waktu_pengiriman: string,
  waktu_tiba: string,
  status_kehalalan: boolean,
  date: string
}

export type TraceMakananResult = {
  ID_Makanan: string,
  ID_ProdukDistributor: string,
  Akun_RumahMakan: string,
  nama: string,
  tanggal_pengolahan: string,
  status_kehalalan: boolean,
  date: string
}
