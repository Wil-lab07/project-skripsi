const ethers = require('ethers');
const trace = require('../artifacts/contracts/Trace.sol/Trace.json')
// const trace2 = require('../artifacts/contracts/Trace2.sol/Trace2.json')
const contractAddress = '0x022Ed06acCe9a80016e45E2dce38110bD9310cFD'

// Menghubungkan dengan node pada jaringan blockchain polygon mumbai testnet
const provider = new ethers.providers.InfuraProvider("maticmum")
// const provider2 = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/7M-r3OYHfkI_B9WYcpEvJ4_LRT_O2iPu", 80001)

const RPH = 'e0cb561cbc9ec56bd61d5ffb7ad0afe80d27995b271635d7258a7fefada26f24'
const Distributor = 'd1c17416dfaa6948f6ad5b0ec1cb067ab922e2bfc8e0f8188900a11389496ff6'
const Makanan = '27859d2de3b885e43148a8b925d4a44d16cf41ddc66c5146dd1298e79480f077'

// Membuat Wallet Instance
const walletRPH = new ethers.Wallet(RPH, provider)
const walletDistributor = new ethers.Wallet(Distributor, provider)
const walletMakanan = new ethers.Wallet(Makanan, provider)

// Membuat Contract Instance
const contractRPH = new ethers.Contract(contractAddress, trace2.abi, walletRPH)
const contractDistributor = new ethers.Contract(contractAddress, trace2.abi, walletDistributor)
const contractMakanan = new ethers.Contract(contractAddress, trace2.abi, walletMakanan)

const contractWithoutAccount = new ethers.Contract(contractAddress, trace2.abi, provider)
const contractWIthoutAccount2 = new ethers.Contract(contractAddress, trace2.abi, provider2)

// Melakukan Pengujian Penelusuran Seluruh Data
// const start = async () => {
//     let tx;    
//     console.time(`All Data`)
//     const pemotongan = contractWithoutAccount.filters.TracePemotongan();
//     const dataPemotongan = await contractWithoutAccount.queryFilter(pemotongan)

//     // const rph = contractWithoutAccount.filters.TraceProdukRPH();
//     // const dataRPH = await contractWithoutAccount.queryFilter(rph)

//     // const distributor = contractWithoutAccount.filters.TraceProdukDistributor();
//     // const dataDistributor = await contractWithoutAccount.queryFilter(distributor)
    
//     // const makanan = contractWithoutAccount.filters.TraceMakanan();
//     // const dataMakanan = await contractWithoutAccount.queryFilter(makanan)
//     console.timeEnd(`All Data`)
//     console.log(`Jumlah Input Pemotongan: ${dataPemotongan.length}`) 
//     // console.log(`Jumlah Input RPH: ${dataRPH.length}`) 
//     // console.log(`Jumlah Input Distributor: ${dataDistributor.length}`) 
//     // console.log(`Jumlah Input Makanan: ${dataMakanan.length}`) 
//     console.log(`-------------------------------------------------------`)
// } 

// start()

const pemotongan = async () => {
    for (let i = 1; i <= 6; i++) {
        const tx = await contractRPH.inputPemotongan(
            "Jantan",
            "11 Juni 2022",
            true
        )
        await tx.wait();
        console.log(`Pemotongan Hash ${i}: ${tx.hash}`)
    }
}

const rph = async () => {
    for (let i = 1; i <= 6; i++){
        const tx = await contractRPH.inputProdukRPH(
            "PMTG1",
            true
        )
        await tx.wait();
        console.log(`Produk RPH Hash ${i}: ${tx.hash}`)
    }
}

const distributor = async () => {
    for (let i = 1; i <= 6; i++){
        const tx = await contractDistributor.inputProdukDistributor(
            "PRPH1",
            "2023-02-03 14:00:00",
            "2023-02-03 15:00:00",
            "2023-02-03 16:00:00",
            true            
        )
        await tx.wait();
        console.log(`Produk Distributor Hash ${i}: ${tx.hash}`)
    }
}

