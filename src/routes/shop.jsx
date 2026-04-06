import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ItemCard from "../components/ItemCard.jsx";
import '../css/shop.css';

export default function Shop() {
  const [items, setItems] = useState([]);
  const [cachedCategories, setCachedCategories] = useState(new Set());
  const { category } = useParams();
  const { categories, addItem } = useOutletContext();

  useEffect(() => {
    const requestedCategories =
      category !== undefined ? [category] : categories;
      const uncachedCategories = requestedCategories.filter(
        (requestedCategory) => !cachedCategories.has(requestedCategory)
      );
    if (uncachedCategories.length > 0) {
      fetchItems(uncachedCategories).then((fetchedItems) => {
        if (fetchedItems) {
          setItems((prev) => {
            const newItems = fetchedItems.flat();

            const existingIds = new Set(prev.map((item) => item.id));

            const filtered = newItems.filter(
              (item) => !existingIds.has(item.id),
            );

            return [...prev, ...filtered];
          });
          setCachedCategories((prev) => {
            const newSet = new Set(prev);
            uncachedCategories.forEach(uncachedCategory => newSet.add(uncachedCategory));
            return newSet;
          });
        }
      });
    }
  }, [category, categories, cachedCategories]);

  async function fetchItems(uncachedCategories) {
    // Fetch uncached categories from the API
    const promises = uncachedCategories.map(async (uncachedCategory) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${uncachedCategory}`,
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error.message);
      }
    });
    const results = await Promise.all(promises);
    return results;
  }

  return (
    <div className="itemList">
      {items
      .filter(item => category === undefined || item.category === category)
      .map(item => (
        <ItemCard key={item.id} item={item} addItem={addItem}/>
      ))}
    </div>
  );
}
