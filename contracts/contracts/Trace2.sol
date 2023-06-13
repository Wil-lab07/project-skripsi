//SPDX-License-Identifier: Unlicense
//Creator: William Chandra
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Trace2 is AccessControl {
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
        address Akun_RPH;
        bool status_kehalalan;
        uint256 date;
    }

    struct ProdukDistributor {
        string ID;
        string ID_ProdukRPH;
        address Akun_Distributor;
        string tanggal_penyimpanan;
        string tanggal_pengiriman;
        string tanggal_penerimaan;
        bool status_kehalalan;
        uint256 date;
    }

    struct Makanan {
        string ID;
        string ID_ProdukDistributor;
        address Akun_RumahMakan;
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
        address Akun_RPH,
        bool status_kehalalan,
        uint256 date
    );

    event TraceProdukDistributor(
        string ID_ProdukDistributor,
        string ID_ProdukRPH,
        address Akun_Distributor,
        string tanggal_penyimpanan,
        string tanggal_pengiriman,
        string tanggal_penerimaan,
        bool status_kehalalan,
        uint256 date
    );

    event TraceMakanan(
        string ID_Makanan,
        string ID_ProdukDistributor,
        address Akun_RumahMakan,
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

    Pemotongan[] public arrayPemotongan;
    ProdukRPH[] public arrayRPH;
    ProdukDistributor[] public arrayProdukDistributor;
    Makanan[] public arrayMakanan;

    // Jenis Akses pada Smart Contract
    bytes32 public constant RPH = keccak256("RPH");
    bytes32 public constant DISTRIBUTOR = keccak256("DISTRIBUTOR");
    bytes32 public constant RUMAH_MAKAN = keccak256("RUMAH_MAKAN");

    constructor(address _rph, address _distributor, address _rumahMakan) {
        // Secara default akan terbentuk jenis akses ADMIN dan diberikan kepada account yang melakukan deployment
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
        // Pengecekkan kehalalan status produk
        require(_status_kehalalan == true, "Status Produk harus halal");

        // Menyimpan data pemotongan
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

        arrayPemotongan.push(Pemotongan(
            ID,
            msg.sender,
            _jenis_kelamin,
            _tanggal_pemotongan,
            _status_kehalalan,
            block.timestamp
        ));

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
        bool _status_kehalalan
    ) public onlyRole(RPH) {
        // Pengecekkan ketersediaan data pemotongan dan kehalalan status produk
        require(
            keccak256(
            abi.encodePacked((
                pemotongan[_ID_Pemotongan].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Pemotongan Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        // Menyimpan data produk RPH
        index_produkRPH++;
        string memory ID = string.concat(
            "PRPH",
            Strings.toString(index_produkRPH)
        );

        produkRPH[ID] = ProdukRPH(
            ID,
            _ID_Pemotongan,
            msg.sender,
            true,
            block.timestamp
        );

        arrayRPH.push(ProdukRPH(
            ID,
            _ID_Pemotongan,
            msg.sender,
            true,
            block.timestamp
        ));

        emit TraceProdukRPH(
            ID,
            _ID_Pemotongan,
            msg.sender,
            _status_kehalalan,
            block.timestamp
        );
    }

    function inputProdukDistributor(
        string memory _ID_ProdukRPH,
        string memory _tanggal_penyimpanan,
        string memory _tanggal_pengiriman,
        string memory _tanggal_penerimaan,
        bool _status_kehalalan
    ) public onlyRole(DISTRIBUTOR) {
        // Pengecekkan ketersediaan data produk RPH dan kehalalan status produk
        require(
            keccak256(
            abi.encodePacked((
                produkRPH[_ID_ProdukRPH].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Produk RPH Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        // Menyimpan data distributor
        index_produkDistributor++;
        string memory ID = string.concat(
            "PDST",
            Strings.toString(index_produkDistributor)
        );
        produkDistributor[ID] = ProdukDistributor(
            ID,
            _ID_ProdukRPH,
            msg.sender,
            _tanggal_penyimpanan,
            _tanggal_pengiriman,
            _tanggal_penerimaan,
            _status_kehalalan,
            block.timestamp
        );

        arrayProdukDistributor.push(ProdukDistributor(
            ID,
            _ID_ProdukRPH,
            msg.sender,
            _tanggal_penyimpanan,
            _tanggal_pengiriman,
            _tanggal_penerimaan,
            _status_kehalalan,
            block.timestamp
        ));

        emit TraceProdukDistributor(
            ID,
            _ID_ProdukRPH,
            msg.sender,
            _tanggal_penyimpanan,
            _tanggal_pengiriman,
            _tanggal_penerimaan,
            _status_kehalalan,
            block.timestamp
        );
    }

    function inputMakanan(
        string memory _ID_ProdukDistributor,
        string memory _nama,
        string memory _tanggal_pengolahan,
        bool _status_kehalalan
    ) public onlyRole(RUMAH_MAKAN) {        
        // Pengecekkan ketersediaan data produk Distributor dan kehalalan status produk
        require(
            keccak256(
            abi.encodePacked((
                produkDistributor[_ID_ProdukDistributor].ID))) != keccak256(abi.encodePacked((""))), 
                "Data Produk RPH Tidak Terdaftar"
            );
        require(_status_kehalalan == true, "Status Produk harus halal");

        // Menyimpan data makanan
        index_makanan++;
        string memory ID = string.concat(
            "MKN",
            Strings.toString(index_makanan)
        );
        makanan[ID] = Makanan(
            ID,
            _ID_ProdukDistributor,
            msg.sender,
            _nama,
            _tanggal_pengolahan,
            _status_kehalalan,
            block.timestamp
        );

        arrayMakanan.push(Makanan(
            ID,
            _ID_ProdukDistributor,
            msg.sender,
            _nama,
            _tanggal_pengolahan,
            _status_kehalalan,
            block.timestamp
        ));

        emit TraceMakanan(
            ID,
            _ID_ProdukDistributor,
            msg.sender,
            _nama,
            _tanggal_pengolahan,
            _status_kehalalan,
            block.timestamp
        );
    }

    function traceSupplyChain(string memory _ID_Makanan) public view returns (
        Makanan memory,
        ProdukDistributor memory,
        ProdukRPH memory,
        Pemotongan memory
    )
    {
        Makanan memory data1 = makanan[_ID_Makanan];
        ProdukDistributor memory data2 = produkDistributor[data1.ID_ProdukDistributor];
        ProdukRPH memory data3 = produkRPH[data2.ID_ProdukRPH];
        Pemotongan memory data4 = pemotongan[data3.ID_Pemotongan];

        return (data1, data2, data3, data4);
    }

    function tracePemotongan() public view returns (
        Pemotongan[] memory
    ) {
        Pemotongan[] memory data = new Pemotongan[](index_pemotongan + 1);
        data = arrayPemotongan;
        return data;
    }

    function traceProdukRPH() public view returns (
        ProdukRPH[] memory
    ) {
        ProdukRPH[] memory data = new ProdukRPH[](index_produkRPH + 1);
        data = arrayRPH;
        return data;
    }

    function traceProdukDistributor() public view returns (
        ProdukDistributor[] memory
    ) {
        ProdukDistributor[] memory data = new ProdukDistributor[](index_produkDistributor + 1);
        data = arrayProdukDistributor;
        return data;
    }

    function traceMakanan() public view returns (
        Makanan[] memory
    ) {
        Makanan[] memory data = new Makanan[](index_makanan + 1);
        data = arrayMakanan;
        return data;
    }
}
