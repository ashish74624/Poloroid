from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="unitary/toxic-bert",
    tokenizer="unitary/toxic-bert"
)

def is_hateful(text: str) -> bool:
    if not text.strip():
        return False

    results = classifier(text)

    for item in results:
        if item["label"] in ["toxic", "insult", "threat", "severe_toxic"] and item["score"] > 0.7:
            return True

    return False
