import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({input, output})

let secretNum = 0;
let numAttempts = 5;

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const isNum = maybeNum => {
    return Number.isInteger(Math.floor(maybeNum))
}

const playAgain = (winStatus) => {
    rl.question(`${winStatus} \n The Number was ${secretNum} \n Want to play again? \n`, (input) => {
        if(['n', 'N', 'No', "NO"].includes(input)){
            rl.close()
        }else{
            numAttempts = 5
            askRange()
        }
    })
}

const checkGuess = (input) => {
    if (secretNum === input){
        console.log("Correct!")
        return true
    }else if (secretNum > input){
        console.log("Too low...")
        return false
    }
    console.log("Too high...")
    return false
}

const askGuess = () => {
    if(numAttempts === 0){
        playAgain("You lose!")
    }
    numAttempts--
    rl.question("Enter a guess \n", (input) => {
        if(isNum(input)) {
            if(checkGuess(Math.floor(input))) {
                playAgain("You Win!")
            }
            askGuess()
        }else{
            console.log("NaN")
            askGuess()
        }
    })
}

const askMin = (max) => {
    rl.question("Enter a min number: \n", (min) => {
        if(isNum(min)) {
            if(Math.floor(max) < Math.floor(min)){
                let temp = max
                max = min
                min = temp
            }
            console.log(`I'm thinking of a number between ${min} and ${max}...`)
            secretNum = randomInRange(min, max)
            askGuess()
        }else{
        console.log("NaN")
        askMin()
        }
    })
}

const askRange = () => {
    rl.question("Enter a max number: \n", (max) => {
        if(isNum(max)) {
            askMin(max)
        }else{
            console.log("NaN")
            askRange()
        }
    })
}

askRange()
