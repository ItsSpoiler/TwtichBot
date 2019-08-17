export class DiceRoll {
    splitCommand(command: string): Array<string>{
        
        if(command.includes("d")){
            // const regex = new RegExp('({\d}{1})d({\d}+)/i');
            var splitCommand = command.split(" ");
            var split = splitCommand[1].split("d");
        }
        return command.split(" ");
    }
    
    rollDice(diceNum: number, diceSides: number) {
        if(diceNum === null)
        {
            return Math.floor(Math.random() * diceSides ) + 1;
        }
        
        let diceResults: Array<number> = [];
        for (let index = 0; index < diceSides; index++) {
            diceResults.push(Math.floor(Math.random() * diceSides ) + 1);
        } 
        console.log(diceResults);
        return Math.max(...diceResults);
        
    }
}
