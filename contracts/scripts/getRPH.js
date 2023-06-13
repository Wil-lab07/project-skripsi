const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const contractAddress = '0x83d2AD111d85501Ca9498dc1130aa81785b03315'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const infura = new ethers.providers.InfuraProvider("maticmum")

// Membuat Contract Instance yang sudah terhubung dengan wallet instance
const contract = new ethers.Contract(contractAddress, trace.abi, infura)

const traceRPH = async () => {
    console.time(`Trace RPH`)
    const rph = contract.filters.TraceProdukRPH();
    const dataRPH = await contract.queryFilter(rph)
    console.timeEnd(`Trace RPH`)
    console.log(`Jumlah Input RPH: ${dataRPH.length}`) 
}

const start = async () => {
    for (let i = 1; i <= 6; i++) {
        await traceRPH()
    }
}
start()