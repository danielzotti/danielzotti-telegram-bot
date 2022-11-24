export interface Joke {
  date?: string; // 2022-01-01
  event?: string; // In pub with friends
  sentences: Array<JokeSentence>;
}

export interface JokeSentence {
  name?: string; // Daniel Zotti
  text: string; // Why do programmers keep pressing the F5 button??
}
