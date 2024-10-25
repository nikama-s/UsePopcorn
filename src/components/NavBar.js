import Search from "./Search";
import NumResults from "./NumResults";
import Logo from "./Logo";

export default function NavBar({ setQuery, query, movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search setQuery={setQuery} query={query} />
      <NumResults movies={movies} />
    </nav>
  );
}
