import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Discord from "discord.js";
dotenv.config();
let genAI: GoogleGenerativeAI;
if (process.env.API_KEY != undefined) {
  genAI = new GoogleGenerativeAI(process.env.API_KEY);
}

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages,
  ],
});

client.on("ready", () => {
  if (client.user != null && client.user.tag != null)
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  console.log(msg.content);
  if (msg.content == "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

//run();
