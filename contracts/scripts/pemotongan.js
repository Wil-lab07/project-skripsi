const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const contractAddress = '0x83d2AD111d85501Ca9498dc1130aa81785b03315'
const RPH = 'e0cb561cbc9ec56bd61d5ffb7ad0afe80d27995b271635d7258a7fefada26f24'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const infura = new ethers.providers.InfuraProvider("maticmum")

// Membuat Wallet Instance
const wallet = new ethers.Wallet(RPH, infura)

// Membuat Contract Instance yang sudah terhubung dengan wallet instance
const contract = new ethers.Contract(contractAddress, trace.abi, wallet)

// Melakukan Pengujian Pemotongan 
const start = async () => {
    for (let i = 1; i <= 3; i++) {
        console.time(`Pemotongan Time ${i}`)
        const tx = await contract.inputPemotongan(
            "Jantan",
            "11 Juni 2023",
            true
        )
        await tx.wait();
        console.timeEnd(`Pemotongan Time ${i}`)
        console.log(`Pemotongan Hash ${i}: ${tx.hash}`)
    }

    for (let i = 4; i <= 6; i++) {
        console.time(`Pemotongan Time ${i}`)
        const tx = await contract.inputPemotongan(
            "Betina",
            "11 Juni 2023",
            true
        )
        await tx.wait();
        console.timeEnd(`Pemotongan Time ${i}`)
        console.log(`Pemotongan Hash ${i}: ${tx.hash}`)
    }
}

start()


