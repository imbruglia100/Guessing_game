import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({input, output})

const sectretNum = 7

const isNum = maybeNum => {
    return Number.isInteger(Math.floor(maybeNum.trim()))
}

const checkGuess = (input) => {
    if (sectretNum === input){
        console.log("Correct!")
        rl.close()
        return true
    }else if (sectretNum > input){
        console.log("Too low...")
        return false
    }
    console.log("Too high...")
    return false
}

const askGuess = () => {
    rl.question("Enter a guess \n", (input) => {
        if(isNum(input)) {
            checkGuess(Math.floor(input)) ? console.log("You Win!") : askGuess()
        }else{
            console.log("NaN")
            askGuess()
        }
    })
}

askGuess()
