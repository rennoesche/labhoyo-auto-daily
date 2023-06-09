<h1 align="center">
    labhoyo-auto-daily
</h1>

Script that automatically collect rewards from hoyolab daily check in. Notification will sent to telegram.

## Setup
1. Go to [Google Apps Script](https://script.google.com/home/start), create a new project.
2. Select the editor and paste the( [code](https://github.com/labhoyo-auto-daily/blob/main/here/labhoyo-auto-daily.gs) ), and follow the configuration below.
3. Select Select "main" and click the "Run" button at the top menu.  
   Grant the necessary permissions and confirm that the configuration is correct (Execution started > completed).
4. Add new trigger from left sidebar
   Set the function to run: main  
   Set the event source: Time-driven  
   Set the type of time based trigger: Day timer  
   Set the time of day: recomended time start from 6 am to 4 pm.

## Configuration
```javascript
/** hoyolab config **/
const acc = [
  { token: "token hoyolab here", 
    genshin: true, 
    hsr: true, 
    name: "your name" }
];

/** telegram config **/
const notify = true
const myTelegramID = "your telegram id"
const telegramBotToken = "your telegram bot token"
```
1. **token** - Please enter the token from hoyolab check-in page.

   After entering the [hoyolab check-in page](https://www.hoyolab.com/circles), enter the console in developer tools browser.  
   Paste the following code and run it to get the token. Copy the token and paste it in "token hoyolab here".
   ```javascript
   function getCookie(name) {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${name}=`);
     if (parts.length === 2) return parts.pop().split(';').shift();
   }
   let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';';
   let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');
   if (ask == true) {
     copy(token);
     msg = token;
   } else {
     msg = 'Cancel';
   }
   ```

2. **genshin**

   true = enable auto check-in for genshin.
   false = disable auto check-in for genshin.

3. **hsr**

   true = enable auto check-in for honkai-star-rail.
   false = disable auto check-in for honkai-star-rail.

4. **name**

   just enter your name, custom name or account name doesn't matter.

5. **notify**

   true = enable telegram notify.
   false = disable telegram notify.

6. **myTelegramID**

   your telegram UID, just find bot that can show your telegram id, eg. [IDBot](https://t.me/myidbot).

7. **telegramBotToken** - your telegram bot token

   make your own telegram bot from [@BotFather](https://t.me/botfather).
   and copy the token, which like `11123456:AABBccddeeffABJD75sYaasa`.

8. **Multiple accounts??**

    just duplicate the code, demo:
    ***single account***
    ```javascript
    const acc = [
        { token: "token hoyolab here", 
          genshin: true, 
          hsr: true, 
          name: "my main account" }
    ];
    ```
    ***two accounts***
    ```javascript
    const acc = [
        { token: "token hoyolab here", 
          genshin: true, 
          hsr: true, 
          name: "my main account" },
        { token: "token hoyolab here", 
          genshin: true, 
          hsr: true, 
          name: "my smurf account" }
    ];
    ```
