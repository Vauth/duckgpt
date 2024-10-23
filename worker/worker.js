// ---------------------------- //
// - github.com/Vauth/duckgpt - //
// ---------------------------- //

const MODELS = ['gpt-4o-mini', 'claude-3-haiku-20240307', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'mistralai/Mixtral-8x7B-Instruct-v0.1'];
const MAIN_MODEL = 'gpt-4o-mini'; 
const STATUS_URL = 'https://duckduckgo.com/duckchat/v1/status';
const CHAT_API = 'https://duckduckgo.com/duckchat/v1/chat';

const ERROR_404 = {"action":"error", "status": 404, "usage": "GET /chat/?prompt=<text>&model=<model>&history=<List[Dict{str, str}]>", "models": MODELS};
const ERROR_403 = {"action":"error", "status": 403, "response": "Wrong history syntax", "example":"[{'role': 'user','content': 'Expert python geek'}]"};

const HEAD_JSON = { 'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"};
const HEAD_HTML = { 'content-type': 'text/html', 'Access-Control-Allow-Origin': "*"};


// ---------- Event Listener ---------- //

addEventListener('fetch', event => { 
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);
  let prompt = url.searchParams.get('prompt');
  let history = url.searchParams.get('history') || '[]';
  let model = url.searchParams.get('model') || MAIN_MODEL;

  if (url.pathname == "/") {
    let response = HTML;
    return new Response(response, {headers: HEAD_HTML});
  }

  if (prompt && url.pathname == "/chat/") {
    let response = JSON.stringify(await Chat(prompt, history, model));
    return new Response(response, {headers: HEAD_JSON});
  } else {
    let response = JSON.stringify(ERROR_404);
    return new Response(response, {headers: HEAD_JSON});
  }
}

// ---------- Duckgpt Function ---------- //

async function Chat(prompt, history, model) {
  let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Referer': 'https://duckduckgo.com/',
    'Cache-Control': 'no-store',
    'x-vqd-accept': '1',
    'Connection': 'keep-alive',
    'Cookie': 'dcm=3',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Priority': 'u=4',
    'Pragma': 'no-cache',
    'TE': 'trailers'
  }

  headers['x-vqd-4'] = await fetch(STATUS_URL, { headers: headers }).then(response => response.headers.get('x-vqd-4'));
  headers['Content-Type'] = 'application/json'; let message;

  try {message = JSON.parse(history).concat([{ role: 'user', content: prompt }])
  } catch {return ERROR_403}

  let Response = await (await fetch(CHAT_API, { method: 'POST', headers: headers, body: JSON.stringify({model: model, messages: message}) })).text();
  let chatMessages = Response.split('\n').filter(line => line.includes('message')).map(line => JSON.parse(line.split('data: ')[1]).message).join('');
  
  if (chatMessages == "") {return Response;}
  else {return {"action":"success", "status": 200, "response": chatMessages, "model": model}}
}

// ----------------------------- //
// - github.com/zar0x/duck-gui - //
// ----------------------------- //

let CONFIG = {
  "scripts": {
      "particles": `https://vauth.github.io/duck-gui/scripts/particles.js`,
      "script": `https://vauth.github.io/duck-gui/scripts/script.js`
  },
  "styles": {
      "light": `https://vauth.github.io/duck-gui/styles/light.css`,
      "styles": `https://vauth.github.io/duck-gui/styles/styles.css`
  },
  "resources": {
      "clear": `https://vauth.github.io/duck-gui/assets/clear.png`,
      "developer": `https://vauth.github.io/duck-gui/assets/developer.png`,
      "help": `https://vauth.github.io/duck-gui/assets/help.png`,
      "load": `https://vauth.github.io/duck-gui/assets/load.gif`,
      "photo": `https://vauth.github.io/duck-gui/assets/photo.jpg`,
      "send": `https://vauth.github.io/duck-gui/assets/send.png`,
      "setting": `https://vauth.github.io/duck-gui/assets/setting.png`,
      "source": `https://vauth.github.io/duck-gui/assets/source.png`,
      "favicon": `https://vauth.github.io/duck-gui/assets/favicon.png`,
      "ogcover": `https://vauth.github.io/duck-gui/assets/ogcover.png`
  }
}


// ---------- HTML Website ---------- //

let HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" type="image/png" sizes="512x512" href="${CONFIG.resources.favicon}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="DuckGPT unlimited AI assistant." />
    <meta name="keywords" content="chatgpt, duckgpt, duckduckgo, AI" />
    <meta property="og:image" content="${CONFIG.resources.ogcover}"> 
    <meta name="author" content="execal">
    <title>DuckGPT Chat</title>
    <meta charset="UTF-8" />
    
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      
       
      #container {
        position: relative;
      }

      #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        background: linear-gradient(135deg, #2b2b2b, #121212);
      }

      .loader {
        width: 48px;
        height: 48px;
        border: 2px solid #e1e1e1;
        position: absolute;
        left: -24px;
        top: -24px;
        box-sizing: border-box;
        animation: rotation 2s ease-in-out infinite;
      }
      #sq2 {
        border-color: #ff3333;
        animation-delay: 1s;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <script
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    ></script>

    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
  </head>
  <body>
  <div id="loader">
    <div id="container">
      <div id="sq1" class="loader"></div>
      <div id="sq2" class="loader"></div>
    </div>
  </div>
  <script>if (JSON.parse(localStorage.getItem("setting"))['light']) 
  {document.getElementById('loader').style.background = 'linear-gradient(135deg, #ffffff, #a4a4a4)';
  document.getElementById('sq1').style.borderColor = '#1e1e1e';
  document.getElementById('sq2').style.borderColor = '#2965ff'}</script>
    <div id="dailog" class="dailog"></div>
    <div class="header" id="nHead">
        <button id="new-chat-button">
            <img class="iconImg headerIcon" src="${CONFIG.resources.clear}" alt="clear Chat" />
        </button>
    </div>
    <div class="header" id="sHead">
        <button id="setting-button">
            <img class="iconImg headerIcon" src="${CONFIG.resources.setting}" alt="Settings" />
        </button>
    </div>
    <div id="popup-overlay" class="hidden">
      <div id="popup-content">
        <span id="close-popup">&times;</span>
        <div id="clearchat-popup" class="hidden">
            <p>
              Are you sure you want to clear the current chat and start a new one?
            </p>
            <button id="yes-button">Yes</button>
            <button id="no-button">No</button>
        </div>
        <div id="setting-popup" class="hidden">
          <div class="setting-option">
            <label for="particles-toggle">Particle Effects</label>
            <label class="switch">
              <input type="checkbox" id="particles-toggle"/>
              <span class="slider round"></span>
            </label>
          </div>
  
          <div class="setting-option">
            <label for="theme-toggle">Light Theme</label>
            <label class="switch">
              <input type="checkbox" id="theme-toggle" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div id="intro-cards-container" class="intro-cards hidden">
      <div class="intro-card card-1">
        <img src="${CONFIG.resources.source}" alt="Open Source Icon" />
        <p>This GUI is an open-source project for <a href="https://github.com/vauth/duckgpt">DuckGPT</a></p>
      </div>
      <!-- <div class="intro-card card-2">
        <img src="${CONFIG.resources.developer}" alt="Help Icon" />
        <p>Click the "Type a message below to start.</p>
      </div> -->
      <div class="intro-card card-3">
        <img src="${CONFIG.resources.developer}" alt="Developer Icon" />
        <p>Front-End: <a href="https://github.com/ZAR0X">Zarox</a><br>Back-End: <a href="https://github.com/VAUTH">Vauth</a></p>
      </div>
    </div>
    <div class="chat-container">
      <div id="chat-box" class="chat-box">
        <div class="message-container" id="spaceChatBox"></div>
      </div>
      
      <div class="input-container">
        <div
          id="chat-input"
          class="editable-div"
          contenteditable="true"
          role="textbox"
          aria-multiline="true"
        ></div>
        <div id="placeholder">Type your message here...</div>
        <!-- <input type="text" id="chat-input" placeholder="Type your message here..." autofocus> -->
        <button id="send-button">
          <img class="iconImg" src="${CONFIG.resources.send}" alt="Send" />
        </button>
      </div>
    </div>
    <div id="particles-js"></div>

    <script type="module" src="${CONFIG.scripts.particles}"></script>
    <script type="module" src="${CONFIG.scripts.script}"></script>
  </body>
</html>`
