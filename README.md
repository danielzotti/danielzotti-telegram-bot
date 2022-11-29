# Daniel Zotti Telegram bot

A Telegram bot designed to be included in Telegram groups. The bot expose these features:

1. Jokes
2. Welcome/Goodbye messages

## Bot creation (already done, but it's here as a reminder)

- `/setname` @DanielZottiBot
- `/setdescription` A Telegram bot that manages events, jokes, member and more
- `/setuserpic`: `/assets/profile.jpg`

## Bot Commands

- `/start` it shows a message when the bot is started
- `/help` it shows info about the bot
- `/jokes` it shows how many jokes are in the DB
- `/random_joke` it sends a random joke

## Features

### 1. Jokes

Some examples to trigger a joke:

- `What would Daniel say?` (keyword: "Daniel")
- `I need a joke!` (keyword: "joke")

#### How to add jokes

In order to add (or edit) a joke, you have to edit the `/assets/jokes.json` file.

The JSON file is an array of objects having this structure:

- `date` (optional): data with following format `yyyy-mm-dd`.
- `event` (optional): info about the place or the occasion the joke has been stated.
- `sentences (required)`: a list of sentences, structured this way:
  - `name` (optional) name of the person
  - `text` (required): the actual sentence

##### Example

```json
{
  "date": "2021-10-05",
  "event": "In pub with friends",
  "sentences": [
    {
      "name": "Daniel",
      "text": "Why do programmers keep pressing the F5 button??"
    },
    {
      "name": "Friends",
      "text": "No, not again....."
    },
    {
      "name": "Daniel",
      "text": "Because it’s <i>refreshing</i>."
    }
  ]
}
```

### 2. Welcome/Goodbye messages

- One or more members are added to the group:
  `@danielzotti has just added a member to the group! Let's welcome @mario aka Mario Rossi`
- A member is removed from the group (or leave):
  `Oh no! @mario aka Mario Rossi has left the group!`


## Installation and how to use

- `nvm use` to set the right node version
- `npm install`
- `npm run start` to run it locally
- `npm run dev` to run it locally with nodemon

## Deploy

On Daniel's server through GitHub Actions

## Add bot to a group
In order to make the "send joke triggered by keyword" work, the Daniel Zotti bot needs to have access to the message of a group.
The *group privacy* has to be turned *off*: https://stackoverflow.com/questions/50204633/allow-bot-to-access-telegram-group-messages

## Useful links
- https://medium.com/@g.c.dassanayake/deploying-a-nodejs-application-using-github-actions-e5f4bde7b21b

## GitHub Actions

### Add GitHub runner
Add runner on private linux server:
- Add self-hosted runner to GitHub project and install it: https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners
- Create docker group: `sudo groupadd docker`
- Create a dedicated user for the runner: `sudo useradd github-runner`
- Add it to docker group: `sudo usermod -aG docker github-runner` 
- Move to github-runner home folder: `cd /home/github-runner`

More info: https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners

### Create workflow
Create a file in `.github/workflows/main.yml`

