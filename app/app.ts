import express = require('express');
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
        username: 'ItsSpoiler',
        password: config.secrets.ouathkey
    },
    channels: ['ItsSpoiler']
};

const client = new tmi.client(options);
const diceRoll = new DiceRoll();
client.connect();

client.on('connected', (address: any, port: any) => {
    client.action('ItsSpoiler', 'Hello, chatbot connected.')
})

client.on('chat', (channel: any, user: any, message: string, self: any) => {
    
    if (message === '!game') {
        client.action('ItsSpoiler', 'I am playing a fun game.');
    }
    // Need to add a check for exact command ex. !diceaqwd 10 will work.
    else if (message.includes("!dice")) {
        const splitCommand: Array<string> = diceRoll.splitCommand(message);
        const number: number = Number(splitCommand[1]);
        if (number < 0)
        {
            client.action('ItsSpoiler', 'Please only use positive numbers.');
        }
        else
        {
        const result = diceRoll.rollDice(number);
        if (isNaN(result))
        {
            client.action('ItsSpoiler', 'Please enter a valid number.');
        } 
        else {
            client.action("ItsSpoiler", `${user['display-name']} rolled a ${result}`);
        }
    }
    }
});
