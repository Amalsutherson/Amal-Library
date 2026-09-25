import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from books.models import Book
from .gemini_service import ask_gemini


logger = logging.getLogger(__name__)


class AskGeminiView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            question = request.data.get("question")
            book_id = request.data.get("book_id")

            logger.info("AI REQUEST RECEIVED")
            logger.info("Question: %s", question)
            logger.info("Book ID: %s", book_id)

            if not question:
                return Response(
                    {
                        "success": False,
                        "message": "Question is required",
                        "data": None,
                        "error": "question_missing",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not book_id:
                return Response(
                    {
                        "success": False,
                        "message": "Book ID is required",
                        "data": None,
                        "error": "book_id_missing",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            book = Book.objects.get(id=book_id)

            logger.info("BOOK FOUND: %s", book.title)

            prompt = f"""
You are Amal Library AI, an intelligent assistant for a digital library.

Answer the user's question clearly and accurately.

Book Information:
Title: {book.title}
Author: {book.author}
Category: {book.category}
Language: {book.language}
Publication Year: {book.publication_year}
Description: {book.description}

User Question:
{question}

Instructions:
- Give a clear and useful answer.
- If the question is related to the book, use the book information provided.
- Do not invent information that is not available.
- If the provided book information is insufficient, clearly say so.
"""

            logger.info("SENDING REQUEST TO GEMINI")

            answer = ask_gemini(prompt)

            logger.info("GEMINI RESPONSE RECEIVED")
            logger.info("Answer length: %s", len(answer) if answer else 0)

            return Response(
                {
                    "success": True,
                    "message": "Answer generated successfully",
                    "data": {
                        "answer": answer,
                    },
                    "error": None,
                },
                status=status.HTTP_200_OK,
            )

        except Book.DoesNotExist:

            logger.exception("BOOK NOT FOUND")

            return Response(
                {
                    "success": False,
                    "message": "Book not found",
                    "data": None,
                    "error": "book_not_found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:

            logger.exception("GEMINI AI ERROR")

            return Response(
                {
                    "success": False,
                    "message": "I couldn't generate an answer",
                    "data": None,
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )