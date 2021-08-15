// configure enviroment variables before anything else
require('dotenv').config();

const { client, fetch } = require('./discord-client');

client.on('ready', () => {
  console.log('client connected and ready');
});

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
    if (data.nsfw) { // nsfw filter
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
  memeSubreddits.push(subreddit);
  return 'Added subreddit';
}

function removeSubreddit (subreddit) {
  // checks if the subreddit is in the array
  if (memeSubreddits.indexOf(subreddit) !== -1) {
    memeSubreddits.splice(memeSubreddits.indexOf(subreddit), 1);
    return 'Removed subreddit';
  } else return 'Please specify a valid subreddit';
}

// haha a lot of if statements go brr
client.on('messageCreate', (message) => {
  if (message.content.startsWith('ping')) {
    message.channel.send('pong');
  }
  if (message.content === '-meme') {
    getMeme().then((meme) =>
      message.channel.send(`This meme is from r/${meme.subreddit}`),
    );
    getMeme().then((meme) => message.channel.send(meme.url));
  }
  if (message.content === '-subreddits') {
    message.channel.send(showSubreddit());
  }
  if (message.content.startsWith('-add')) {
    const subreddit = message.content.split(' ')[1];
    if (typeof subreddit === 'undefined') {
      message.channel.send('Please specify a subreddit');
    } else {
      message.channel.send(addSubreddit(subreddit));
    }
  }
  if (message.content.startsWith('-remove')) {
    const subreddit = message.content.split(' ')[1];
    message.channel.send(removeSubreddit(subreddit));
  }
});
