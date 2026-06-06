import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    genre: ""
  });

  const API_URL = "http://localhost:8020";

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/sample-movies`
      );

      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMovie = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_URL}/api/movies`,
        form
      );

      setForm({
        title: "",
        genre: ""
      });

      getMovies();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container">
      <h1>Movie Watchlist</h1>

      <form onSubmit={addMovie}>
        <input
          type="text"
          placeholder="Movie Name"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) =>
            setForm({
              ...form,
              genre: e.target.value
            })
          }
        />

        <button type="submit">
          Add Movie
        </button>
      </form>

      <hr />

      <h2>Movies</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;