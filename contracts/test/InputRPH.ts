import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Trace.InputPemotongan()', function() {
    let owner, rph, distributor, rumah_makan: SignerWithAddress;
    let base: Contract;

    beforeEach(async function() {
        [owner, rph, distributor, rumah_makan] = await ethers.getSigners();
        const Base = await ethers.getContractFactory('Trace');
        base = await Base.deploy(
            rph.address,
            distributor.address,
            rumah_makan.address
        );
        await base.deployed();
    })

    it('Input Data ProdukRPH Success', async () => {
        await base.connect(rph).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            true
        )
        await base.connect(rph).inputProdukRPH(
            "PMTG1",
            "Daging Sapi",
            true
        )
        const produkRPH = await base.produkRPH('PRPH1')
        expect(await produkRPH.ID).to.be.equal('PRPH1')
        expect(await produkRPH.ID_Pemotongan).to.be.equal('PMTG1')
        expect(await produkRPH.nama).to.be.equal('Daging Sapi')
        expect(await produkRPH.status_kehalalan).to.be.equal(true)
    })

    it('Input Data ProdukRPH Failed (Not RPH Account)', async () => {
        await base.connect(rph).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            true
        )
        await expect(base.connect(distributor).inputProdukRPH(
            "PMTG1",
            "Daging Sapi",
            true
        )).to.be.reverted;
    })

    it('Input Data ProdukRPH Failed (Status Kehalalan = false)', async () => {
        await base.connect(rph).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            true
        )
        await expect(base.connect(rph).inputProdukRPH(
            "PMTG1",
            "Daging Sapi",
            false
        )).to.be.revertedWith('Status Produk harus halal');
    })

    it('Input Data ProdukRPH Failed (Data Pemotongan Belum Tersedia)', async () => {
        await expect(base.connect(rph).inputProdukRPH(
            "PMTG1",
            "Daging Sapi",
            true
        )).to.be.revertedWith('Data Pemotongan Tidak Terdaftar');
    })
})