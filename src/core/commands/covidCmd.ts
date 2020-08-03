import Axios from "axios";
import Covid from "../interfaces/covid";
import Bot from "../bot";
import City from "../interfaces/city";
import { MessageEmbed, Message, Base } from "discord.js";
import Utils from "../util/utils";
import BaseInterface from './base/baseInterface';

class CovidCommand implements BaseInterface {

      async invoke(command: string[], message: Message) {
        let uf = command[1] || null;
        
                        if(!uf) {
                            message.reply("\nEx: "+Bot.prefix+"covid RJ");
                            return;
                        }
                        let response: Covid;
                        response = (await Axios.get(`https://covid19-brazil-api.now.sh/api/report/v1`)).data;
                        
                        const resultado = response.data.map( item => {
                            if(item.uf === uf.toUpperCase()) {
                                return item;
                            } else {
                                null;
                            }
                        });
                        let serialized: City;
                        for(let i = 0; i <= resultado.length; i++) {
                            if(resultado[i] !== undefined) {
                                serialized = resultado[i];
                            }
                        }
                        
                        if(serialized === undefined) {
                            message.reply("UF inválida.");
                            
                        } else {
                            const embed = new MessageEmbed()
                            .setTitle("Dados COVID-19")
                            .setAuthor("CoronaBot", "https://cdn1.iconfinder.com/data/icons/hawcons/32/700096-icon-61-warning-512.png","https://discord.gg/4RVCQt")
                            .setColor(0x00AE86)
                            .addField("UF", serialized.uf, true).addField("Estado", serialized.state, true)
                            .addField("Casos", Utils.formt(`${serialized.cases}`), false).addField("Mortes", Utils.formt(`${serialized.deaths}`), false)
                            .setFooter("KidDasNeves Developer")
                            .setThumbnail("https://image.freepik.com/fotos-gratis/personagem-de-desenho-animado-de-coronavirus_167960-29.jpg")
                            .setTimestamp();
                            message.channel.send({embed});
                        }
    }
}

export default CovidCommand;