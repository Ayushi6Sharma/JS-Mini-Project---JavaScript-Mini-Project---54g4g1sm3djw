let section = document.getElementById("grid1");
let login=document.querySelector(".login");
let modal=document.getElementById("modal");
let main=document.getElementById("main");
let modalClear=document.querySelector(".btn-clear");
let submit=document.getElementById("submit");
let username=document.getElementById("name");
let searchbtn=document.querySelector(".searchbtn");
let inputsearch=document.querySelector(".inputsearch");
//______________global variable__________________

let personname="";
//__________________ Fetching Apis Data____________________________

class fetchingApis
{    async fetchApi()
    {   try
        { let res=await fetch("../data/data.json");
            let data=await res.json();
            let productData=data.map((el)=>
            {   const quantity=1;
                const rate=el.rating.rate;
                const peoplecount=el.rating.count;
                const {id,category,description,image,price,title}=el;
                return {id,category,description,image,price,title,rate,peoplecount,quantity};
            })
            return productData;
        }
        catch(e)
        {
            console.log(e);
        }
    }
}


// ____________create main page Products in HTML________

class createProduct
{
    async createProduct(productNewArray)
    {  
        productNewArray.forEach((el)=>
        {  
            section.innerHTML +=
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
    }
}

//____________create local storage______________________
 class Storage
 {
    static storeSingleProduct(clickedProduct)
    {   
        localStorage.setItem("singleProduct",JSON.stringify(clickedProduct));
    }
    static setName()
    {
        localStorage.setItem("name",'login');
    }
    static getName()
    {
        return JSON.parse(localStorage.getItem("name"));
    }
    static setApiData(newres)
    {   
        localStorage.setItem("apiData",JSON.stringify(newres));
    }
 }

//creating objects of class fetchingapis and call createProduct

let productElements=new createProduct();
let product=new fetchingApis();
product.fetchApi()
.then((newres)=>
{  Storage.setApiData(newres);
    productElements.createProduct(newres);
    infiniteScroll(newres);
    openSingleProduct(newres);
     // // input search
     searchbtn.addEventListener("click",()=>
     {   
         window.location="../html/searchProduct.html";
     })
})

//_______________infinite scrolling____________________ 

function infiniteScroll(newres)
{
    window.addEventListener('scroll',()=>{
        if(Math.ceil(window.scrollY+window.innerHeight) >= document.documentElement.scrollHeight)
         {   
                productElements.createProduct(newres);
                openSingleProduct(newres);
           
        }
    })
}


// on user click it will open that particular single card data

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





