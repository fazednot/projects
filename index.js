const TelegramBot = require('node-telegram-bot-api');


const token = '7106650991:AAFhW-2DPR3F_uKPbKIb9Jgi8m30pLYXDVg';
const keep_alive = require('./keep_alive.js') 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Admins who can view complaints
const adminIds = [1123284997]; // Replace with actual Telegram user IDs

// Array to store complaints
let complaints = [];

// Start command - Welcomes the user
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the YAC Safeguarding Bot!\n' +
        'Use /complain to send a complaint with your name.\n' +
            'Use /anonymous to send an anonymous complaint.'
              );
              });

              // complaint with name command
              bot.onText(/\/complain/, (msg) => {
                const chatId = msg.chat.id;
                  const user = msg.from.first_name;
                    bot.sendMessage(chatId, Please type your complaint. It will be recorded with your name: ${user}.);

                     
                       bot.once('message', (message) => {
                           if (message.text !== '/complain' && message.text !== '/anonymous') {
                                 complaints.push(${user}: ${message.text});
                                       bot.sendMessage(chatId, 'Thank you for your complaint.');
                                           }
                                             });
                                             });

                                             // Anonymous complaint
                                             bot.onText(/\/anonymous/, (msg) => {
                                               const chatId = msg.chat.id;
                                                 bot.sendMessage(chatId, 'Please type your complaint. It will be recorded anonymously.');

                                                   // Wait for the complaint text
                                                     bot.once('message', (message) => {
                                                         if (message.text !== '/complain' && message.text !== '/anonymous') {
                                                               complaints.push(Anonymous: ${message.text});
                                                                     bot.sendMessage(chatId, 'Thank you for your anonymous complaint.');
                                                                         }
                                                                           });
                                                                           });

                                                                           // View complaints - Only for admins
                                                                           bot.onText(/\/view_complaints/, (msg) => {
                                                                             const chatId = msg.chat.id;
                                                                               const userId = msg.from.id;

                                                                                 // Check if the user is an admin
                                                                                   if (adminIds.includes(userId)) {
                                                                                       const allComplaints = complaints.length > 0 ? complaints.join('\n') : 'No complaints yet.';
                                                                                           bot.sendMessage(chatId, allComplaints);
                                                                                             } else {
                                                                                                 bot.sendMessage(chatId, "You don't have permission to view complaints.");
                                                                                                   }
                                                                                                   });