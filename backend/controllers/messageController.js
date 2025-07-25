const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  const newMessage = new Message({ name, message });
  await newMessage.save();
  res.status(201).json(newMessage);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};
