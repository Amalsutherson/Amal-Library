from django.urls import path

from .views import AskGeminiView


urlpatterns = [
    path(
        "chat/",
        AskGeminiView.as_view(),
        name="gemini-chat"
    ),
]