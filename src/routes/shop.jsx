import { useParams, useOutletContext, useSearchParams } from "react-router-dom";
import ShopCard from "../components/ShopCard.jsx";
import "../css/shop.css";

export default function Shop() {
  const { category } = useParams();
  const { items, addItem } = useOutletContext();
  // Get search parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filter by category if available and search query if available
  return (
    <div className="itemList">
      {items
        .filter((item) => {
          const checkCategory =
            category === undefined || item.category === category;

          const checkSearch =
            query === "" || item.title.toLowerCase().includes(query);

          return checkCategory && checkSearch;
        })
        .map((item) => (
          <ShopCard key={item.id} item={item} addItem={addItem} />
        ))}
    </div>
  );
}
