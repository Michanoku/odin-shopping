import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import ShopCard from "../components/ShopCard";
import "../css/shop.css";
import "../css/frontpage.css";

export default function Frontpage() {
  const { items, addItem } = useOutletContext();

  // Get a highlight from the items, IF the items already exist
  const highlight = useMemo(() => {
    if (!items || items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)];
  }, [items]);

  // If there is no highlight, display a loader from css loaders, otherwise show the card
  const card = highlight ? (
    <ShopCard key={highlight.id} item={highlight} addItem={addItem} />
  ) : (
    <div className="loader"></div>
  );
  return (
    <div className="frontpage">
      <div className="frontTitle">Check out this hot item!</div>
      <div className="highlight">{card}</div>
      <div className="subTitle">Get it while it lasts!</div>
    </div>
  );
}
