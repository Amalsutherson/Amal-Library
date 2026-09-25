import { apiFetch } from "./authService";


const API_URL =
  "http://127.0.0.1:8000/api/ai";


export async function askAI(
  question,
  bookId
) {

  return apiFetch(
    `${API_URL}/chat/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question,
        book_id: bookId,
      }),
    }
  );

}