const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yashdayani:NkZ04mYlUcPOb54K@ai-chatbot.qrjtmc9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Connection error', err);
});
