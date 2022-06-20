let cartSection=document.getElementById("cart-section");
let totalPrice=document.getElementById("total-price");
let buybtn=document.getElementById("buybtn");
let cartMain=document.querySelector(".cart-main");
let clearAll=document.getElementById("clear-all");
let nothingCart=document.getElementById("nothing-cart");
let cartCount=document.getElementById("cart-count");

let login=document.querySelector(".login");
let modal=document.getElementById("modal");
let main=document.getElementById("main");
let modalClear=document.querySelector(".btn-clear");
let submit=document.getElementById("submit");
let username=document.getElementById("name");
let searchbtn=document.querySelector(".searchbtn");
let inputsearch=document.querySelector(".inputsearch");

let setprice=0;
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

let cartProducts=Storage.getCartProduct();


//_______make html code for cart products__________

class createCartUi
{
    uiCartProducts(cartProducts)
    {   let producthtml="";
        cartProducts.forEach((el)=>
        {
            producthtml += 
            `<div class="cart-grid">
            <span class="clear-btn">
            <button type="button" class="btn-el-clear" data-id="${el.id}"><i class="fa fa-xmark fa-2x"></i></button>
            </span>
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
                <div class="quantity">
                    <button type="button" class="inc-dec btn-plus-quantity" data-id="${el.id}">
                        <i class="fa-solid fa-plus fa-2x"></i>
                    </button>
                    <span class="count" data-id=${el.id}>${el.quantity} </span>
                    <button type="button" class="inc-dec btn-minus-quantity" data-id="${el.id}">
                        <i class="fa-solid fa-minus fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>`
        })
        cartSection.innerHTML = producthtml;
    }
}
// ___________create instance of createCartUI_________

let createUi=new createCartUi();
createUi.uiCartProducts(cartProducts);

//_________check login text_____________________

function checkLogedIn()
{   
    if(localStorage.getItem("name"))
    {login.innerText=localStorage.getItem("name");}
}
checkLogedIn();

//____________get button elements________________
let cartItems=document.querySelectorAll(".cart-grid");
let count=document.querySelectorAll(".count");

// 
function checkCartEmpty(cartProducts)
{
    if(cartProducts.length==0)
    { 
        cartMain.innerHTML=`
        <div class="cartemoji">
            &#128717;&#65039;
        </div>
        <div id="nothing-cart">
        Nothing In Your Cart &#128522;.
        Please Select Some Products To Add In Cart
    </div>`;
    }
}
checkCartEmpty(cartProducts);

// ____________ total amount______________

function totalAmount(cartProducts)
{  let total=0;
    cartProducts.forEach((el)=>
    {   
       total += (el.quantity* el.price);
    })

    total=total.toFixed(2);
    totalPrice.innerText=total;
}
totalAmount(cartProducts);
//________________remove_______________


function removeCartitem(id)
{   
    let indx=cartProducts.findIndex((item)=>
    {
        if(item.id==id)
        {   
            return item;
        }
    })
    cartProducts.splice(indx,1);
    Storage.setCartProduct(cartProducts);
    totalAmount(cartProducts);
    checkCartEmpty(cartProducts);
}
//____________add quantity of products_________________
function addQuantity(e)
{  
    cartProducts.forEach((cartitem)=>
    {
        if(cartitem.id==e.target.parentNode.dataset.id)
        {   
            count.forEach((el)=>
            {   
                if(el.dataset.id==cartitem.id)
                {       
                    cartitem.quantity=cartitem.quantity+1;
                      
                        count.innerText=cartitem.quantity;
                        el.innerText=cartitem.quantity;
                }
            })
        }
    })
    Storage.setCartProduct(cartProducts);//change qusntity in local storage cart
}
//_________________minus quantity of products___________
function minusQuantity(e)
{
    cartProducts.forEach((cartitem)=>
    {
        if(cartitem.id==e.target.parentNode.dataset.id)
        {   
            count.forEach((el)=>
            {   
                if(el.dataset.id==cartitem.id)
                {       
                    if(cartitem.quantity==1)
                    {   let res=confirm("Do you want remove this item from cart");
                        if(res)
                        {
                        removeCartitem(e.target.parentNode.dataset.id);
                        checkCartEmpty(cartProducts);
                        }
                    }
                    else{
                        cartitem.quantity=cartitem.quantity-1;
                        count.innerText=cartitem.quantity;
                        el.innerText=cartitem.quantity;
                    }
                }
            })
        }
    })
    Storage.setCartProduct(cartProducts);//change qusntity in local storage cart
}


//____________add events to manipulate buttons__________
cartItems.forEach((item)=>
{
    item.addEventListener("click",(e)=>
    {   
        // remove
        if(e.target.parentNode.classList.contains("btn-el-clear"))
         {   
            let btnid=e.target.parentNode.dataset.id;
            removeCartitem(btnid);
            // createUi.uiCartProducts(cartProducts);
            (e.target.parentNode.parentNode.parentNode).remove();
        }
        // plus
        if(e.target.parentNode.classList.contains("btn-plus-quantity"))
        {
            addQuantity(e);
            totalAmount(cartProducts);
        }
        // minus
        if(e.target.parentNode.classList.contains("btn-minus-quantity"))
        {
            minusQuantity(e);
            totalAmount(cartProducts);
        }
    })
})

//________________ buy button___________________

buybtn.addEventListener("click",()=>
{   let name=localStorage.getItem("name");
    // name=JSON.parse(name);
    if(name)
    {
    window.location="../html/buy.html";
    }
    else
    {
        modal.style.display="block";
    main.style.filter="blur(8px)";
    }
    // Storage.setCartProduct([]);
    // cartProducts=[];
})

// ________________clear button________________

clearAll.addEventListener("click",()=>
{   
    cartProducts=[];
    Storage.setCartProduct([]);
    // createUi.uiCartProducts(cartProducts);
    // totalAmount(cartProducts);
    checkCartEmpty(cartProducts);
})

//___________________modals__________________________
// login event listener
login.addEventListener("click",()=>
{
    modal.style.display="block";
    main.style.filter="blur(8px)";
})
modalClear.addEventListener("click",()=>
{
    modal.style.display="none";
    main.style.filter="none";
})
submit.addEventListener("click",(e)=>
{
    personname=username.value;
   localStorage.setItem("name",personname);
})

