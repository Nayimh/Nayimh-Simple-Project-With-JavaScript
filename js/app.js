// load api
const loadProducts = () => {
 // fetch section
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
// call function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <h4>Category: ${product.category}</h4>
      <h4>Price: $ ${product.price}</h4>
      <h5>Average Rate:  ${product.rating.rate}</h5>
      <h5>Number of peoples rated :  ${product.rating.count}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// product count section
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  // update total price
  updateTotal();
};
// input section
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // const converted = parseInt(element);
  const converted = parseFloat(element);
  
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  
  // fixed bug (exact number)
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);

};

// set innerText function
const setInnerText = (id, value) => {
  // get exact number
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// updateTotal();
const updateTotal = () => {
  const grandTotal =
    
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
   
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
  
};


