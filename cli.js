import minimist from 'minimist'
import { sign } from './sign.js'
import { submit } from './submit.js'
import { askChoice } from './terminal.js'
import { createTx } from './tx.js'

async function cli(args){
	console.log(
` __  _____ ___ _    ___ _    ___ 
 \\ \\/ / _ \\ _ \\ |  / __| |  |_ _|
  >  <|   /  _/ |_| (__| |__ | | 
 /_/\\_\\_|_\\_| |____\\___|____|___|`)
														 
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
					close: 'close wallet',
				}
			})
		}

		switch(action){
			case 'tx': {
				await createTx({ type: null })
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

			case 'close': {
				await submit({ payload: null })
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
			throw error
		}
	}

	process.exit()
}

await cli(minimist(process.argv.slice(2)))