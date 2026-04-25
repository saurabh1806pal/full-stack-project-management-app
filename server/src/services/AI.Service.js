const Groq = require('groq-js');

const client = new Groq.Client({
    apiKey: process.env.GROQ_API_KEY,
});

exports.generateSubTasks = async (taskTitle) => {
    const response = await client.chat.completions.create({
        model: 'llama3-8b-8192',
    })
}