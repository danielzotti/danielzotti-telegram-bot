import path from 'path';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { config } from './config';
import { JokesManager } from './features/jokes-manager';
import { getCommandRegex } from './features/commands';
import { printMemberName } from './features/members';
import { version } from '../package.json';

if(!config.telegramToken) {
  throw 'Telegram token not configured for Daniel Zotti!';
}

// INIT BOT
const bot = new TelegramBot(config.telegramToken, { polling: true });
console.info('Daniel Zotti Bot has started');

// SET COMMANDS
bot.setMyCommands(Object.values(config.commands))
  .then(() => console.info('Daniel Zotti Bot commands haven been updated'))
  .catch((err) => console.error('Daniel Zotti Bot commands haven\'t been updated', err));

// INIT JOKES MANAGER
const jokesManager = new JokesManager({
  jokesFilePath: path.resolve(__dirname, './assets/jokes.json'),
  keywords: config.jokes.keywords
});

// region COMMANDS
/** Command /start */
bot.onText(getCommandRegex(config.commands.start.command), ({ chat: { id: chatId } }: Message) => {
  const message = 'Ciao sono il bot chiamato "Daniel Zotti"! Vedrai che insieme ci divertiremo!';
  void bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

/** Command /help */
bot.onText(getCommandRegex(config.commands.help.command), ({ chat: { id: chatId } }: Message) => {
  const message = `Mi chiamo "Daniel Zotti"! La mia versione è ${ version } e ogni volta che qualcuno scriverà in un messaggio una parola chiave come <i>${
    jokesManager.getKeywords({ humanize: true })
  }</i> condividerò una battuta a caso dal mio repertorio (al momento ce ne sono ${ jokesManager.count() })!
Inoltre darò il benvenuto a nuovi membri e in futuro notificherò quando ci sono eventi interessanti, il compleanno di qualcuno del gruppo e molto altro ancora!`;
  void bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

/** Command /jokesManager */
bot.onText(getCommandRegex(config.commands.jokes.command), ({ chat: { id: chatId } }: Message) => {
  const message = `Al momento ho raccolto ${ jokesManager.count() } battute di Daniel`;
  void bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

/** Command /random_joke */
bot.onText(getCommandRegex(config.commands.random_joke.command), ({ chat: { id: chatId } }: Message) => {
  const joke = jokesManager.getRandomJoke();
  // void bot.sendMessage(chatId, JokesManager.printJoke(joke), { parse_mode: 'HTML' });
  void bot.sendPhoto(chatId, path.resolve(__dirname, './assets/profile.jpg'), {
    caption: JokesManager.printJoke(joke),
    parse_mode: 'HTML'
  }, {
    contentType: 'image/png',
    filename: 'Daniel Zotti Bot!'
  });
});
// endregion

// region MEMBERS
/** on new chat members */
bot.on('new_chat_members', ({ new_chat_members, from, chat: { id: chatId } }) => {
  const names = new_chat_members.map(m => `${ printMemberName(m) }`).join('\n');
  const sentence = `@${ from?.username } ha appena aggiunto ${ new_chat_members.length === 1 ? 'un membro' : 'dei membri' } al gruppo! Diamo il benvenuto ${ new_chat_members.length === 1 ? 'a ' : 'a:\n' }${ names }`;
  void bot.sendMessage(chatId, sentence, { parse_mode: 'HTML' });
});

/** on left chat member */
bot.on('left_chat_member', ({ left_chat_member, from, chat: { id: chatId } }) => {
  void bot.sendMessage(chatId, `Oh no! ${ printMemberName(left_chat_member) } ha abbandonato il nostro bel gruppo \u{1F625}`, { parse_mode: 'HTML' });
});
// endregion

// region JOKES
/** on keywords about features */
bot.onText(jokesManager.getJokesTriggerRegex(), ({ chat: { id: chatId } }: Message) => {
  const joke = jokesManager.getRandomJoke();
  void bot.sendPhoto(chatId, path.resolve(__dirname, './assets/profile.jpg'), {
    caption: JokesManager.printJoke(joke),
    parse_mode: 'HTML'
  }, {
    contentType: 'image/png',
    filename: 'Daniel Zotti Bot'
  });
});
// endregion
