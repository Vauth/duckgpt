# - github.com/Vauth/duckgpt - #

import json
import requests
from typing import List, Dict
from googlesearch import get_random_user_agent

class DuckGPT:
    """
    Client = DuckGPT(model="gpt-4o-mini")
    Get list of models >> Client.Models() -> list
    Chat using history >> Client.Chat(str, List[Dict[str, str]]) -> str
    """
    def __init__(self, model="gpt-4o-mini"):
        self.version = 'v1.0'
        self.model = f'{model}'
        self.author = 'github.com/vauth'

        self.status_url = 'https://duckduckgo.com/duckchat/v1/status'
        self.chat_api = 'https://duckduckgo.com/duckchat/v1/chat'

        self.headers = {
            'User-Agent': (get_random_user_agent()).decode('utf-8'),
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

    class OperationError(Exception):
        def __init__(self, error_text):
            self.error_text = error_text
            super().__init__(error_text)

    def GetVQD(self) -> str:
        response = requests.get(self.status_url, headers=self.headers)
        if response.headers.get('x-vqd-4'): return response.headers['x-vqd-4']
        else: raise self.OperationError("GetVQD(): No 'x-vqd-4' header found.")

    def Models(self) -> list:
        return ['gpt-4o-mini', 'claude-3-haiku-20240307', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'mistralai/Mixtral-8x7B-Instruct-v0.1']

    def Chat(self, prompt: str, history: List[Dict[str, str]]) -> str:
        data = {"model": self.model, "messages": history + [{"role": "user", "content": prompt}]}
        self.headers["x-vqd-4"] = self.GetVQD()
        self.headers["Content-Type"] = "application/json"
        response = requests.post(self.chat_api, headers=self.headers, json=data)
        if response.status_code == 200:
            return ''.join([json.loads(i.split("data: ")[1])['message'] for i in response.text.splitlines() if 'message' in i])
        else:
            raise self.OperationError("Chat(): " + response.text)
