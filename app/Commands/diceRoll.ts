export class DiceRoll {
    splitCommand(command: string): Array<string>{
        
        if(command.includes("d")){
            let splitCommand = command.split(" ");
            let split: Array<string> = splitCommand[1].split("d");
            return split;
        }
        return command.split(" ");
    }
    
    rollDice(diceNum: number, diceSides: number) {
        if(diceNum === null)
        {
            return Math.floor(Math.random() * diceSides ) + 1;
        }
        
        let diceResults: Array<number> = [];
        for (let index = 0; index < diceNum; index++) {
            diceResults.push(Math.floor(Math.random() * diceSides ) + 1);
        }
        return Math.max(...diceResults);
        
    }
}
