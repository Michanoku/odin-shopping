import { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import "../css/Search.css";

// The search that lets the user search for an item
export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname;
  const query = searchParams.get("q") || "";

  // This effect checks if we are navigating to another page, the search should be reset then
  useEffect(() => {
    // Check if we are going to a page that has search
    const isSearchPage = path.startsWith("/shop") || path.startsWith("/cart");

    // Check if we have a query
    const hasQuery = searchParams.get("q");
    // Reset the search
    if (!isSearchPage && !hasQuery) {
      setSearchParams({});
    }
  }, [path]);

  // If the user types, nagivate with the appropriate parameters
  function handleSearchChange(event) {
    const value = event.target.value;
    const isFirstSearch = !searchParams.get("q");
    if (path === "/") {
      // Only redirect if the user is trying to search from the frontpage
      navigate(
        {
          pathname: "/shop/",
          search: value ? `?q=${encodeURIComponent(value)}` : "",
        },
        { replace: !isFirstSearch },
      );
    } else {
      navigate(
        {
          search: value ? `?q=${encodeURIComponent(value)}` : "",
        },
        { replace: !isFirstSearch },
      );
    }
  }
  
  return (
    <div className="search">
      <SearchIcon />
      <input
        type="search"
        id="q"
        className="searchBar"
        aria-label="Search products"
        placeholder="Search"
        name="q"
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
}
