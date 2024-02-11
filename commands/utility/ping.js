const { SlashCommandBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
let genAI
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back'))
			,
	async execute(interaction) {
		try{
		const prompt=interaction.options.getString('input')? interaction.options.getString('input'):"Hello Gemini";
		console.log(prompt);
		genAI = new GoogleGenerativeAI(process.env.API_KEY);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response=await result.response;
		const text=response.text();
		console.log("text is "+text);
		await interaction.reply(text);
		}catch(err){
			console.log(err)
		}
	},
};