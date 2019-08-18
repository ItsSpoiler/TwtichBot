import express = require('express');
import * as secrets from "./config/config.secrets.json";
import * as config from "./config/config.json";
import { DiceRoll } from "./Commands/diceRoll";
import { SpotifyRequest } from "./Commands/spotifyRequest"
const app: express.Application = express();
const tmi = require("tmi.js")
const options = {
    options: {
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: config.joinedChannelName,
        password: secrets.oauthkeytwitch
    },
    channels: [config.joinedChannelName]
};

const client = new tmi.client(options);
const diceRoll = new DiceRoll();
const spotifyRequest = new SpotifyRequest();
client.connect();

client.on('connected', (address: any, port: any) => {
    client.action(config.joinedChannelName, 'Hello, chatbot connected.')
})

client.on('chat', (channel: any, user: any, message: string, self: any) => {
    message = message.toLocaleLowerCase();
    if (message === '!game') {
        client.action(config.joinedChannelName, 'I am playing a fun game.');
    }
    // Need to add a check for exact command ex. !diceaqwd 10 will work.
    else if (message.includes("!dice ")) {
        const splitCommand: Array<string> = diceRoll.splitCommand(message);
        const diceNumber: number = Number(splitCommand[0]);
        const diceSides: number = Number(splitCommand[1]);
        let result: number = NaN;
        console.log(diceNumber);
        if (diceNumber === 0 && diceSides > 0) {
            console.log("I'm hit");
            result = diceRoll.rollDice(NaN, diceSides);
            client.action("ItsSpoiler", `${user['display-name']} rolled a ${result}`);
        }
        else if (diceNumber < 0 || diceSides < 0) {
            client.action(config.joinedChannelName, 'Please only use positive numbers.');
        }
        else {
            result = diceRoll.rollDice(diceNumber, diceSides);
            if (isNaN(result)) {
                client.action(config.joinedChannelName, 'Please enter a valid number.');
            }
            else {
                client.action("ItsSpoiler", `${user['display-name']} rolled a ${result}`);
            }
        }
    }
    else if(message === "!song") {
        client.action("ItsSpoiler", spotifyRequest.getSong());
    }
});