const makanan = async () => {
    for (let i = 1; i <= 6; i++){
        const tx = await contractMakanan.inputMakanan(
            "PDST1",
            "Nasi Rendang",
            "2023-02-04 15:00:00",
            true            
        )
        await tx.wait();
        console.log(`Makanan Hash ${i}: ${tx.hash}`)
    }
}

const tracePemotongan = async () => {
    for (let i = 1; i <= 6; i++) {
        await pemotongan().then(async () => {
            console.time(`Trace Pemotongan Provider 1 ${i}`)
            let pemotongan = contractWithoutAccount.filters.TracePemotongan();
            let dataPemotongan = await contractWithoutAccount.queryFilter(pemotongan)
            console.timeEnd(`Trace Pemotongan Provider 1 ${i}`)

            console.time(`Trace Pemotongan Provider 2 ${i}`)
            pemotongan = contractWIthoutAccount2.filters.TracePemotongan();
            dataPemotongan = await contractWIthoutAccount2.queryFilter(pemotongan)
            console.timeEnd(`Trace Pemotongan Provider 2 ${i}`)

            console.log(`Jumlah Pemotongan ${i}: ${dataPemotongan.length}`)
        })
    }
}
const traceRPH = async () => {
    for (let i = 1; i <= 6; i++) {
        await rph().then(async () => {
            console.time(`Trace RPH Provider 1 ${i}`)
            let rph = contractWithoutAccount.filters.TraceProdukRPH();
            let dataRPH = await contractWithoutAccount.queryFilter(rph)
            console.timeEnd(`Trace RPH Provider 1 ${i}`)

            console.time(`Trace RPH Provider 2 ${i}`)
            rph = contractWIthoutAccount2.filters.TraceProdukRPH();
            dataRPH = await contractWIthoutAccount2.queryFilter(rph)
            console.timeEnd(`Trace RPH Provider 2 ${i}`)

            console.log(`Jumlah RPH ${i}: ${dataRPH.length}`)
        })
    }
}
const traceDistributor = async () => {
    for (let i = 1; i <= 6; i++){
        await distributor().then(async () => {
            console.time(`Trace Distributor Provider 1 ${i}`)
            let distributor = contractWithoutAccount.filters.TraceProdukDistributor();
            let dataDistributor = await contractWithoutAccount.queryFilter(distributor)
            console.timeEnd(`Trace Distributor Provider 1 ${i}`)

            console.time(`Trace Distributor Provider 2 ${i}`)
            distributor = contractWIthoutAccount2.filters.TraceProdukDistributor();
            dataDistributor = await contractWIthoutAccount2.queryFilter(distributor)
            console.timeEnd(`Trace Distributor Provider 2 ${i}`)

            console.log(`Jumlah Distributor ${i}: ${dataDistributor.length}`)
        })
    }
}
const traceMakanan = async () => {
    for (let i = 1; i <= 6; i++){
        await makanan().then(async () => {
            console.time(`Trace Makanan Provider 1 ${i}`)
            let makanan = contractWithoutAccount.filters.TraceMakanan();
            let dataMakanan = await contractWithoutAccount.queryFilter(makanan)
            console.timeEnd(`Trace Makanan Provider 1 ${i}`)

            console.time(`Trace Makanan Provider 2 ${i}`)
            makanan = contractWithoutAccount.filters.TraceMakanan();
            dataMakanan = await contractWithoutAccount.queryFilter(makanan)
            console.timeEnd(`Trace Makanan Provider 2 ${i}`)

            console.log(`Jumlah Makanan ${i}: ${dataMakanan.length}`)
        })
    }
}

const start = async () => {
    await tracePemotongan()
    console.log('----------------------------')
    await traceRPH()
    console.log('----------------------------')
    await traceDistributor()
    console.log('----------------------------')
    await traceMakanan()
}
start()




