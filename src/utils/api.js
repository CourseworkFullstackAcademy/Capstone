const BASE_URL = 'https://fakestoreapi.com'

//PRODUCT FETCHES::
//Get ALL Products
export const getProducts = async () => {
	const response = await fetch(`${BASE_URL}/products`);
	const data = await response.json();
	return data;
  };

//Get SINGLE Product by ID
  export const getProductById = async (productId) => {
	const response = await fetch(`${BASE_URL}/products/${productId}`);
	const data = await response.json();
	return data;
  };

  //Limit results to variable
  export const limitResults = async (number) => {
	try {
		const response = await fetch(`${BASE_URL}/products?limit=${number}`);
		const data = await response.json();
		console.log(data);
		return data;
  } catch (error) {
    console.error('Error fetching limited results:', error);
  }
};

//Sort results by price
export const sortPriceResults = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products`);
		const data = await response.json();
		const sortedProductsByPrice = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		console.log(sortedProductsByPrice);
		return sortedProductsByPrice;
		} catch (error) {
		console.log('Error fetching data: ', error);
	}
}

//Get ALL CATEGORIES
export const getCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products/categories`);
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log('Error fetching categories: '. error);
	}
}

//Get products in a Specific category.  Need to add use limit(Number) and sort(asc|desc) as a query string to get your ideal results
export const getItemsInCategories = async (category) => {
	try {
		const response = await fetch(`${BASE_URL}/products/category/${category}`);
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error fetching items in ${category}: `. error);
	}
}

//Add NEW PRODUCT. nothing in real will insert into the database. so if you want to access the new id you will get a 404 error.
export const addNewProduct = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products`,{
			method:"POST",
			body:JSON.stringify(
				{
					title:"title",
					price: "price",
					description: 'description',
					image: 'imgUrl',
					category: "category",
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error adding product: `. error);
	}
}

//UPDATE a product
export const updateProduct = async (productId) => {
	try {
		const response = await fetch(`${BASE_URL}/products/${productId}`,{
			method:"PUT",
			body:JSON.stringify(
				{
					title:"title",
					price: "price",
					description: 'description',
					image: 'imgUrl',
					category: "category",
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error updating product: `. error);
	}
}

//DELETE product
export const deleteProduct = async (productId) => {
	try {
		const response = await fetch(`${BASE_URL}/products/${productId}`,{
			method:"DELETE",
			body:JSON.stringify(
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error deleting product: `. error);
	}
}

//CART FETCHES::
//GET ALL carts
export const getCarts = async () => {
	const response = await fetch(`${BASE_URL}/carts`);
	const data = await response.json();
	return data;
  };

  //GET single cart by cart ID
  export const getSingleCart = async (cartId) => {
	const response = await fetch(`${BASE_URL}/carts/${cartId}`);
	const data = await response.json();
	return data;
  };

  //GET all carts for a single user
  export const getUserCarts = async (userId) => {
	const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
	const data = await response.json();
	return data;
  };

  //ADD a new product to a cart
  export const addToCart = async () => {
	try {
		const response = await fetch(`${BASE_URL}/carts`,{
			method:"POST",
			body:JSON.stringify(
				{
					userdD:"userId",
					date: "date",
					products:"products"
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error adding products to cart: `. error);
	}
}

//Update a product in the cart
export const updateCart = async cartId => {
	try {
		const response = await fetch(`${BASE_URL}/carts/${cartId}`,{
			method:"PUT",
			body:JSON.stringify(
				{
					userdD:"userId",
					date: "date",
					products:"products"
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error updating item in cart: `. error);
	}
}

//DELETE a cart
export const deleteProductCart = async cartId => {
	try {
		const response = await fetch(`${BASE_URL}/carts/${cartId}`,{
			method:"DELETE",
			body:JSON.stringify(
				{
					userdD:"userId",
					date: "date",
					products:"products"
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error deleting cart: `. error);
	}
}

//USER FETCHES
//GET ALL users
export const getUsers = async () => {
	const response = await fetch(`${BASE_URL}/users`);
	const data = await response.json();
	return data;
  };

  //GET SINGLE user
  export const getSingleUser = async (userId) => {
	const response = await fetch(`${BASE_URL}/users/${userId}`);
	const data = await response.json();
	return data;
  };

  //ADD new user
  export const addUser = async () => {
	try {
		const response = await fetch(`${BASE_URL}/users`,{
			method:"POST",
			body:JSON.stringify(
				{
					email:'email',
                    username:'userId',
                    password:'',
                    name:{
                        firstname:'firstname',
                        lastname:'lastname'
                    },
                    address:{
                        city:'city',
                        street:'street',
                        number: '#',
                        zipcode:'zipcode',
                        geolocation:{
                            lat:'lat',
                            long:'long'
                        }
                    },
                    phone:'phone'
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error adding new user: `. error);
	}
}

//UPDATE user
export const updateUser = async userId => {
	try {
		const response = await fetch(`${BASE_URL}/users/${userId}`,{
			method:"PUT",
			body:JSON.stringify(
				{
					email:'email',
                    username:'userId',
                    password:'',
                    name:{
                        firstname:'firstname',
                        lastname:'lastname'
                    },
                    address:{
                        city:'city',
                        street:'street',
                        number: '#',
                        zipcode:'zipcode',
                        geolocation:{
                            lat:'lat',
                            long:'long'
                        }
                    },
                    phone:'phone'
                }
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error updating user: `. error);
	}
}

//DELETE a user
export const deleteUser = async userId => {
	try {
		const response = await fetch(`${BASE_URL}/users/${userId}`,{
			method:"DELETE",
			body:JSON.stringify(
				
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error deleting user: `. error);
	}
}

//LOGIN FETCH
export const loginUser = async (username, password) => {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`,{
			method:"POST",
			headers: {
				'Content-Type': 'application/json', 
			},
			body:JSON.stringify(
				{
					username: username,
                    password: password,                   
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error loggin in: `. error);
	}
}