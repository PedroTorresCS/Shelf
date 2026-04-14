import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("BOOK");
  const [status, setStatus] = useState("NOT_READ");

  async function loadBooks() {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newBook = {
      title,
      author,
      type,
      status,
    };

    try {
      await api.post("/books", newBook);
      setTitle("");
      setAuthor("");
      setType("BOOK");
      setStatus("NOT_READ");
      loadBooks();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/books/${id}`);
      loadBooks();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px", fontFamily: "Arial" }}>
      <h1>ShelfTrack</h1>
      <p>Minha biblioteca pessoal</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "10px", flex: 1 }}>
            <option value="BOOK">Livro</option>
            <option value="MANGA">Mangá</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "10px", flex: 1 }}>
            <option value="NOT_READ">Não lido</option>
            <option value="READING">Lendo</option>
            <option value="COMPLETED">Concluído</option>
            <option value="PAUSED">Pausado</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px 16px", cursor: "pointer" }}>
          Adicionar
        </button>
      </form>

      <h2>Livros cadastrados</h2>

      {books.length === 0 ? (
        <p>Nenhum item cadastrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <strong>{book.title}</strong>
              <p>Autor: {book.author || "Não informado"}</p>
              <p>Tipo: {book.type}</p>
              <p>Status: {book.status}</p>

              <button onClick={() => handleDelete(book.id)} style={{ padding: "8px 12px", cursor: "pointer" }}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  async function handleSubmit(e) {
  e.preventDefault();

  const newBook = {
    title,
    author,
    type,
    status,
  };

  console.log("Enviando:", newBook);

  try {
    const response = await api.post("/books", newBook);
    console.log("Salvo com sucesso:", response.data);

    setTitle("");
    setAuthor("");
    setType("BOOK");
    setStatus("NOT_READ");

    loadBooks();
    alert("Livro adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar livro:", error);
    alert("Erro ao salvar livro. Veja o console.");
  }
}
}

export default App;