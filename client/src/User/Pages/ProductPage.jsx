import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext/context";
import { toast } from "react-toastify";
export default function ProductPage() {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { cart_state, cart_dispatch } = useContext(CartContext);
  const isItemInCart = cart_state?.cart?.map((item) => item._id).includes(_id);
  console.log(isItemInCart);

  useEffect(() => {
    console.log(cart_state);
    axios
      .get(`http://localhost:1234/api/get-product-by-id/${_id}`)
      .then((json) => setProduct(json.data.products))
      .catch((err) => console.log(err));
  }, []);

  const addtocart = () => {
    const payload = { ...product, quantity };
    toast.success("successfully added to cart ", {
      position: "bottom-right",
      autoClose: 3000, // Auto close the notification after 3 seconds
    });
    cart_dispatch({
      type: "ADD_TO_CART",
      payload,
    });
  };

  const removeFromCart = () => {
    toast.success("successfully removed from cart ", {
      position: "bottom-right",
      autoClose: 3000, // Auto close the notification after 3 seconds
    });
    cart_dispatch({
      type: "REMOVE_FROM_CART",
      payload: _id,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={product.thumbnail} alt="" srcSet="" className="img-fluid" />
        </div>
        <div className="col-md-6 py-5">
          <h2>
            {product.productName} - {product.price}
          </h2>
          <small className="text-secondary">{product.description}</small>
          <div className="row my-5">
            {product?.images.map((val, key) => (
              <div
                key={key}
                className="col-md-4 border border-dark rounded mx-1"
              >
                <img src={val} className="img-fluid" />
              </div>
            ))}
          </div>

          {isItemInCart ? (
            <div className="d-block mt-3">
              <button className="w-100 btn btn-dark" onClick={removeFromCart}>
                Remove From Cart
              </button>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-around align-items-center bg-light py-4 rounded border border-secondary">
                <button
                  className="btn btn-dark"
                  disabled={quantity <= 1 ? true : false}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                {quantity}
                <button
                  className="btn btn-dark"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="d-block mt-3">
                <button className="w-100 btn btn-dark" onClick={addtocart}>
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
