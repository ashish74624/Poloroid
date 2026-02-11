import requests
import os

HF_API_URL = "https://router.huggingface.co/hf-inference/models/unitary/toxic-bert"
HF_TOKEN = os.getenv("HF_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

def is_hateful(text: str) -> bool:
    if not text.strip():
        return False

    response = requests.post(
        HF_API_URL,
        headers=headers,
        json={"inputs": text}
    )

    print("$$ Status:", response.status_code)
    print("$$ Raw text:", response.text)

    result = response.json()


    if isinstance(result, list):
        for item in result[0]:
            if item["label"] in ["toxic", "insult", "threat", "severe_toxic"] and item["score"] > 0.7:
                return True

    return False
