import { useOutletContext } from "react-router-dom";
import CartCard from "../components/CartCard.jsx";
import "../css/shop.css";

export default function Cart() {
  const { items, cart, removeItem, changeAmount } = useOutletContext();

  if (cart.length > 0) {
    return (
      <div className="itemList">
        {cart.map((cartItem) => {
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
        <div>You don&lsquo;t have any items in your cart.</div>
    )
  }
}
