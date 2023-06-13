const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const trace2 = require('../artifacts/contracts/Trace2.sol/Trace2.json')
const contractAddress = '0x83d2AD111d85501Ca9498dc1130aa81785b03315'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const provider = new ethers.providers.InfuraProvider("maticmum")

// Membuat Contract Instance
const contract = new ethers.Contract(contractAddress, trace2.abi, provider)

// Melakukan Pengujian Penelusuran Alur Supply Chain
const start = async () => {
    try {
        const promises = [];
        
        for (let i = 1; i <= 6; i++) {
            promises.push(traceSupplyChain(`MKN${i}`, i));
        }

        const results = await Promise.all(promises);
        results.forEach((result) => {
            console.log(result.trace);
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const traceSupplyChain = async (input, index) => {
    console.time(`Alur Supply Chain ${index}`);
    const trace = await contract.traceSupplyChain(input);
    console.timeEnd(`Alur Supply Chain ${index}`);
    return {
        input,
        trace
    };
};

start();


