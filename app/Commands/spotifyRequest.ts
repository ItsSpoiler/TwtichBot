import * as secrets from "../config/config.secrets.json";
const request = require("request-promise-native");
const baseUrl: string = "https://api.spotify.com/v1/me/player/";


export class SpotifyRequest {

    getSong(): string {
        let options = {
            "method": "GET",

            "uri": baseUrl + "currently-playing",
            "headers": {
                "Authorization": "Bearer " + secrets.oauthkeyspotify,
                "Content-Type": "Application/json"
            }
        }
        let result: string  = "";
        request(options).then(function (res: any) {
            let response = JSON.parse(res)
            console.log(response.item.name);
            const songInfo = `The song currently playing is \"${response.item.name}\"! Go Listen to it here ${response.item.external_urls.spotify}`;
            console.log(songInfo)
            result = songInfo;
        })
        return result;
    }

} 