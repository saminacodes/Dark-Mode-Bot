import { SlashCommandBuilder } from '@discordjs/builders';
import { registerCommandModule } from '../utils/commands.js';
import fetch from 'node-fetch';

// subreddits to fetch memes from
const memeSubreddits = [
  'wholesomememes',
  'memes',
  'dankmemes',
  'me_irl',
  'raimimemes',
  'historymemes',
  'okbuddyretard',
  'comedyheaven',
  'funny',
  'ProgrammerHumor',
];

// this function gets memes using some api i found on github
async function getMeme () {
  // chooses a random api from subreddits array
  const subreddit =
    memeSubreddits[Math.floor(Math.random() * memeSubreddits.length)];
  try {
    const res = await fetch(
      `https://meme-api.herokuapp.com/gimme/${subreddit}`,
    );
    const data = await res.json();
    if (data.nsfw) {
      // nsfw filter
      console.log('nsfw');
      return getMeme();
    } else return data;
  } catch (err) {
    console.log(err);
  }
}

// pretty self explananatory, innit?
function showSubreddit () {
  let result = 'These subreddits are currently included:\n';
  for (let i = 1; i <= memeSubreddits.length; i++) {
    result += `${i}. ${memeSubreddits[i - 1]} \n`;
  }
  return result;
}

function addSubreddit (subreddit) {
  if (memeSubreddits.indexOf(subreddit) === -1) {
    memeSubreddits.push(subreddit);
    return `Added subreddit: ${subreddit}`;
  } else return 'Subreddit already exists in list';
}

function removeSubreddit (subreddit) {
  // checks if the subreddit is in the array
  if (memeSubreddits.indexOf(subreddit) !== -1) {
    memeSubreddits.splice(memeSubreddits.indexOf(subreddit), 1);
    return `Removed subreddit: ${subreddit}`;
  } else return 'Please specify a valid subreddit';
}

const memeCommand = new SlashCommandBuilder().setDescription(
  'replies with a random meme',
);

memeCommand.addSubcommand((subCommand) =>
  subCommand.setName('random').setDescription('replies with a random meme'),
);
memeCommand.addSubcommand((subCommand) =>
  subCommand
    .setName('subreddits')
    .setDescription('shows a list of available subreddits'),
);
memeCommand.addSubcommand((subCommand) =>
  subCommand
    .setName('add')
    .setDescription('adds a subreddit to the list of subreddits')
    .addStringOption((option) =>
      option.setName('subreddit').setDescription('the subreddit to add'),
    ),
);
memeCommand.addSubcommand((subCommand) =>
  subCommand
    .setName('remove')
    .setDescription('removes a subreddit from the list of subreddits')
    .addStringOption((option) =>
      option.setName('subreddit').setDescription('the subreddit to add'),
    ),
);

const memeCommandHandler = async (interaction) => {
  const subCommand = interaction.options.getSubcommand();

  switch (subCommand) {
    case 'subreddits': {
      interaction.reply(showSubreddit());
      break;
    }
    case 'add': {
      const subreddit = interaction.options.getString('subreddit');
      interaction.reply(addSubreddit(subreddit));
      break;
    }
    case 'remove': {
      const subreddit = interaction.options.getString('subreddit');
      interaction.reply(removeSubreddit(subreddit));
      break;
    }
    case 'random': {
      const meme = await getMeme();
      interaction.reply(
        `This meme is from **r/${meme.subreddit}**\n ${meme.url}`,
      );
      break;
    }
    default: {
      interaction.reply('Please specify a valid subcommand');
    }
  }
};

registerCommandModule('meme', memeCommand, memeCommandHandler);
