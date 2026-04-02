const { OpenAI } = require('openai');
const Chat = require('../models/Chat');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.askLegalQuestion = async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI legal assistant. Provide simplified, general legal advice. Always remind users that this is not professional legal counsel at the end.' },
        { role: 'user', content: question }
      ]
    });

    const aiAnswer = response.choices[0].message.content;

    let chat = await Chat.findOne({ userId: req.user.id, participantId: 'ai' });
    if (!chat) {
      chat = new Chat({ userId: req.user.id, participantId: 'ai', messages: [] });
    }
    chat.messages.push({ sender: 'user', text: question });
    chat.messages.push({ sender: 'ai', text: aiAnswer });
    await chat.save();

    res.json({ answer: aiAnswer, chatHistory: chat.messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error with AI Integration');
  }
};

exports.generateDocument = async (req, res) => {
  const { title, type, details } = req.body;
  try {
    const prompt = `Generate a legal document of type "${type}" titled "${title}". Incorporate the following custom details strictly:\n${details}\n\nFormat the output in clear structured plain text or markdown without markdown block wrappers for easy parsing. Include generic placeholders (like [DATE] or [SIGNATURE]) where standard clauses are missing specific user data.`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert legal document generator.' },
        { role: 'user', content: prompt }
      ]
    });

    const generatedContent = response.choices[0].message.content;
    res.json({ content: generatedContent });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error generating document');
  }
};
