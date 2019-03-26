'use strict';

const removeCartItemButtons = document.getElementsByClassName('btn-danger');

 
for (var i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener('click', function(event) {
       const buttonCLicked = event.target;
       buttonCLicked.parentElement.parentElement.remove();
       updateCartTotal();
    })
}

function updateCartTotal() {
    
}
