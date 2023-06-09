const acc = [
  { token: "token hoyolab here", 
    genshin: true, 
    hsr: true, 
    name: "your name" }
];

const notify = true
const myTelegramID = "your telegram id"
const telegramBotToken = "your telegram bot token"

/** The above is the config. Please refer to the instructions on https://github.com/rennoesche/labhoyo-auto-daily for configuration. **/

const expUrl = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
}

async function main(){

  const messages = await Promise.all(acc.map(autoLogin));
  const hoyolabResp = `${messages.join('\n\n')}`

  if(notify == true){
    if(telegramBotToken && myTelegramID){
      postWebhook(hoyolabResp);
    }
  }

}

function autoLogin({ token, genshin, hsr, name }) {

  const urls = [];

  if (genshin) urls.push(expUrl.Genshin);
  if (hsr) urls.push(expUrl.Star_Rail);

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = `Check-in completed for ${name}`;

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const checkInResult = JSON.parse(hoyolabResponse).message;
    const gameName = Object.keys(expUrl).find(key => expUrl[key] === urls[i])?.replace(/_/g, ' ');
    response += `\n${gameName}: ${checkInResult}`;
  };

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    'chat_id': myTelegramID,
    'text': data,
    'parse_mode': 'HTML'
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage', options);
}