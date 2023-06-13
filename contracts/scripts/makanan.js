const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const contractAddress = '0x83d2AD111d85501Ca9498dc1130aa81785b03315'
const Makanan = '27859d2de3b885e43148a8b925d4a44d16cf41ddc66c5146dd1298e79480f077'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const infura = new ethers.providers.InfuraProvider("maticmum")

// Membuat Wallet Instance
const wallet = new ethers.Wallet(Makanan, infura)

// Membuat Contract Instance yang sudah terhubung dengan wallet instance
const contract = new ethers.Contract(contractAddress, trace.abi, wallet)

// Melakukan Pengujian Makanan 
const start = async () => {
    for (let i = 1; i <= 48; i++) {
        console.time(`Makanan Time ${i}`)
        const tx = await contract.inputMakanan(
            "PDST1",
            "Nasi Rendang",
            "2023-02-04 15:00:00",
            true            
        )
        await tx.wait();
        console.timeEnd(`Makanan Time ${i}`)
        console.log(`Makanan Hash ${i}: ${tx.hash}`)
    }

    // for (let i = 4; i <= 6; i++) {
    //     console.time(`Makanan Time ${i}`)
    //     const tx = await contract.inputMakanan(
    //         "PDST1",
    //         "Bakso",
    //         "2023-02-03 15:00:00",
    //         true            
    //     )
    //     await tx.wait();
    //     console.timeEnd(`Makanan Time ${i}`)
    //     console.log(`Makanan Hash ${i}: ${tx.hash}`)
    // }
}

start()


