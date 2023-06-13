const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const contractAddress = '0x83d2AD111d85501Ca9498dc1130aa81785b03315'
const Distributor = 'd1c17416dfaa6948f6ad5b0ec1cb067ab922e2bfc8e0f8188900a11389496ff6'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const infura = new ethers.providers.InfuraProvider("maticmum")

// Membuat Wallet Instance
const wallet = new ethers.Wallet(Distributor, infura)

// Membuat Contract Instance yang sudah terhubung dengan wallet instance
const contract = new ethers.Contract(contractAddress, trace.abi, wallet)

// Melakukan Pengujian Produk Distributor 
const start = async () => {
    for (let i = 1; i <= 48; i++) {
        console.time(`Produk Distributor Time ${i}`)
        const tx = await contract.inputProdukDistributor(
            "PRPH1",
            "2023-02-03 14:00:00",
            "2023-02-03 15:00:00",
            "2023-02-03 16:00:00",
            true            
        )
        await tx.wait();
        console.timeEnd(`Produk Distributor Time ${i}`)
        console.log(`Produk Distributor Hash ${i}: ${tx.hash}`)
    }

    // for (let i = 4; i <= 6; i++) {
    //     console.time(`Produk Distributor Time ${i}`)
    //     const tx = await contract.inputProdukDistributor(
    //         "PRPH6",
    //         "2023-02-03 14:00:00",
    //         "2023-02-03 15:00:00",
    //         "2023-02-03 16:00:00",
    //         true            
    //     )
    //     await tx.wait();
    //     console.timeEnd(`Produk Distributor Time ${i}`)
    //     console.log(`Produk Distributor Hash ${i}: ${tx.hash}`)
    // }
}

start()


