import '../css/Search.css';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
    return (
        <div className="search">
            <SearchIcon />
            <input className="searchBar" placeholder="Search" type="search"/>
        </div>
    )
}

