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

    it('Input Data Pemotongan Success', async () => {
        await base.connect(rph).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            true
        )
        const pemotongan = await base.pemotongan('PMTG1')
        expect(await pemotongan.ID).to.be.equal('PMTG1')
        expect(await pemotongan.jenis_kelamin).to.be.equal('Laki-Laki')
        expect(await pemotongan.tanggal_pemotongan).to.be.equal('13 Mei 2021')
        expect(await pemotongan.status_kehalalan).to.be.equal(true)
    })

    it('Input Data Pemotongan Failed (Not RPH Account)', async () => {
        await expect(base.connect(distributor).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            true
        )).to.be.reverted;
    }) 

    it('Input Data Pemotongan Failed (Status Kehalalan = false)', async () => {
        await expect(base.connect(rph).inputPemotongan(
            "Laki-Laki",
            "13 Mei 2021",
            false
        )).to.be.revertedWith('Status Produk harus halal')
    })
})