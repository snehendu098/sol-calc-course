import * as assert from "assert"
import * as anchor from "@project-serum/anchor"
const {SystemProgram} = anchor.web3

describe("mycalculatordapp", () => {
  const provider = anchor.AnchorProvider.local()
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculatordapp

  it ("Creates a Calc",async () => {
    await program.rpc.create("Welcome", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Welcome")
  })

  it("Adds two numbers", async () => {
	  await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
		  accounts: {
			  calculator: calculator.publicKey
		  }

	  })
	  const account = await program.account.calculator.fetch(calculator.publicKey)
	  assert.ok(account.result.eq(new anchor.BN(5)))
  })

  it("Substracts two numbers", async () => {
	  await program.rpc.subtract(new anchor.BN(4), new anchor.BN(3), {
		  accounts: {
			  calculator: calculator.publicKey
		  }

	  })
	  const account = await program.account.calculator.fetch(calculator.publicKey)
	  assert.ok(account.result.eq(new anchor.BN(1)))
  })

  it("Multiplies two numbers", async () => {
	  await program.rpc.multiply(new anchor.BN(4), new anchor.BN(3), {
		  accounts: {
			  calculator: calculator.publicKey
		  }

	  })
	  const account = await program.account.calculator.fetch(calculator.publicKey)
	  assert.ok(account.result.eq(new anchor.BN(12)))
  })

  it ("Divides 2 numbers", async () => {
    await program.rpc.divide(new anchor.BN(5), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.remainder.eq(new anchor.BN(2)))
  })
})
