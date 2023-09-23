import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
//getProductById not working, look into later
//import { getProductById } from "../../utils/api";
import "./productdetails.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";

export default function SingleProduct() {
  const { id } = useParams();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    deleteFromCart,
  } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  //const cartItemAmount = cartItems[id];
  const isItemInCart = id in cartItems;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          setError("Failed to fetch product");
          return;
        }
        const productData = await response.json();

        if (!productData || Object.keys(productData).length === 0) {
          setError("Product data is empty or invalid");
          return;
        }
        setProduct(productData);
      } catch (error) {
        setError(`Error fetching product: ${error.message}`);
      }
    }

    fetchProduct();
  }, [id, setProduct]);
  if (!product) return null;

  const handleDeleteClick = () => {
    deleteFromCart(id);
  };

  return (
    <>
      {product ? (
        <MDBContainer fluid className="py-5  d-flex flex-column justify-content-center align-items-center">
          <MDBCol className="d-flex flex-column justify-content-center align-items-center">
            <MDBCard className="d-flex flex-column justify-content-center align-items-center">
              <MDBRow className="justify-content-center">
                <MDBCardTitle>
                  <div className="text-center title">{product.title}</div>
                </MDBCardTitle>
              </MDBRow>
              <MDBRow className="">
                <div className="text-center pb-4 price">
                  <>Price:</>{' '}{' '}
                  <>${product.price}</>
                </div>
              </MDBRow>

              <MDBCardImage
                src={product.image}
                position="top"
                alt={product.title}
                className="img-fluid w-60 h-auto"
              />
              <MDBCardBody>
                <div className="pt-3 quantity-controls">
                  <button onClick={() => removeFromCart(product.id)} className=" px-2 font-weight-bold">-</button>
                  <input
                    value={cartItems[product.id]}
                    onChange={(e) =>
                      updateCartItemCount(Number(e.target.value), product.id)
                    }
                    style={{ width: '10%', marginLeft:'.3rem', marginRight:'.3rem', textAlign:'center'}}
                  />
                  <button onClick={() => addToCart(product.id)} className=" px-2 font-weight-bold"> + </button>
                </div >
                <p className="mr-5  font-weight-bold">Total: ${product.price * product.id}</p>
                <div>
                  {isItemInCart && (
                    <button
                      className="removeFromCartBttn d-flex justify-content-right"
                      onClick={handleDeleteClick}
                    >
                      Remove From Cart
                    </button>
                  )}
                 
                </div>
              </MDBCardBody>
              <div className="text-center">
                    <MDBCardTitle>Description</MDBCardTitle>
                    <p className="text-muted text-left mb-4">
                      {product.description}
                    </p>
                  </div>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      ) : (
        <p className="text-center fw-600">Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
}
