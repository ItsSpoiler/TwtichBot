export class DiceRoll {
    splitCommand(command: string): Array<string>{
        return command.split(" ");
    }
    
    rollDice(diceSides: number) {
        return Math.floor(Math.random() * diceSides ) + 1;
    }
}
