# Duck GPT
DuckDuckGo AI Chat Wrapper.

<br>

## ⚙️ Usage:
```python
if __name__ == "__main__":
    Client = DuckGPT(model="gpt-4o-mini")
    histories = [{
        "role": "user",
        "content": "you are an expert python geek"
    }]
    question = "How to decode base64 using python"
    print(Client.Chat(question, histories))
```

<br>

## 📚 Functions:
#### `DuckGPT.Chat`
- Request to duck api using prompt.
#### `DuckGPT.Models`
- Get list of available models.

<br>

## 📂 Models:
- `gpt-4o-mini`
- `claude-3-haiku-20240307`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`

<br>

## 🛠 Cloudflare Setup:
### Easy Deploy:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vauth/duckgpt)
### Manually:
- Upload `worker.js` into [cloudflare workers](https://workers.cloudflare.com/).
- Use `duckgpt.XXXX.workers.dev/chat/?prompt=hi&model=gpt-4o-mini` endpoint.

**Sample api:** [duck.gpt-api.workers.dev](https://duck.gpt-api.workers.dev/help/)
