// 
const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
const trace2 = require('../artifacts/contracts/Trace2.sol/Trace2.json')
const contractAddress = '0xCD921407D0177b0560f7E4DEFc7DaE43bcC86430'
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/7M-r3OYHfkI_B9WYcpEvJ4_LRT_O2iPu", 80001)
const contractWithoutAccount = new ethers.Contract(contractAddress, trace2.abi, provider)

const start = async () => {
    console.time(`Trace Pemotongan`)
    const pemotongan = contractWithoutAccount.filters.TracePemotongan();
    const dataPemotongan = await contractWithoutAccount.queryFilter(pemotongan)
    console.timeEnd(`Trace Pemotongan`)
    console.log(`Jumlah Pemotongan : ${dataPemotongan.length}`)
}
start()
