import { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the order here
    console.log("Order submitted:", formData);

    // You can perform further actions like sending the order to a server

    // Optionally, you can navigate to a confirmation page
    // history.push("/confirmation");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}




// import { useState } from "react";

// const [firstname, setFirstname] = useState("");
// const [lastname, setLastname] = useState("");
// const [city, setCity] = useState("");
// const [street, setStreet] = useState("");
// const [zipcode, setZipcode] = useState("");
// const [phone, setPhone] = useState("");




// <div>
//           <label htmlFor="firstname">First Name:</label>
//           <input
//             type="text"
//             id="firstname"
//             value={firstname}
//             onChange={(event) => setFirstname(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="lastname">Last Name:</label>
//           <input
//             type="text"
//             id="lastname"
//             value={lastname}
//             onChange={(event) => setLastname(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="city">City:</label>
//           <input
//             type="text"
//             id="city"
//             value={city}
//             onChange={(event) => setCity(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="street">Street:</label>
//           <input
//             type="text"
//             id="street"
//             value={street}
//             onChange={(event) => setStreet(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="zipcode">ZIP Code:</label>
//           <input
//             type="text"
//             id="zipcode"
//             value={zipcode}
//             onChange={(event) => setZipcode(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="phone">Phone:</label>
//           <input
//             type="text"
//             id="phone"
//             value={phone}
//             onChange={(event) => setPhone(event.target.value)}
//             required
//           />
//         </div>