import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import CheckoutItem from "./checkout-item";
import { getProducts } from "../../utils/api";
import { clearCart } from "../../utils/localStorageCart";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

import "./checkout.css";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useContext(ShopContext);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });
  const [ paymentSubmitted, setPaymentSubmitted] = useState(false);
//Below is for conditional rendering of login option
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

  //it says totalPlusTax must be a number, need to look into if calculateTotalPrice is a number
  // const totalPlusTax = (calculateTotalPrice) => {
  //   const taxRate = 0.075;
  //   const totalPlusTax = calculateTotalPrice * taxRate;
  //   return totalPlusTax
  // }

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    clearCart();
    console.log("Payment Information:", paymentInfo);
    // Reset the paymentInfo
  setPaymentInfo({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });
  // document.getElementById("firstName").value = "";
  // document.getElementById("lastName").value = "";
  // document.getElementById("companyName").value = "";
  // document.getElementById("address").value = "";
  // document.getElementById("email").value = "";
  // document.getElementById("phone").value = "";
  // document.getElementById("additionalInfo").value = "";

  setPaymentSubmitted(true);
  };

  return (
   <div> {paymentSubmitted ? (
      <div className="payment">
        <p>Thank You for your order! Your payment has been submitted successfully.</p>
        <div>
          <Link to="/">Continue Shopping</Link>
        </div>
      </div>
    ) : (
    <MDBContainer className=" py-5" style={{ maxWidth: "1100px" }}>
      <div className="h1 fw-bolder pb-4 text-center">Check Out</div>
      {!username && (
        <div className="h2 text-center">
          Continue below to checkout as a guest or{" "}
          <Link to="/login">Login</Link>
        </div>
      )} 
      <section>
        <MDBRow>
          <MDBCol md="8">
           

            <MDBAccordion className="card mb-4 ml-5">
              <MDBAccordionItem
                collapseId={1}
                className="border-0"
                headerTitle="Promo/Student Code or Vouchers"
              >
                <MDBInput label="Enter code" type="text" />
              </MDBAccordionItem>
            </MDBAccordion>

            
            <MDBCol md="12" className="mb-4 ml-5">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography
                  tag="h5"
                  className="mb-0 text-font text-uppercase"
                >
                  Delivery address
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label="First name" type="text" />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label="Last name" type="text" />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput label="Company name" type="text" className="mb-1 mt-2" />
                  <MDBInput label="Address" type="text" className="mb-1 mt-4" />
                  <MDBInput label="Email" type="text" className="mb-1 mt-4" />
                  <MDBInput label="Phone" type="text" className="mb-1 mt-4" />
                  <MDBTextArea
                    label="Additional information"
                    rows={4}
                    className="mb-1 mt-4"
                  />
                </form>
              </MDBCardBody>
            </MDBCard>

            <section className="card">
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
          </MDBCol>
          <MDBCol md="4" className="mb-4 position-statics">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0 text-font">
                  {calculateTotalQuantity()} item(s)
                  
                </MDBTypography>
              </MDBCardHeader>

              {/* Map through cart items and render a Card component for each item */}
              <MDBCardBody>
                {Object.keys(cartItems).map((itemId) => (
                  <CheckoutItem
                    key={itemId}
                    itemId={itemId}
                    quantity={cartItems[itemId]}
                    products={products}
                  />
                ))}
              </MDBCardBody>
              <MDBCardFooter className="mt-4">
                <MDBListGroup flush="true" >
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted px-2">
                    Subtotal
                    <span>${calculateTotalPrice()}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase px-2">
                    Total to pay
                    <span>${calculateTotalPrice()}</span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>

         
        </MDBRow>
      </section>
    </MDBContainer>
)}
</div>)
}