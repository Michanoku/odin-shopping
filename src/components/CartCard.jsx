import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
export default function CartCard({ cartItem, item, removeItem, changeAmount }) {
  // Handle the manual change of numbers, but don't allow non numbers
  function handleChange(e) {
    // Allow empty for erasing and typing purposes
    const value = e.target.value.replace(/\D/g, "");
    changeAmount({
      id: cartItem.id,
      amount: value,
    });
  }

  // When the user leaves the input, make sure the value is valid (1-10)
  function handleBlur(e) {
    let inputNumber = e.target.value;
    if (!inputNumber || isNaN(inputNumber)) inputNumber = 0;
    inputNumber = Math.max(0, Math.min(10, inputNumber));
    changeAmount({
      id: cartItem.id,
      amount: inputNumber,
    });
  }

  function handleAmount(operation) {
    let newAmount =
      operation === "add"
        ? Math.min(10, cartItem.amount + 1)
        : Math.max(0, cartItem.amount - 1);

    changeAmount({
      id: cartItem.id,
      amount: newAmount,
    });
  }

  return (
    <div className="itemCard">
      <div className="itemImage">
        <img src={item.image} />
      </div>
      <div>{item.title}</div>
      <div className="itemCartOptions">
        <div className="itemPrice">${item.price}</div>
        <div className="itemAmountSelect">
          <button className="amountButton">
            <CircleArrowLeft onClick={() => handleAmount("subtract")} />
          </button>
          <input
            type="number"
            step="1"
            min="0"
            value={cartItem.amount}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e)}
          />
          <button className="amountButton">
            <CircleArrowRight onClick={() => handleAmount("add")} />
          </button>
        </div>
      </div>
      <div className="itemButton">
        <button onClick={() => removeItem(cartItem.id)}>Remove</button>
      </div>
    </div>
  );
}
