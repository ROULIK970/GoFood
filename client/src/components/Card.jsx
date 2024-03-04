import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = ({ foodItems }) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let priceOptions = Object.keys(foodItems.options[0]);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItems._id) {
        food = item;

        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: foodItems.img,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: foodItems.img,
    });

    // setBtnEnable(true)
  };
  let finalPrice = qty * parseInt(foodItems.options[0][size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <img
        src={foodItems.img}
        className="card-img-top"
        style={{ height: "120px", objectFit: "fill" }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{foodItems.name}</h5>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success"
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
