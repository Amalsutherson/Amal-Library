import os
import time

from google import genai
from google.genai import errors


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured.")


client = genai.Client(
    api_key=GEMINI_API_KEY
)


PRIMARY_MODEL = "gemini-3.8-flash"
FALLBACK_MODEL = "gemini-3.7-flash"


def ask_gemini(prompt):

    models_to_try = [
        PRIMARY_MODEL,
        FALLBACK_MODEL,
    ]

    last_error = None

    for model in models_to_try:

        for attempt in range(3):

            try:

                print(
                    f"Gemini request | model={model} | attempt={attempt + 1}"
                )

                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                if response and response.text:

                    print(
                        f"Gemini response received | model={model}"
                    )

                    return response.text

                raise RuntimeError(
                    "Gemini returned an empty response."
                )

            except errors.ServerError as e:

                last_error = e

                print(
                    f"Gemini server error | "
                    f"model={model} | "
                    f"attempt={attempt + 1} | "
                    f"error={e}"
                )

                # Exponential backoff:
                # 2 seconds
                # 4 seconds
                # 8 seconds
                wait_time = 2 ** attempt

                time.sleep(wait_time)

            except Exception as e:

                last_error = e

                print(
                    f"Gemini request failed | "
                    f"model={model} | "
                    f"error={e}"
                )

                break

    raise RuntimeError(
        f"Gemini could not generate an answer. "
        f"Last error: {last_error}"
    )