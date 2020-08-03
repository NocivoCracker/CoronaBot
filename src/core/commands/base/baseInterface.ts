import { Message } from "discord.js";

interface BaseInterface {

     invoke(command: string[], message: Message);

}

export default BaseInterface;