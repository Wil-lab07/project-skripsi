//SPDX-License-Identifier: Unlicense
//Creator: William Chandra
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Trace is AccessControl {
    // Struct merepresentasikan jenis data yang disimpan pada blockchain
    struct Pemotongan {
        string ID;
        address Akun_RPH;
        string jenis_kelamin;
        string tanggal_pemotongan;
        bool status_kehalalan;
        uint256 date;
    }

    struct ProdukRPH {
        string ID;
        string ID_Pemotongan;
        string nama;
        bool status_kehalalan;
        uint256 date;
    }

    struct ProdukDistributor {
        string ID;
        string ID_ProdukRPH;
        string Akun_Distributor;
        string nama;
        string durasi_penyimpanan;
        string waktu_pengiriman;
        string waktu_tiba;
        bool status_kehalalan;
        uint256 date;
    }

    struct Makanan {
        string ID;
        string ID_ProdukDistributor;
        string Akun_RumahMakan;
        string nama;
        string tanggal_pengolahan;
        bool status_kehalalan;
        uint256 date;
    }

    // Event merupakan log yang disimpan pada blockchain
    event TracePemotongan(
        string ID_Pemotongan,
        address Akun_RPH,
        string jenis_kelamin,
        string tanggal_pemotongan,
        bool status_kehalalan,
        uint256 date
    );

    event TraceProdukRPH(
        string ID_ProdukRPH,
        string ID_Pemotongan,
        string nama,
        bool status_kehalalan,
        uint256 date
    );

    event TraceProdukDistributor(
        string ID_ProdukDistributor,
        string ID_ProdukRPH,
        string Akun_Distributor,
        string nama,
        string durasi_penyimpanan,
        string waktu_pengiriman,
        string waktu_tiba,
        bool status_kehalalan,
        uint256 date
    );

    event TraceMakanan(
        string ID_Makanan,
        string ID_ProdukDistributor,
        string Akun_RumahMakan,
        string nama,
        string tanggal_pengolahan,
        bool status_kehalalan,
        uint256 date
    );

    // Index merepresentasikan urutan data yang disimpan pada blockchain
    uint index_pemotongan;
    uint index_produkRPH;
    uint index_produkDistributor;
    uint index_makanan;

    // Mappings merepresentasikan tabel data yang disimpan pada blockchain
    // Mappings juga berjalan sebagai fungsi untuk mengakses data yang tersimpan dengan memanggil key value
    // Disinilah key dari mapping akan dipanggil oleh FE untuk mengakses data yang tersimpan
    mapping(string => Pemotongan) public pemotongan;
    mapping(string => ProdukRPH) public produkRPH;
    mapping(string => ProdukDistributor) public produkDistributor;
    mapping(string => Makanan) public makanan;

    // Jenis Akses pada Smart Contract
    bytes32 public constant RPH = keccak256("RPH");
    bytes32 public constant DISTRIBUTOR = keccak256("DISTRIBUTOR");
    bytes32 public constant RUMAH_MAKAN = keccak256("RUMAH_MAKAN");

    constructor(address _rph, address _distributor, address _rumahMakan) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Memberikan akses kepada operator
        _setupRole(RPH, _rph);
        _setupRole(DISTRIBUTOR, _distributor);
        _setupRole(RUMAH_MAKAN, _rumahMakan);
    }

    // Fungsi input data pemotongan
    function inputPemotongan(
        string memory _jenis_kelamin,
        string memory _tanggal_pemotongan,
        bool _status_kehalalan
    ) public onlyRole(RPH) {
        require(_status_kehalalan == true, "Status Produk harus halal");

        index_pemotongan++;
        string memory ID = string.concat(
            "PMTG",
            Strings.toString(index_pemotongan)
        );
        pemotongan[ID] = Pemotongan(
            ID,
            msg.sender,
            _jenis_kelamin,
            _tanggal_pemotongan,
            _status_kehalalan,
            block.timestamp
        );

        emit TracePemotongan(
            ID,
            msg.sender,
            _jenis_kelamin,
            _tanggal_pemotongan,
            _status_kehalalan,
            block.timestamp
        );
    }

    function inputProdukRPH(
        string memory _ID_Pemotongan,
        string memory _nama,
        bool _status_kehalalan
    ) public onlyRole(RPH) {
        require(
            keccak256(
            abi.encodePacked((
                pemotongan[_ID_Pemotongan].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Pemotongan Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        index_produkRPH++;
        string memory ID = string.concat(
            "PRPH",
            Strings.toString(index_produkRPH)
        );
        produkRPH[ID] = ProdukRPH(
            ID,
            _ID_Pemotongan,
            _nama,
            _status_kehalalan,
            block.timestamp
        );

        emit TraceProdukRPH(
            ID,
            _ID_Pemotongan,
            _nama,
            _status_kehalalan,
            block.timestamp
        );
    }

    function inputProdukDistributor(
        string memory _ID_ProdukRPH,
        string memory _Akun_Distributor,
        string memory _nama,
        string memory _durasi_penyimpanan,
        string memory _waktu_pengiriman,
        string memory _waktu_tiba,
        bool _status_kehalalan
    ) public onlyRole(DISTRIBUTOR) {
        require(
            keccak256(
            abi.encodePacked((
                produkRPH[_ID_ProdukRPH].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Produk RPH Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        index_produkDistributor++;
        string memory ID = string.concat(
            "PDST",
            Strings.toString(index_produkDistributor)
        );
        produkDistributor[ID] = ProdukDistributor(
            ID,
            _ID_ProdukRPH,
            _Akun_Distributor,
            _nama,
            _durasi_penyimpanan,
            _waktu_pengiriman,
            _waktu_tiba,
            _status_kehalalan,
            block.timestamp
        );

        emit TraceProdukDistributor(
            ID,
            _ID_ProdukRPH,
            _Akun_Distributor,
            _nama,
            _durasi_penyimpanan,
            _waktu_pengiriman,
            _waktu_tiba,
            _status_kehalalan,
            block.timestamp
        );
    }

    function inputMakanan(
        string memory _ID_ProdukDistributor,
        string memory _Akun_RumahMakan,
        string memory _nama,
        string memory _tanggal_pengolahan,
        bool _status_kehalalan
    ) public onlyRole(RUMAH_MAKAN) {
        require(
            keccak256(
            abi.encodePacked((
                produkDistributor[_ID_ProdukDistributor].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Produk RPH Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        index_makanan++;
        string memory ID = string.concat(
            "MKN",
            Strings.toString(index_makanan)
        );
        makanan[ID] = Makanan(
            ID,
            _ID_ProdukDistributor,
            _Akun_RumahMakan,
            _nama,
            _tanggal_pengolahan,
            _status_kehalalan,
            block.timestamp
        );

        emit TraceMakanan(
            ID,
            _ID_ProdukDistributor,
            _Akun_RumahMakan,
            _nama,
            _tanggal_pengolahan,
            _status_kehalalan,
            block.timestamp
        );
    }
}
