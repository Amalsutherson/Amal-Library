from django.db import models


class Book(models.Model):

    title = models.CharField(max_length=255)

    author = models.CharField(max_length=255)

    description = models.TextField()

    category = models.CharField(max_length=100)

    language = models.CharField(
        max_length=100,
        default="English"
    )

    publication_year = models.IntegerField(
        null=True,
        blank=True
    )

    cover_image = models.ImageField(
        upload_to="book_covers/",
        null=True,
        blank=True
    )

    pdf_file = models.FileField(
        upload_to="books/",
        null=True,
        blank=True
    )

    rating = models.FloatField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title