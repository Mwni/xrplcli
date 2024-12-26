#!/usr/bin/env node

import minimist from 'minimist'
import { sign } from './sign.js'
import { submit } from './submit.js'
import { askChoice, cyan, red } from './terminal.js'
import { createTx } from './tx.js'
import { createWallet, closeWallet, checkWallet } from './wallet.js'
import { useNode } from './net.js'

async function cli(args){
	console.log(cyan(
` __  _____ ___ _    ___ _    ___ 
 \\ \\/ / _ \\ _ \\ |  / __| |  |_ _|
  >  <|   /  _/ |_| (__| |__ | | 
 /_/\\_\\_|_\\_| |____\\___|____|___|
 `))

	if(args.node){
		console.log(`using node ${args.node}`)
		useNode({ url: args.node })
	}
														 
	try{
		let action = args._[0]

		if(!action){
			action = await askChoice({
				message: 'choose action',
				options: {
					tx: 'create transaction',
					sign: 'sign transaction',
					submit: 'submit transaction',
					create: 'create wallet',
					check: 'check wallet',
					close: 'close wallet',
				}
			})
		}

		switch(action){
			case 'tx': {
				await createTx({ type: args._[1] })
				break
			}

			case 'sign': {
				await sign({ tx: null })
				break
			}
		
			case 'submit': {
				await submit({ payload: null })
				break
			}

			case 'create': {
				await createWallet({ entropy: null })
				break
			}

			case 'check': {
				await checkWallet({ secret: null })
				break
			}

			case 'close': {
				await closeWallet({ address: null })
				break
			}
		
			default: {
				console.log(`command "${action}" is not known`)
				break
			}
		}
	}catch(error){
		if(error.abort){
			console.log('ABORT')
		}else{
			console.error(red(error.message || error))
			process.exit(1)
		}
	}

	process.exit()
}

await cli(minimist(process.argv.slice(2)))