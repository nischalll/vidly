import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/Pagination";
import { paginate } from "../utils/paginate";
import Listgroup from "../common/Listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import SearchBox from "./SearchBox";
import Link from "react-router-dom/Link";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({
    genreMovies: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  });
  const [pagination, setPagination] = useState({
    pageSize: 4,
    currentPage: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setMovies(getMovies());
    setGenres({
      ...genres,
      genreMovies: [{ _id: "", name: "All Genres" }, ...getGenres()],
    });
  }, []);
  // console.log(genres);
  function handleLike(movie) {
    const moviesCp = [...movies];
    const index = moviesCp.indexOf(movie);
    moviesCp[index].liked = !movies[index].liked;
    setMovies(moviesCp);
  }

  function handleDelete(movie) {
    setMovies((movies) => movies.filter((m) => m._id !== movie._id));
  }

  function handleSort(path) {
    const sortColumn = { ...genres.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    setGenres({
      ...genres,
      sortColumn,
    });
  }

  const { length: count } = movies;
  const { pageSize, currentPage } = pagination;
  const { sortColumn } = genres;
  const {selectedGenre}=genres;
  if (count === 0) return <p>There are no movies in the database.</p>;

  let filtered = movies;
  if (searchQuery)
    filtered = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (selectedGenre && selectedGenre._id)
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedMovies = paginate(sorted, currentPage, pageSize);
  // console.log(paginatedMovies);
  function handlePageChange(page) {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  }

  function handleGenreSelect(genre) {
    setGenres({
      ...genres,
      selectedGenre: genre,
    });
    setPagination({
      ...pagination,
      currentPage: 1,
    });
    searchQuery("");
    // console.log(genre);
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setGenres({
      ...genres,
      selectedGenre: null,
    });
    setPagination({
      ...pagination,
      currentPage: 1,
    });
  }

  return (
    <div className="row">
      <div className="col-2">
        <Listgroup
          items={genres.genreMovies}
          selectedItem={genres.selectedGenre}
          onGenreSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <Link className="btn btn-primary" to="/movies/new/">
          New Movie
        </Link>
        <p>Showing {filtered.length} movies in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={paginatedMovies}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
