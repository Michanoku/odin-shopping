import { useOutletContext, useSearchParams } from "react-router-dom";
import CartCard from "../components/CartCard.jsx";
import "../css/shop.css";

// The users shopping cart
export default function Cart() {
  const { items, cart, removeItem, changeAmount } = useOutletContext();
  // Get search parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  // Filter card if there is a search
  const filteredCart = cart.filter((cartItem) => {
    if (!query) return true;

    const shopItem = items.find((item) => item.id === cartItem.id);

    return shopItem?.title.toLowerCase().includes(query);
  });

  if (filteredCart.length > 0) {
    return (
      <div className="itemList">
        {filteredCart.map((cartItem) => {
          const shopItem = items.find((item) => item.id === cartItem.id);
          return (
            <CartCard
              key={cartItem.id}
              cartItem={cartItem}
              item={shopItem}
              removeItem={removeItem}
              changeAmount={changeAmount}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="emptyList">
        You don&lsquo;t have any items in your cart.
      </div>
    );
  }
}
