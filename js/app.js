// User input's DOM elements
const avatar = document.getElementById('avatar');
const fileName = document.getElementById('file-name');
const reset = document.getElementById('reset');
const fullname = document.getElementById('name');
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
const tweetBox = document.getElementById('tweet_box');
const tweet = document.getElementById('tweet');
const tweetAvatar = document.getElementById('tweet_avatar');
const tweetName = document.getElementById('tweet_name');
const tweetVerified = document.getElementById('tweet_verified');
const tweetUsername = document.getElementById('tweet_username');
const tweetMessage = document.getElementById('tweet_message');
const tweetTime = document.getElementById('tweet_time');
const tweetDate = document.getElementById('tweet_date');
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

// Theme
let themeColor = '#ffffff';

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
  tweetAvatar.src = 'assets/silhoutte.png';
}

// Render Name in Tweet
function renderName() {
  const nameValue = fullname.value.trim();

  if (nameValue === '') {
    tweetName.innerText = 'Name';
  } else {
    tweetName.innerText = nameValue;
  }

  const characterCountEl = fullname.nextElementSibling.querySelector('.count');
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
    tweetMessage.innerText = '';
    messageValue.split(' ').forEach((token) => {
      if (token.match(/^@(\w){1,20}$/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token;
        tweetMessage.append(spanEl);
        tweetMessage.append(' ');
      } else if (token.match(/^@(\w){21,}$/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token.slice(0, 21);
        tweetMessage.append(spanEl);
        tweetMessage.append(token.slice(21));
        tweetMessage.append(' ');
      } else if (token.match(/^@\w+/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token.match(/^@\w+/);
        tweetMessage.append(spanEl);
        tweetMessage.append(token.match(/(?<=\w)\W+/));
        tweetMessage.append(' ');
      } else {
        tweetMessage.append(token);
        tweetMessage.append(' ');
      }
    });

    // To preserve line breaks
    tweetMessage.innerHTML = tweetMessage.innerHTML.replace(/\n/g, '<br>\n');
  }

  let test = `hey there @shashi how are you?`;

  const characterCountEl = message.nextElementSibling.querySelector('.count');
  characterCountEl.innerText = messageValue.length;
}

// Render Time in Tweet
function renderTime() {
  const timeValue = time.value.trim();

  if (timeValue === '') {
    tweetTime.innerText = getCurrentTime();
  } else {
    tweetTime.innerText = timeValue;
  }
}

// Render Date in Tweet
function renderDate() {
  const dateValue = date.value.trim();

  if (dateValue === '') {
    tweetDate.innerText = getCurrentDate();
  } else {
    tweetDate.innerText = dateValue;
  }
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

// Returns current Time
function getCurrentTime() {
  const dateObj = new Date();
  let hours = +dateObj.getHours();
  let minutes = ('00' + dateObj.getMinutes()).slice(-2);
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

  return `${hours}:${minutes} ${suffix}`;
}

// Returns current Date
function getCurrentDate() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${MONTHS[month]} ${day}, ${year}`;
}

// Set Theme
function toggleTheme(ev) {
  let choice;

  for (let i = 0; i < themeRadios.length; i++) {
    if (themeRadios[i].checked) {
      choice = themeRadios[i].value;
    }
  }

  if (choice === 'dim') {
    tweet.className = 'tweet dim';
    tweetBox.className = 'tweet_box dim';
    themeColor = '#15202b';
  } else if (choice === 'dark') {
    tweet.className = 'tweet dark';
    tweetBox.className = 'tweet_box dark';
    themeColor = '#000000';
  } else {
    tweet.className = 'tweet';
    tweetBox.className = 'tweet_box';
    themeColor = '#ffffff';
  }
}

// Toggle Verified Badge
function toggleVerified() {
  let choice;

  for (let i = 0; i < verifiedRadios.length; i++) {
    if (verifiedRadios[i].checked) {
      choice = verifiedRadios[i].value;
    }
  }

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
  window.scrollTo(0, 0);
  html2canvas(document.querySelector('.tweet'), {
    allowTaint: true,
    backgroundColor: themeColor,
    useCORS: true,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), generateFileName());
  });
}

// Set Timestamp when page is loaded
function setTimestamp() {
  renderTime();
  renderDate();
}

// On load
setTimestamp();

// Event Listeners
avatar.addEventListener('change', renderProfilePicture);
reset.addEventListener('click', resetProfilePicture);
fullname.addEventListener('input', renderName);
username.addEventListener('input', renderUsername);
message.addEventListener('input', renderMessage);
time.addEventListener('input', renderTime);
date.addEventListener('input', renderDate);
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
