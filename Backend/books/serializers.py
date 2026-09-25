from rest_framework import serializers

from .models import Book


class BookSerializer(serializers.ModelSerializer):

    cover_image = serializers.SerializerMethodField()

    pdf_file = serializers.SerializerMethodField()

    class Meta:

        model = Book

        fields = [
            "id",
            "title",
            "author",
            "description",
            "category",
            "language",
            "publication_year",
            "cover_image",
            "pdf_file",
            "rating",
            "created_at",
            "updated_at",
        ]

    def get_cover_image(self, obj):

        request = self.context.get("request")

        if obj.cover_image:

            return request.build_absolute_uri(
                obj.cover_image.url
            )

        return None

    def get_pdf_file(self, obj):

        request = self.context.get("request")

        if obj.pdf_file:

            return request.build_absolute_uri(
                obj.pdf_file.url
            )

        return None