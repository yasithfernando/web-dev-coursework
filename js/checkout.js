/**----------------- Handle Order Details --------------------- */
const referenceNumber = document.getElementById('reference-number');
const description = document.getElementById('description');
const totalPrice = document.getElementById('total-price');
const itemList = document.getElementById('item-cards');
const total = document.getElementById('total-label');

let cart;

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);

    referenceNumber.textContent = Math.floor(Math.random() * 100000);
    let desc = `You have ${cart.length} items in your cart`;
    
    description.textContent = desc;

    totalPrice.textContent = `USD ${localStorage.getItem('totalPrice')}`
}

//show product list
let listItem;
cart.forEach(product => {
    listItemContent = `<div class="item-name">${product.name}</div>
                <div class="item-quantity">Quantity: ${product.quantity}</div>
                <div class="item-price"> $${product.price}</div>
                <button class="rmv-btn">REMOVE</button> `
    listItem = document.createElement("li")
    listItem.innerHTML = listItemContent
    itemList.appendChild(listItem);
    
});

total.textContent = `$${localStorage.getItem('totalPrice')}`;

/**-------------------------------------- */

/**----------------- Validate Payment Details----------------------- */
let cardNumberField = document.getElementById('card-number');
let cardNameField = docuemnt.getElementById('card-holder-name');
let expiryMonthField = document.getElementById('expiry-month');
let expiryYearField = document.getElementById('expiry-year')
let cvvField = document.getElementById('cvv');

function validatePayment(){
  const cardNumber = cardNumberField.val();
  const cardName = cardNameField.val();
  const expiryMonth = expiryMonthField.val();
  const expiryYear = expiryYearField.val();
  const cvv = cvvField.val();

  if(cardNumber && cardName && expiryMonth && expiryYear && cvv){
    if(validatePaymentDetails(cardNumber,cardName,expiryMonth,expiryYear, cvv)){
      return true;
    }
    else{
      return false;
    }
  }
  return false;
}


function validatePaymentDetails(cardNumber, cardName, expiryMonth, expiryYear, cvv) {
  // Regex for card number validation
  var cardNumberRegex = /^\d{13,19}$/;

  // Regex for card name validation
  var cardNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  // Regex for expiry month validation
  var expiryMonthRegex = /^(0?[1-9]|1[0-2])$/;

  // Regex for expiry year validation
  var expiryYearRegex = /^(20)\d{2}$/;

  // Regex for CVV validation
  var cvvRegex = /^[0-9]{3,4}$/;

  if (!cardNumberRegex.test(cardNumber)) {
    console.log("Invalid ard number")
    return false;
  }

  if (!cardNameRegex.test(cardName)) {
    console.log("Invalid card name");
    return false; 
  }

  if (!expiryMonthRegex.test(expiryMonth)) {
    console.log("Invalid expiry month");
    return false;
  }

  if (!expiryYearRegex.test(expiryYear)) {
    console.log("Invalid expiry year");
    return false;
  }

  if (!cvvRegex.test(cvv)) {
    console.log("Invalid CVV");
    return false;
  }

  return true;
}


/**------------------------------------------------------------------- */

/**----------------- Handle Collapse Section --Start -------------------*/

const editButton = document.querySelectorAll('.edit-button');
const editAddress = document.querySelector('.edit-address');
const editButtonText = document.querySelectorAll('.edit-button-text')

const editContact = document.querySelector('.edit-contact');


editButton[0].addEventListener('click', function() {
  editAddress.classList.toggle('active');
  
  if(editAddress.classList.contains('active')){
    editButton[0].classList.toggle('collapsed');
    editButtonText[0].textContent = 'Close'
  }
  else{
    editButton[0].classList.toggle('collapsed');
    editButtonText[0].textContent = 'Edit'
    //editButton.textContent = "Edit";
  }

});

editButton[1].addEventListener('click', function() {
    editContact.classList.toggle('active');
    
    if(editAddress.classList.contains('active')){
      editButton[1].classList.toggle('collapsed');
      editButtonText[1].textContent = 'Close'
    }
    else{
      editButton[1].classList.toggle('collapsed');
      editButtonText[1].textContent = 'Edit'
      //editButton.textContent = "Edit";
    }
  
  });


/**------------- Handle Collapse Section --End -----------------*/



