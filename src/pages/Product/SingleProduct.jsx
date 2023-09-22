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
  MDBIcon,
} from "mdb-react-ui-kit";

export default function SingleProduct() {
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, deleteFromCart } =
    useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const cartItemAmount = cartItems[id];
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
         <MDBContainer fluid className="py-5">
         <MDBRow className="justify-content-center">
           <MDBCol md="6">
             <MDBCard className="text-black">
               <MDBIcon fab icon="apple" size="lg" className="px-3 pt-3 pb-2" />
               <MDBCardTitle><div className="text-center">{product.title}</div></MDBCardTitle>
               <MDBCardImage
                 src={product.image}
                 position="top"
                 alt={product.title}
               />
               <MDBCardBody>
                 <div className="text-center">
                   <MDBCardTitle>Description</MDBCardTitle>
                   <p className="text-muted text-left mb-4">{product.description}</p>
                 </div>
                 
                 <div className="d-flex justify-content-between total font-weight-bold mt-4">
                   <span>Price</span>
                   <span>${product.price}</span>
                 </div>
                 <div className="quantity-controls">
                 <button
                   className=" mb-2 d-flex justify-content-center addToCartBttn"
                   onClick={() => addToCart(id)}
                 >
                   Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
                 </button>
                 <button onClick={() => removeFromCart(product.id)}> - </button>
                 <input
                   value={cartItems[product.id]}
                   onChange={(e) =>
                     updateCartItemCount(Number(e.target.value), product.id)
                   }
                 />
                 <button onClick={() => addToCart(product.id)}> + </button>
               </div>
               <p>Total: ${product.price * product.id}</p>
               <div>{isItemInCart && (
           <button
             className="removeFromCartBttn d-flex justify-content-center"
             onClick={handleDeleteClick}
           >
             Remove From Cart
           </button>)}</div>
               </MDBCardBody>
             </MDBCard>
           </MDBCol>
         </MDBRow>
       </MDBContainer>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}

     
    </>
  );
}
