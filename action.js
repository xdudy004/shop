// Select elements
const btnAddProduct = document.getElementById('first');
console.log(btnAddProduct);

const sectioCart = document.getElementsByClassName('cart-row');
console.log(sectioCart);

function addToCartList (){
    // add to purchase new item
    console.log('addToCartList')
}

// Add event to the Add to Cart button
btnAddProduct.addEventListener('click', addToCartList)