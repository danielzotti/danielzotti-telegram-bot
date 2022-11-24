import { readFileSync } from 'fs';
import { Joke, JokeSentence } from '../models/jokes.models';

export class JokesManager {

  private readonly jokes: Array<Joke> = [];
  private readonly keywords: Array<string> = [];

  constructor({ jokesFilePath, keywords }: { jokesFilePath: string; keywords: Array<string> }) { // config.assets.jokes
    try {
      this.keywords = keywords;
      const jokesRaw = readFileSync(jokesFilePath);
      this.jokes = JSON.parse(jokesRaw.toString());
    } catch(ex) {
      console.error('Error reading features JSON file', ex);
    }
  }

  getAll() {
    return this.jokes;
  }

  count() {
    return this.jokes.length;
  }

  getRandomJoke() {
    return this.jokes[this.randomIntFromInterval(0, this.jokes.length) || 0];
  }

  getJokesTriggerRegex() {
    return new RegExp(`(\\s+|\\W|^)(${this.keywords.join('|')})(\\s+|\\W|$)`, 'mi'); // /(\s+|\W|^)(daniel|joke|funny|smile)(\s+|\W|$)/im
  }

  getKeywords({ humanize = false }: { humanize: boolean }) {
    if(!humanize) {
      return this.keywords;
    }

    // TODO: this doesn't work in node typescript on Vercel and I don't know why
    // const formatter = new Intl.ListFormat('it', { style: 'long', type: 'disjunction' });
    // return formatter.format(this.keywords);

    return this.keywords.join(', ');
  }

  static printJoke(joke: Joke) {
    const dateText = joke.date ? `Ecco una battuta del <i>${ joke.date }</i> per farvi ridere:\n\n` : '';
    const printSentenceText = (sentence: JokeSentence) => {
      const nameText = sentence.name ? `<b>${ sentence.name }</b>: ` : '';
      return `- ${ nameText }${ sentence.text }`;
    };
    return `Sembra che qualcuno mi abbia chiamato in causa!!\n${ dateText }${ joke.sentences?.length > 0 ? joke.sentences.map(printSentenceText).join(`\n\n`) : '' }`;
  }

  private randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
