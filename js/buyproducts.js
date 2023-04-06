// Initialize global variables
let cart = [];
let total = 0;

// Function to add a product to the cart
function addToCart(id) {
  // Get the product details
  const productBox = document.querySelectorAll(".product-box")[id-1];
  const productImage = productBox.querySelector(".product-image").src;
  const productName = productBox.querySelector(".product-name").textContent;
  const productPrice = parseFloat(productBox.querySelector(".product-price").textContent.slice(1));
  const productQuantity = parseInt(productBox.querySelector(".quantity-select").value);


  // Add the product to the cart array
  const product = {
    id: id,
    name: productName,
    image: productImage,
    price: productPrice,
    quantity: productQuantity
  }
  cart.push(product);

  // Update the selected products list and total price
  updateSelectedProducts();
}

// Function to update the selected products list and total price
function updateSelectedProducts() {
  // Get the selected products list element
  const selectedList = document.querySelector(".selected-list");

  // Clear the selected products list
  selectedList.innerHTML = "";

  // Loop through the products in the cart array
  for (let i = 0; i < cart.length; i++) {
    // Create a new list item element for the product
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-item");

    // Add the product name and quantity to the list item
    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.textContent = cart[i].name;
    const itemQuantity = document.createElement("div");
    itemQuantity.classList.add("item-quantity");
    itemQuantity.textContent = "Quantity: " + cart[i].quantity;
    selectedItem.appendChild(itemName);
    selectedItem.appendChild(itemQuantity);

    // Add the product price to the list item
    const itemPrice = document.createElement("div");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = "$" + (cart[i].price * cart[i].quantity).toFixed(2);
    selectedItem.appendChild(itemPrice);

    // Add a button to remove the product from the cart
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-id", cart[i].id);
    removeButton.addEventListener("click", function() {
      removeFromCart(this.getAttribute("data-id"));
    });
    selectedItem.appendChild(removeButton);

    // Add the list item to the selected products list
    selectedList.appendChild(selectedItem);

    // Update the total price
    total += cart[i].price * cart[i].quantity;
  }

  // Update the total price element
  const totalElement = document.querySelector(".total-price");
  totalElement.textContent = "Total: $" + total.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(id) {
  // Loop through the products in the cart array
  for (let i = 0; i < cart.length; i++) {
    // If the product ID matches, remove it from the cart array
    if (cart[i].id == id) {
      cart.splice(i, 1);
      break;
    }
  }

  // Reset the total price and update the selected products list
  total = 0;
  updateSelectedProducts();
}

// Function to clear the cart and selected products
function clearCart() {
    // Reset the cart array and total price, and update the selected products list
    cart = [];
    total = 0;
    updateSelectedProducts();
  }
  
  // Function to place the order
  function placeOrder() {
    // Get the name and contact fields
    const nameField = document.querySelector("#name-field");
    const contactField = document.querySelector("#contact-field");
  
    // Save the order details to local storage
    console.log(cart);
    if(cart){
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalPrice', total.toFixed(2))
    }

    window.location.href = 'checkout.html';
  
    // Show a confirmation message and clear the cart
    alert("Thank you for your order! Your total is $" + order.total);
    clearCart();
  }
  
  // Add event listeners to the buttons
  const addButton1 = document.querySelector("#add-button-1");
  addButton1.addEventListener("click", function() {
    addToCart(1);
  });
  const addButton2 = document.querySelector("#add-button-2");
  addButton2.addEventListener("click", function() {
    addToCart(2);
  });
  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearCart);
  const orderButton = document.querySelector("#order-button");
  orderButton.addEventListener("click", placeOrder);
  