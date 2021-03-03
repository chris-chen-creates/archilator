import { createInterface } from 'readline';

import { Interpreter } from './Interpreter';

class Calculator {
    private interpreter = new Interpreter();
	private rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	async run() {
		this.recursivePrompt();
	}

	async recursivePrompt() {
		this.rl.question("> ", (line: string) => {
            try {
                console.log(this.interpreter.eval(line));
            } catch(e) {
                console.error(e);
            }
			this.recursivePrompt();
		});
	}
}

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function startupPrompt() {
	console.warn("archilator initiating...");
	await sleep(1000);
	console.log("stand by.");
	await sleep(1000);
	console.log(".");
	await sleep(100);
	console.log("..");
	await sleep(50);
	console.log("... ->");
	console.log("system stack loaded.");
    console.log("begin input sequence.");
}

async function main() {
	await startupPrompt();
	await (new Calculator()).run();
}

main();
