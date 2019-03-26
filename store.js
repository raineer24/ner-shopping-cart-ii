'use strict';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    const removeCartItemButtons = document.getElementsByClassName('btn-danger');

 
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem); 
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener('change', quantityChanged); 
    }

    const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked); 
    }
}

function removeCartItem(event) {
    const buttonCLicked = event.target;
        buttonCLicked.parentElement.parentElement.remove();
        updateCartTotal();
}
function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    };
    updateCartTotal();
}

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title, price, imgSrc);
    addItemToCart(title, price, imgSrc);
}

function addItemToCart(title, price, imgSrc) {
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-title" src="Images/Shirt.png" width="100" height="100">
            <span class="cart-item-title">T-shirt</span>
        </div>
        <span class="cart-price cart-column">$9.99</span>
        <div class="cart-quantity cart-column">
            <input type="number" class="cart-quantity-input" value="2">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>  
        `;
       cartRow.innerHTML = cartRowContents; 
    cartItems.append(cartRow);
}



function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];   
        const priceElement = cartRow.getElementsByClassName('cart-price')[0];
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total += (price * quantity);
   };
   total = Math.round(total * 100) / 100;
   document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
}
