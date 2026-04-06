import { useParams, useOutletContext } from "react-router-dom";
import ShopCard from "../components/ShopCard.jsx";
import '../css/shop.css';

export default function Shop() {
  const { category } = useParams();
  const { items, addItem } = useOutletContext();

  return (
    <div className="itemList">
      {items
      .filter(item => category === undefined || item.category === category)
      .map(item => (
        <ShopCard key={item.id} item={item} addItem={addItem}/>
      ))}
    </div>
  );
}
