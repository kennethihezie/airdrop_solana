const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js')

// create a new wallet
const wallet = new Keypair()


const getWalletBalance = async() => {
    try{
      const connection = new Connection(clusterApiUrl('devnet', 'confirmed'))
      const balance = await connection.getBalance(wallet.publicKey)
      console.log('wallet balance is', balance);
    } catch(e) {
        console.error(e);
    }
}

const airDropSol = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet', 'confirmed'))
        // multiplying by LAMPORTS_PER_SOL converts the value to sol equivalent
        const fromAirDropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction({ signature: fromAirDropSignature })
    } catch(e) {
        console.error(e);
    }
}

const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

main()

