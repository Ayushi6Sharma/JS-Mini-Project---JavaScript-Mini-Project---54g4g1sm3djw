let ProductSection=document.getElementById("productSection");
let cartbutton=document.getElementById("cartbtn");
let login=document.querySelector(".login");
let modal=document.getElementById("modal");
let main=document.getElementById("main");
let modalClear=document.querySelector(".btn-clear");
let submit=document.getElementById("submit");
let username=document.getElementById("name");
let searchbtn=document.querySelector(".searchbtn");
let inputsearch=document.querySelector(".inputsearch");
//_________________declaring global variables______________________


// ______________create storage class to get single product____________
class Storage
{
   static  getSingleProduct()
    {
        let product=localStorage.getItem('singleProduct');
        product=JSON.parse(product);
        return product;
    }
    static setCartProduct(product)
    {
        localStorage.setItem("cart",JSON.stringify(product));
    }
    static getCartProduct()
    {
        return JSON.parse(localStorage.getItem("cart"));
    }
}
//__create single card product on click of any element____

class createSingleProduct
{
    singleProduct(cardproduct)
    {   
        ProductSection.innerHTML = 
        `<div class="single-image">
        <img src="${cardproduct.image}" class="single-Product-img">
    </div>
    <div class="single-Card-Details">
        <div class="single-Product-Details">
           ${cardproduct.description}
           
        </div>
        <div class="single-product-title">
            ${cardproduct.title}
        </div>
        <div class="single-product-rating">
            <span class="single-rate"> ${cardproduct.rate} </span>
            <span><i class="fa fa-star"></i></span>
            <span class="single-peoplecount">| ${cardproduct.peoplecount}</span>
        </div>
        <div class="single-product-price">
            Rs ${cardproduct.price}
        </div>
    </div>`
    }
}
//  ____call storage function______________
let product=Storage.getSingleProduct();

//______create instance of createSingleProduct class____

let singleproductobj=new createSingleProduct();
singleproductobj.singleProduct(product);

//_________check login text_____________________

function checkLogedIn()
{   
    if(localStorage.getItem("name"))
    {login.innerText=localStorage.getItem("name");}
}
checkLogedIn();
//__________add item to cart___________________
function addToCartStorage()
{
    let product=Storage.getSingleProduct();
    if(Storage.getCartProduct()) // check if cart key exist
    {
        let storagecart=Storage.getCartProduct();
        let value=true;
        // check every duplicate element of cart storage during insert new product
        storagecart.forEach((el)=>{
            if(el.id==product.id)
            {
                value=false;
            }
        })
        if(value)  //if doesn't contain duplicate element
        {      
             storagecart.push(product);
            Storage.setCartProduct(storagecart);
        }
       
    }
    else //if cart key doesnt exist then make cart key
    {       
        localStorage.setItem("cart",JSON.stringify([product]));
    }
}

// on click ADDToCART button it will store that particular
// product data in local storage and will not store duplicate data


cartbutton.addEventListener("click",addToCart)
function addToCart()
{
    addToCartStorage();
    window.location="../html/cart.html";   
}

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
    e.preventDefault;
    personname=username.value;
   localStorage.setItem("name",personname);
})





