require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const messagesRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/guestbook';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/messages', messagesRoutes);

app.get('/admin/messages', async (req, res) => {
  const Message = require('./models/Message');
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
