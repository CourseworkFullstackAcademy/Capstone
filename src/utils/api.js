const BASE_URL = 'https://fakestoreapi.com'

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