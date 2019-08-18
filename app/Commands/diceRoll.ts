export class DiceRoll {
    splitCommand(command: string): Array<string> {
        let splitCommand = command.split(" ");
        if (splitCommand[1].includes("d")) {

            let split: Array<string> = splitCommand[1].split("d");
            return split;
        } else {
            let simpleRoll: Array<string> = [];
            simpleRoll.push("0");
            simpleRoll.push(splitCommand[1]);
            return simpleRoll;
        }

    }

    rollDice(diceNum: number, diceSides: number) {
        if (isNaN(diceNum)) {
            return Math.floor(Math.random() * diceSides) + 1;
        }

        let diceResults: Array<number> = [];
        for (let index = 0; index < diceNum; index++) {
            diceResults.push(Math.floor(Math.random() * diceSides) + 1);
        }
        return Math.max(...diceResults);

    }
}
