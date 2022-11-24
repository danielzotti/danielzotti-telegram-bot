import { BotCommand } from 'node-telegram-bot-api';

export interface Config {
  telegramToken?: string;
  jokes: {
    keywords: Array<string>
  },
  commands: Record<string, BotCommand>
}
