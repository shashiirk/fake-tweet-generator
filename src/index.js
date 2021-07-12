import html2canvas from 'html2canvas';

import './index.scss';
import img from './assets/silhoutte.png';

// User input's DOM elements
const avatar = document.getElementById('avatar');
const fileName = document.getElementById('file-name');
const reset = document.getElementById('reset');
const name = document.getElementById('name');
const username = document.getElementById('username');
const message = document.getElementById('message');
const time = document.getElementById('time');
const date = document.getElementById('date');
const client = document.getElementById('client');
const retweets = document.getElementById('retweets');
const quotes = document.getElementById('quotes');
const likes = document.getElementById('likes');

// Capturing all Radio buttons
const themeRadios = document.getElementsByName('theme_radio');
const verifiedRadios = document.getElementsByName('verified_radio');

// Preview's DOM elements
const tweet = document.getElementById('tweet');
const tweetAvatar = document.getElementById('tweet_avatar');
const tweetName = document.getElementById('tweet_name');
const tweetVerified = document.getElementById('tweet_verified');
const tweetUsername = document.getElementById('tweet_username');
const tweetMessage = document.getElementById('tweet_message');
const tweetTimestamp = document.getElementById('tweet_timestamp');
const tweetClient = document.getElementById('tweet_client');
const tweetRetweets = document.getElementById('tweet_retweets');
const tweetQuotes = document.getElementById('tweet_quotes');
const tweetLikes = document.getElementById('tweet_likes');

// Capturing Download button
const download = document.getElementById('download');

// Month names
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Number Formatter for Retweets, Quote Tweets and Likes
function numberFormatter(num, fixed) {
  // terminate early
  if (num === null) {
    return null;
  }

  // terminate early
  if (num === 0) {
    return '0';
  }

  fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show

  let b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

  return e;
}

// Show the uploaded file's name
function showFileName(name) {
  fileName.classList.add('show');
  fileName.innerText = name;
}

// Render Profile Picture in Tweet
function renderProfilePicture() {
  const [file] = avatar.files;
  if (file) {
    showFileName(file.name);
    tweetAvatar.src = URL.createObjectURL(file);
  }
}

// Reset the profile picture to default
function resetProfilePicture() {
  fileName.innerText = '';
  fileName.classList.remove('show');
  tweetAvatar.src = img;
}

// Render Name in Tweet
function renderName() {
  const nameValue = name.value.trim();

  if (nameValue === '') {
    tweetName.innerText = 'Name';
  } else {
    tweetName.innerText = nameValue;
  }

  const characterCountEl = name.nextElementSibling.querySelector('.count');
  characterCountEl.innerText = nameValue.length;
}

// Render Username in Tweet
function renderUsername() {
  const usernameValue = username.value.trim();

  if (usernameValue === '') {
    tweetUsername.innerText = 'username';
  } else {
    tweetUsername.innerText = usernameValue;
  }

  const characterCountEl =
    username.parentElement.nextElementSibling.querySelector('.count');
  characterCountEl.innerText = usernameValue.length;
}

// Render Message in Tweet
function renderMessage() {
  const messageValue = message.value.trim();

  if (messageValue === '') {
    tweetMessage.innerText = 'Generate convincing fake tweet images';
  } else {
    tweetMessage.innerText = messageValue;
  }

  const characterCountEl = message.nextElementSibling.querySelector('.count');
  characterCountEl.innerText = messageValue.length;
}

// Render Timestamp in Tweet
function renderTimestamp() {
  // Time
  const timeValue = time.value.trim();
  let [hours, minutes] = timeValue.split(':');
  hours = +hours;
  minutes = ('00' + minutes).slice(-2);
  let suffix;

  if (hours > 12) {
    hours = hours - 12;
    suffix = 'PM';
  } else {
    if (hours === 0) {
      hours = 12;
      suffix = 'AM';
    } else if (hours === 12) {
      suffix = 'PM';
    } else {
      suffix = 'AM';
    }
  }

  // Date
  const dateValue = date.value.trim();
  let [year, month, day] = dateValue.split('-');
  month = MONTHS[+month - 1];

  tweetTimestamp.innerHTML = `
    <span>${hours}:${minutes} ${suffix}</span> &centerdot;
    <span>${month} ${day}, ${year}</span> &centerdot;
  `;
}

