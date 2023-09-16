import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
//import { CartItem } from '../cart/cart-item'
import CheckoutItem from "./checkout-item";
import { getProducts } from "../../utils/api";
//import { clearCart } from "../../utils/localStorageCart";
import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardImage, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';

import "../cart/cart.css";


export default function Checkout() {
  const [products, setProducts] = useState([]);
  const { cartItems} = useContext(ShopContext);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      if (cartItems[product.id] > 0) {
        total += cartItems[product.id] * product.price;
      }
    });
    return total.toFixed(2);
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };


  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing/validation here
    console.log("Payment Information:", paymentInfo);
  };

  return (
    <MDBContainer className="my-5 py-5" style={{maxWidth: '1100px'}}>
      <div className="h1 fw-bolder text-center">Check Out</div>
      {!username && <div className="h2 text-center">Continue below to checkout as a guest or <Link>Login</Link></div>}
      <section>
        <MDBRow>
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <p className="text-uppercase h4 text-font">Delivery Country:</p>
                <MDBRow>
                  <MDBCol md="1">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Others/extended-example/usa2.webp"
                      className="rounded-circle me-2"
                      style={{ width: '35px' }}
                      alt="USA" />
                  </MDBCol>
                  <MDBCol md="8">
                    {/* PRO NEEDED */}
                    <select className="custom-select">
                      <option value="1">United States</option>
                      <option value="2">Spain</option>
                      <option value="3">Poland</option>
                      <option value="4">Italy</option>
                      <option value="5">Greece</option>
                      <option value="6">Germany</option>
                      <option value="7">United Kingdom</option>
                      <option value="8">Canada</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBAccordion className="card mb-4">
              <MDBAccordionItem collapseId={1} className="border-0" headerTitle='Promo/Student Code or Vouchers'>
                <MDBInput label='Enter code' type='text' />
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <p className="text-uppercase fw-bold mb-3 text-font">Email address</p>
                <MDBRow>
                  <MDBCol md="4">
                    <p>your-email@gmail.com</p>
                  </MDBCol>
                  <MDBCol md="7">
                    <MDBBtn outline color="dark" className="float-end button-color">Change</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4 position-statics">
          <MDBCard className="mb-4">
  <MDBCardHeader className="py-3">
    <MDBTypography tag="h5" className="mb-0 text-font">
      {calculateTotalQuantity()} item(s)
      <span className="float-end mt-1" style={{ fontSize: "13px" }}>
        Edit
      </span>
    </MDBTypography>
  </MDBCardHeader>

  {/* Map through cart items and render a Card component for each item */}
  <MDBCardBody>
    {Object.keys(cartItems).map((itemId) => (
      <CheckoutItem key={itemId} itemId={itemId} quantity={cartItems[itemId]} products={products}/>
    ))}
  </MDBCardBody>
  <MDBCardFooter className="mt-4">
    <MDBListGroup flush="true">
      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
        Subtotal
        <span>${calculateTotalPrice()}</span>
      </MDBListGroupItem>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
        Total to pay
        <span>${calculateTotalPrice()}</span>
      </MDBListGroupItem>
    </MDBListGroup>
  </MDBCardFooter>
</MDBCard>
          </MDBCol>

          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0 text-font text-uppercase">Delivery address</MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='First name' type='text' />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Last name' type='text' />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput label='Company name' type='text' className="mb-4" />
                  <MDBInput label='Address' type='text' className="mb-4" />
                  <MDBInput label='Email' type='text' className="mb-4" />
                  <MDBInput label='Phone' type='text' className="mb-4" />
                  <MDBTextArea label='Additional information' rows={4} className="mb-4" />

                  <div className="d-flex justify-content-center">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckChecked' label='Create an account?' defaultChecked />
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>

            <section>
        <h2>Payment Information</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentInfoChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardHolderName" className="form-label">
              Cardholder Name
            </label>
            <input
              type="text"
              className="form-control"
              id="cardHolderName"
              name="cardHolderName"
              value={paymentInfo.cardHolderName}
              onChange={handlePaymentInfoChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expirationDate" className="form-label">
              Expiration Date
            </label>
            <input
              type="text"
              className="form-control"
              id="expirationDate"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={handlePaymentInfoChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
              placeholder="123"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary text-center">
            Submit Payment
          </button>
        </form>
      </section>

           
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );

}
