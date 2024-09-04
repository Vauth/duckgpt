// - github.com/Vauth/duckgpt - //

const MODELS = ['gpt-4o-mini', 'claude-3-haiku-20240307', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'mistralai/Mixtral-8x7B-Instruct-v0.1'];
const STATUS_URL = 'https://duckduckgo.com/duckchat/v1/status';
const CHAT_API = 'https://duckduckgo.com/duckchat/v1/chat';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);
  let prompt = url.searchParams.get('prompt');
  let history = url.searchParams.get('history') || '[]';
  let model = url.searchParams.get('model') || 'gpt-4o-mini';
  let headers = { 'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"}

  if (!prompt || request.method !== "GET" || url.pathname !== "/chat/") {
    return new Response(await Raise(), {status: 400, headers: headers});
  } else {
    return new Response(await Chat(prompt, history, model), {status: 200, headers: headers});
  }
}

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
  } catch {return JSON.stringify({"action":"error", "status": 403, "response": "Wrong history syntax", "example":"[{'role': 'user','content': 'you are an expert python geek'}]"})}

  let data = JSON.stringify({model: model, messages: message});
  let Response = await (await fetch(CHAT_API, { method: 'POST', headers: headers, body: data })).text();
  let chatMessages = Response.split('\n').filter(line => line.includes('message')).map(line => JSON.parse(line.split('data: ')[1]).message).join('');
  
  if (chatMessages == "") {return Response;}
  else {return JSON.stringify({"action":"success", "status": 200, "response": chatMessages, "model": model});}
}

async function Raise() {
  return JSON.stringify({"action":"error", "status": 404, "usage": "GET /chat/?prompt=<text>&model=<model>&history=<List[Dict{str, str}]>", "models": MODELS});
}
