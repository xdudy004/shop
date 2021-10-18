// Select elements
const productsEl = document.querySelector(".productItems");
const cartItemsEl = document.querySelector(".cart-items");
const totalEl = document.querySelector(".cart-total-title");


// Render finction
function renderProducts(){
    products.forEach( (product)=> {
        productsEl.innerHTML += `
            <div class="productItem col my-2">
                <div class="card">
                    <img src="${product.imgSrc}" class="card-img-top" alt="Product Image">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-price">${product.price}$</p>
                        <a href="#" id="first" class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
    })
}
renderProducts()



//cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();


//add to cart
function addToCart(id){

    if(cart.some((item) => item.id === id )){
        changeNumberOfUnits("plus", id);
    }
    else{
        const item = products.find((product) => product.id === id);
        console.log(item);

        // Add new properties number of units
        cart.push({
            ...item,
            numberOfUnits: 1
        });
        // console.log(cart);
    }

    updateCart()
    
}

function updateCart(){
    renderCartItems();
    renderSubtotal();

    // Save cart to Local storage
    localStorage.setItem("cart", JSON.stringify(cart));
}


//calculate total
function renderSubtotal(){

    let totalPrice = 0
    let totalItems = 0
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;

    });
    
    totalEl.innerHTML = `Total (${totalItems} items): ${totalPrice.toFixed(2)}$`
    
}

//render cart items
function renderCartItems(){

    // For clear cart items before adding anything
    cartItemsEl.innerHTML = ""
    cart.forEach((item)=> {
        cartItemsEl.innerHTML +=`
            <div class="cart-row row>
                <div class="cart-item col-4 cart-column">
                    <div class="cart-item col-2 cart-column">
                        <img src="${item.imgSrc}" class="cart-item-image">
                    </div>
                    <div class="cart-item-title col-3">${item.name}</div>
                    <span class="cart-price col-2 cart-column">${item.price*item.numberOfUnits}$</span>
                    <div class="cart-quantity col-3 cart-column">
                        <div class="cart-quantity-input btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                        <div class="d-inline number">${item.numberOfUnits}</div>
                        <div class="cart-quantity-input btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                        <button class="btn btn-outline-danger" type="button" onclick="removeCartItem(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg></button>           
                    </div>
                </div>
            </div>
        `
    })
}


//Remove item from cart
function removeCartItem(id){
    cart = cart.filter( (item) => item.id !== id);
    updateCart();
}


//Functin for change number of items
function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let oldNumberOfUnits = item.numberOfUnits

        if(item.id === id){
            if(action === "minus" && oldNumberOfUnits > 1){
                oldNumberOfUnits--;
            }
            else if(action === "plus"){
                oldNumberOfUnits++;
            }
        }

        // return object where are if old number is changed it will change if not - not change
        return{
            ...item,
            numberOfUnits: oldNumberOfUnits,
        }

    });

    updateCart();
}


