import { Client, MessageEmbed} from 'discord.js';
import Axios from 'axios';
import Covid from './interfaces/covid';
import City from './interfaces/city';
import CovidCommand from './commands/covidCmd';


class Bot {
    
    client = new Client();
    token = "O token vai aqui.";
    static prefix: string;

    constructor (prefix: string) {
        
        this.initSystem();
        Bot.prefix = prefix;

    }

    private initSystem() {
        this.eventHandler();
        this.client.login(this.token);
    }

    private eventHandler() {

        this.client.on('ready', () => {
            this.client.user.setActivity("O pai ta on"+Bot.prefix);
        });

        this.client.on('message', async message => {
            
            if(message.content.startsWith(Bot.prefix)) {

                const command = message.content.replace("!","").toLowerCase().split(' ');

                if(message.author.bot) {
                    return;
                }

                if(command[0] === "covid") {
                        new CovidCommand().invoke(command, message);
                }

            }



        });
    }
     
    
}

export default Bot;
