import { Config } from '../models/config.models';
import { config } from '../config';

export function getCommandRegex(commandKey: keyof Config['commands']) {
  return new RegExp(`^\/${((config.commands)[commandKey]).command}`); // e.g. /info or /info@DanielZottiBot
}
