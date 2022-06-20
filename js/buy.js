let buySection=document.getElementById("buy-section");
let totalPrice=document.getElementById("total-price");

//_____local storage class to get cart products________
class Storage
{
    static getCartProduct()
    {
        return JSON.parse(localStorage.getItem("cart"));
    }
    static setCartProduct(product)
    {
        localStorage.setItem("cart",JSON.stringify(product));
    }
}

let buyProducts=Storage.getCartProduct();

//_______make html code for buy products__________

class createCartUi
{
    uiCartProducts(buyProducts)
    {   let producthtml="";
        buyProducts.forEach((el)=>
        {
            producthtml += 
            `<div class="cart-grid">
            <div class="image-wrapper">
                <img src="${el.image}" class="cart-image">
            </div>
            <div class="cart-product-details">
                <div class="cart-title">
                ${el.title}  
                </div>
                <div class="cart-price">
                ${el.price}
                </div>
                <div class="quantity">Quantity
                    <span class="count" data-id=${el.id}>${el.quantity} </span>
                </div>
            </div>
        </div>`
        })
        buySection.innerHTML = producthtml;
    }
}

let ui= new createCartUi();
ui.uiCartProducts(buyProducts);

//___________________total amount_________________
function totalAmount(buyProducts)
{  let total=0;
    buyProducts.forEach((el)=>
    {   
       total += (el.quantity* el.price);
    })

    total=total.toFixed(2);
    totalPrice.innerText=total;
    Storage.setCartProduct([]);
}
totalAmount(buyProducts);