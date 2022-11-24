import { User } from 'node-telegram-bot-api';

export function printMemberName({ id, username, first_name, last_name }: User) {
  let name = `@${ username || id }`;
  if(first_name || last_name) {
    name += ' conosciuto anche come ';
    if(first_name) name += `<i>${ first_name }</i> `;
    if(last_name) name += `<i>${ last_name }</i>`;
  }
  return name;
}