// Render Client in Tweet
function renderClient() {
  const clientValue = client.value.trim();

  if (clientValue === '') {
    tweetClient.innerText = 'Twitter Web App';
  } else {
    tweetClient.innerText = clientValue;
  }
}

// Render Retweets in Tweet
function renderRetweets() {
  tweetRetweets.parentElement.classList.remove('hide');
  let retweetsValue = retweets.value;

  if (retweetsValue === '') {
    tweetRetweets.innerText = '96';
  } else {
    retweetsValue = +retweetsValue;
    if (retweetsValue >= 0) {
      if (retweetsValue === 0) {
        tweetRetweets.parentElement.classList.add('hide');
      } else {
        tweetRetweets.innerText = numberFormatter(retweetsValue);
      }
    } else {
      tweetRetweets.innerText = '96';
    }
  }
}

// Render Quotes in Tweet
function renderQuotes() {
  tweetQuotes.parentElement.classList.remove('hide');
  let quotesValue = quotes.value;

  if (quotesValue === '') {
    tweetQuotes.innerText = '88';
  } else {
    quotesValue = +quotesValue;
    if (quotesValue >= 0) {
      if (quotesValue === 0) {
        tweetQuotes.parentElement.classList.add('hide');
      } else {
        tweetQuotes.innerText = numberFormatter(quotesValue);
      }
    } else {
      tweetQuotes.innerText = '88';
    }
  }
}

// Render Likes in Tweet
function renderLikes() {
  tweetLikes.parentElement.classList.remove('hide');
  let likesValue = likes.value;

  if (likesValue === '') {
    tweetLikes.innerText = '153';
  } else {
    likesValue = +likesValue;
    if (likesValue >= 0) {
      if (likesValue === 0) {
        tweetLikes.parentElement.classList.add('hide');
      } else {
        tweetLikes.innerText = numberFormatter(likesValue);
      }
    } else {
      tweetLikes.innerText = '153';
    }
  }
}

// Set Timestamp when page is loaded
function setTimestamp() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = ('00' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ('00' + dateObj.getHours()).slice(-2);
  const minutes = ('00' + dateObj.getMinutes()).slice(-2);

  time.value = `${hours}:${minutes}`;
  date.value = `${year}-${month}-${day}`;

  renderTimestamp();
}

// Set Theme
function toggleTheme(ev) {
  const choice = ev.target.value;

  if (choice === 'dim') {
    tweet.className = 'tweet dim';
  } else if (choice === 'dark') {
    tweet.className = 'tweet dark';
  } else {
    tweet.className = 'tweet';
  }
}

// Toggle Verified Badge
function toggleVerified(ev) {
  const choice = ev.target.value;

  if (choice === 'show') {
    tweetVerified.classList.remove('hide');
  } else {
    tweetVerified.classList.add('hide');
  }
}

// Generate filenames for the image which is to be downloaded
function generateFileName() {
  return `tweet${Math.floor(Math.random() * 90000) + 10000}`;
}

// Download it to the local machine
function saveAs(uri, filename) {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

// Take screenshot of the tweet
function takeScreenshot() {
  html2canvas(document.querySelector('.tweet'), {
    allowTaint: true,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), generateFileName());
  });
}

// On load
setTimestamp();

// Event Listeners
avatar.addEventListener('change', renderProfilePicture);
reset.addEventListener('click', resetProfilePicture);
name.addEventListener('input', renderName);
username.addEventListener('input', renderUsername);
message.addEventListener('input', renderMessage);
time.addEventListener('input', renderTimestamp);
date.addEventListener('input', renderTimestamp);
client.addEventListener('input', renderClient);
retweets.addEventListener('input', renderRetweets);
quotes.addEventListener('input', renderQuotes);
likes.addEventListener('input', renderLikes);
download.addEventListener('click', takeScreenshot);

for (let i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener('change', toggleTheme);
}

for (let i = 0; i < verifiedRadios.length; i++) {
  verifiedRadios[i].addEventListener('change', toggleVerified);
}
