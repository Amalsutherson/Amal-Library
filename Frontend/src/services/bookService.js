const API_URL = "http://127.0.0.1:8000/api";

/*
 * GET ALL BOOKS
 */
export async function getBooks() {
  try {
    const response = await fetch(`${API_URL}/books/`, {
      method: "GET",
    });

    console.log("GET /api/books/ status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Get books error:", errorData);

      throw new Error(
        errorData?.detail ||
          `Failed to fetch books. Status: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Books received:", data);

    return data;
  } catch (error) {
    console.error("getBooks() error:", error);
    throw error;
  }
}


/*
 * GET SINGLE BOOK
 */
export async function getBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}/`, {
      method: "GET",
    });

    console.log(`GET /api/books/${id}/ status:`, response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Get book error:", errorData);

      throw new Error(
        errorData?.detail ||
          `Failed to fetch book. Status: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Book received:", data);

    return data;
  } catch (error) {
    console.error("getBook() error:", error);
    throw error;
  }
}


/*
 * CREATE / UPLOAD BOOK
 *
 * bookData should be FormData.
 */
export async function createBook(bookData) {
  try {
    const response = await fetch(`${API_URL}/books/`, {
      method: "POST",

      // Do NOT set Content-Type manually.
      // Browser automatically sets multipart/form-data boundary.
      body: bookData,
    });

    console.log("POST /api/books/ status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Upload error:", errorData);

      throw new Error(
        errorData?.detail ||
          `Failed to upload book. Status: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Book uploaded:", data);

    return data;
  } catch (error) {
    console.error("createBook() error:", error);
    throw error;
  }
}


/*
 * UPDATE BOOK
 *
 * bookData should normally be FormData.
 */
export async function updateBook(id, bookData) {
  try {
    const response = await fetch(`${API_URL}/books/${id}/`, {
      method: "PATCH",
      body: bookData,
    });

    console.log(
      `PATCH /api/books/${id}/ status:`,
      response.status
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Update error:", errorData);

      throw new Error(
        errorData?.detail ||
          `Failed to update book. Status: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Book updated:", data);

    return data;
  } catch (error) {
    console.error("updateBook() error:", error);
    throw error;
  }
}


/*
 * DELETE BOOK
 */
export async function deleteBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}/`, {
      method: "DELETE",
    });

    console.log(
      `DELETE /api/books/${id}/ status:`,
      response.status
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Delete error:", errorData);

      throw new Error(
        errorData?.detail ||
          `Failed to delete book. Status: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("deleteBook() error:", error);
    throw error;
  }
}