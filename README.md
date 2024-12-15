<h1>Duck <a href="#Favicon"><img src="https://github.com/user-attachments/assets/b11de9df-f6b1-47a8-973f-cf66375748b9" width="33px"></a> GPT</h1>
<p>Unlimited ChatGPT using cloudflare workers and duckchat.</p>

<br>

## 🗜 Features
- **Clear Chat**: Start a new conversation at any time.
- **Settings**: Toggle particle effects and theme settings (light/dark).
- **Open Source Contributions**: Open to community contributions for further improvements.

<br>

## 📂 Models
- `gpt-4o-mini`
- `claude-3-haiku-20240307`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`

<br>

## ⚙️ Deploy
- Create a [Cloudflare](https://www.cloudflare.com/) **account**.
- Navigate to `Workers & Pages > Create > Create Worker`.
- Deploy the worker by clicking **Deploy**.
- Edit the code by clicking **Edit Code**.
- Upload [worker.js](https://github.com/Vauth/duckgpt/blob/main/worker/worker.js) into **Cloudflare**.
- Finally, **Deploy**.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/vauth/duckgpt)

<br>

## 📡 Live Demo
Check out the live demo [here](https://duck.gpt-api.workers.dev). ([API Endpoint](https://duck.gpt-api.workers.dev/chat/?prompt=hi&model=gpt-4o-mini))

<br>

## 📷 Screenshot
<a href="#Screenshot"><img src="https://github.com/user-attachments/assets/38f60b5a-6a31-42ed-9446-0ce44a06f20f" width="1612px"></a>

<br>

## 📦 Python Usage ([main.py](https://github.com/Vauth/duckgpt/blob/main/main.py))
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

## 🛠 Credits
- **Front-End Developer**: [Zarox](https://github.com/Zar0x) ([duck-gui](https://github.com/Zar0x/duck-gui))
- **Back-End Developer & GPT API**: [Vauth](https://github.com/Vauth)

<br>

## 🔗 Contributing
Contributions are welcome! Feel free to submit a pull request or report an issue.

<br>

## 🔎 License
```
MIT License

Copyright (c) 2024 Vauth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
