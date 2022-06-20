let section = document.getElementById("grid1");
let login=document.querySelector(".login");
let modal=document.getElementById("modal");
let main=document.getElementById("main");
let modalClear=document.querySelector(".btn-clear");
let submit=document.getElementById("submit");
let username=document.getElementById("name");
let searchbtn=document.querySelector(".searchbtn");
let inputsearch=document.querySelector(".inputsearch");

class createProduct
{
     createProduct(productNewArray)
    {  
        let producthtml="";
        productNewArray.forEach((el)=>
        {  
           producthtml +=
        `<div class="productcard">
            <div class="image">
                <img src="${el.image}" class="products-image" data-val=${el.id}>
            </div>
            <div class="product-details">
                <div class="product-title">
                    ${el.title}
                </div>
                <div class="product-rating">
                    <span class="rate"> ${el.rate} </span>
                    <span><i class="fa fa-star"></i></span>
                    <span class="peoplecount">| ${el.peoplecount}</span>
                </div>
                <div class="product-price">
                    Rs ${el.price}
                </div>
            </div>
        </div>`

        })
        section.innerHTML=producthtml;
    }
}
// storage class
class Storage
{
    static storeSingleProduct(clickedProduct)
    {   
        localStorage.setItem("singleProduct",JSON.stringify(clickedProduct));
    }
    static getApiData()
    {
        return JSON.parse(localStorage.getItem("apiData"));
    }
}

let apidata=Storage.getApiData();

// create instances of createProduct class
let productElements=new createProduct();
productElements.createProduct(apidata);

//_________________search btn________________________
searchbtn.addEventListener("click",()=>
{
    let value=inputsearch.value;
    if(value=="")
    { return; }
    let data=apidata.filter((item)=>
    {
        if(item.category==value.toLowerCase())
        {
            return {item};
        }
    })
    if(data.length!=0)
    {
    productElements.createProduct(data);
    openSingleProduct(data);
    }
    else
    {
            productElements.createProduct(apidata);
            openSingleProduct(apidata);

    }
})
//________open single product when clicked_______________

function openSingleProduct(newres)
{  
    let img=document.querySelectorAll("[data-val]");
    for(let i=0;i<img.length;i++)
    {   
        img[i].addEventListener("click",openProduct);
    }
    function openProduct(e)
      {
        let productdata=newres.find((el)=>
        {
            if(el.id==e.target.dataset.val)
            {   
                return el;
            }
        })
        window.location="../html/showSingleProduct.html";
        Storage.storeSingleProduct(productdata);
    }
}
openSingleProduct(apidata);

//_________check login text_____________________

function checkLogedIn()
{   
    if(localStorage.getItem("name"))
    {login.innerText=localStorage.getItem("name");}
}
checkLogedIn();

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