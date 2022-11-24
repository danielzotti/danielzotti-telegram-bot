import dotenv from 'dotenv';
import { Config } from './models/config.models';

dotenv.config();

export const config: Config = {
  telegramToken: process.env.TELEGRAM_TOKEN,
  jokes: {
    keywords: [
      'daniel',
      'joke',
      'funny',
      'smile',
    ]
  },
  commands: {
    start: {
      command: 'start',
      description: 'Start Daniel Zotti Bot'
    },
    help: {
      command: 'help',
      description: 'Info about what Daniel Zotti Bot can do'
    },
    jokes: {
      command: 'jokes',
      description: 'How many jokes Daniel Zotti Bot knows'
    },
    random_joke: {
      command: 'random_joke',
      description: 'Get a random joke!'
    }
  }
};
