require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {Client,GatewayIntentBits} =require('discord.js');
const client=new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

let genAI=new GoogleGenerativeAI(process.env.API_KEY)


client.on('messageCreate',async function(message){
    try{
        if(message.author.bot){ 
            return;
        }
        if(!message.content.startsWith("Hey GPT")){
            return
        }
        console.log(message.content);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  
    const result = await model.generateContent(message.content);
    const response = await result.response;
    const text = response.text();
        console.log(text);
        message.reply(`ChatGPt:${text}`)
    } catch(err){
        console.log(err)
    }
})
client.login(process.env.DISCORD_TOKEN);
