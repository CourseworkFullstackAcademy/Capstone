// import { useEffect, useState } from "react";
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ProductSearch() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState(data);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();

//         if (!response.ok) {
//           console.error("Error: ", data);
//           return;
//         }
//         setProducts(data);
//       } catch (error) {
//         console.error("error fetching data: ", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSearchInputChange = (event) => {
//     setSearch(event.target.value);
//     console.log("products: ", products);
//   };

//   //original try
//     const filteredProducts = products.filter((product) =>
//       product.title.toLowerCase() === (search.toLowerCase())
//     );

// //Try to see if not using ternary, but getting rid of toLowerCase fixes error. But, error is still "Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')"
//     // const filteredProducts = products.filter((product) =>
//     //   product.name.toLowerCase() === (searchQuery.toLowerCase())
//     // );

//   //below, ternary ignore state of undefined before user types in searchbar
// //   const filteredProducts = searchQuery
// //     ? products.filter(
// //         (product) => product.name.toLowerCase() === searchQuery.toLowerCase()
// //       )
// //     : products;

// //Below, trying to see if getting rid of toLowerCase fixes console error, but now it says product.name is not a function
// 	// const filteredProducts = searchQuery
//     // ? products.filter(
//     //     (product) => product.name() === searchQuery()
//     //   )
//     // : products;

//   return (
//     <div>
   
//    <Form>
//           <InputGroup className='my-3'>

//             {/* onChange for search */}
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search contacts'
//             />
//           </InputGroup>
//         </Form>
//     </div>
//   );
// }

// export default ProductSearch;
