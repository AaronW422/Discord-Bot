# DiscordBot

A simple Monster Hunter World bot with a few slash commands.

## Setup
Create an .env file with the following content:

```
CLIENT_ID = YOUR_DISCORD_BOT_ID
DISCORD_BOT_TOKEN = YOUR_DISCORD_BOT_TOKEN
MONSTER_HUNTER_DB_URL = "https://mhw-db.com"
MONSTER_HUNTER_WIKI_URL = "https://monsterhunterworld.wiki.fextralife.com"
```

Remember to replace the ID and the Discord bot token!

Run `npm start` or `yarn start` to get the bot going.

## Commands

- **/monster-list** - Lists all large monsters currently in the game (Iceborne)
- **/monster** *name* - Searches for a monster by name and returns with a description of the monster
- **/item** *name* - Searches for an item by name and returns with a description of the item

## Todo

- Cache Monster Hunter Database queries in Redis up to a week
- Write Jest unit tests

## Credits

[Monster Hunter World Database API](https://docs.mhw-db.com/)  
[Monster Hunter World Fextralife Wiki](https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki)