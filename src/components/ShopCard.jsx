import { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

// The ShopCard that is used in the shop areas
export default function ShopCard({ item, addItem }) {
  const [amount, setAmount] = useState(1);

  // Handle the manual change of numbers, but don't allow non numbers
  function handleChange(e) {
    // Allow empty for erasing and typing purposes
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  }

  // When the user leaves the input, make sure the value is valid (1-10)
  function handleBlur() {
    let inputNumber = amount;
    if (!amount || isNaN(inputNumber)) inputNumber = 1;
    inputNumber = Math.max(1, Math.min(10, inputNumber));
    setAmount(inputNumber);
  }

  // Handle amount when increased or decreased by 1 through buttons
  function handleAmount(operation) {
    if (operation === "add") {
      setAmount((prev) => Math.min(10, prev + 1));
    } else {
      setAmount((prev) => Math.max(1, prev - 1));
    }
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
            min="1"
            value={amount}
            onBlur={() => handleBlur()}
            onChange={(e) => handleChange(e)}
          />
          <button className="amountButton">
            <CircleArrowRight onClick={() => handleAmount("add")} />
          </button>
        </div>
      </div>
      <div className="itemButton">
        <button onClick={() => addItem({ id: item.id, amount: amount })}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
