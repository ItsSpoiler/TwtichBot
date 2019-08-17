import express = require('express');
import * as secrets from "./config/config.secrets.json";
import * as config from "./config/config.json";
import { DiceRoll } from "./Commands/diceRoll";
const app: express.Application = express();
const tmi = require("tmi.js")
const options = {
    options: {
        debug: true
    },
    connection : {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: config.joinedChannelName,
        password: secrets.ouathkey
    },
    channels: [config.joinedChannelName]
};

const client = new tmi.client(options);
const diceRoll = new DiceRoll();
client.connect();

client.on('connected', (address: any, port: any) => {
    client.action(config.joinedChannelName, 'Hello, chatbot connected.')
})

client.on('chat', (channel: any, user: any, message: string, self: any) => {
    
    if (message === '!game') {
        client.action(config.joinedChannelName, 'I am playing a fun game.');
    }
    // Need to add a check for exact command ex. !diceaqwd 10 will work.
    else if (message.includes("!dice")) {
        const splitCommand: Array<string> = diceRoll.splitCommand(message);
        const diceNumber: number = Number(splitCommand[1]);
        const diceSides : number = Number(splitCommand[2]);
        if (diceNumber < 0 || diceSides < 0)
        {
            client.action(config.joinedChannelName, 'Please only use positive numbers.');
        }
        else
        {
        const result: number = diceRoll.rollDice(diceNumber, diceSides);
        if (isNaN(result))
        {
            client.action(config.joinedChannelName, 'Please enter a valid number.');
        } 
        else {
            client.action("ItsSpoiler", `${user['display-name']} rolled a ${result}`);
        }
    }
    }
});
