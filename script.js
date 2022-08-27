

$.get('https://where-is-my-book-services.onrender.com/api/products/product/all',function(data,status){
    console.log(data.allProducts);
    searchBar(data.allProducts);
    allBookSection(data.allProducts)
})

$(".hero-banner").slick({
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    
  }); 

 

document.querySelector('body').addEventListener('click',function(e){
    if(e.target.classList[0]!='suggested_item'&&e.target.classList[0]!='search-field'&&e.target.classList[0]!='search-icon'){
        document.querySelector('.suggestion').classList.add('none');
        document.querySelector('input[type=text]').value='';
        emptySuggestion();
        document.querySelector('.search-icon').classList.add('fade') 

    }
   
    if(e.target.classList[0]!='drop-demo'&&e.target.classList[0]!='drop-item'){
    let drop= document.querySelector('.drop-content');
    if(drop.classList[1]!='hide'){
        drop.classList.add('hide');
        document.querySelector('#arrow').style.transform='rotate(0deg)';
        }
    }

    if(e.target.classList[0]!='drop-demo-author'&&e.target.classList[0]!='drop-item-author'){
        let drop= document.querySelector('.drop-content-author');
        if(drop.classList[1]!='hide'){
            drop.classList.add('hide');
            document.querySelector('#arrow-author').style.transform='rotate(0deg)';
            }
        }
})


document.querySelector('.right-sec').addEventListener('mouseover',function(e){
    document.querySelector('.right-sec img').src='https://d2g9wbak88g7ch.cloudfront.net/staticimages/android_withhover.svg';
})
document.querySelector('.right-sec').addEventListener('mouseout',function(e){
    document.querySelector('.right-sec img').setAttribute('src','https://d2g9wbak88g7ch.cloudfront.net/staticimages/android_withouthover.svg')
})


function searchBar(data){
let search=document.querySelector('input[type=text]');
search.addEventListener('input',function(e){
    
   emptySuggestion();
   let suggestion=document.querySelector('.suggestion');
   let searchItem=e.target.value.toUpperCase();
   itemFound(searchItem,data);
   if(searchItem.length==0){
     suggestion.classList.add('none')
   }
   if(searchItem.length>=1){
    
    let suggestItemArr=[];
   for(let item of data){
    if(item.name.toUpperCase().slice(0,searchItem.length)==searchItem){
        suggestItemArr.push(item.name)
    }
    }
    if(suggestItemArr.length==0){
        suggestion.classList.add('none')
    }
    for(let item of suggestItemArr){
        suggestion.classList.remove('none')
         let suggestItem=document.createElement('div');
         suggestItem.addEventListener('click',function(e){
           document.querySelector('.search-icon').classList.remove('fade') 
           search.value=suggestItem.innerHTML;
           emptySuggestion();
           suggestion.classList.add('none')
         })
         suggestItem.classList.add('suggested_item')
         suggestItem.innerHTML=item;
         suggestion.appendChild(suggestItem)
    }
}
})

document.querySelector('.search-icon').addEventListener('mouseover',function(e){
    for(a of this.classList){
        if(a=='fade'){
            this.style.cursor='auto';
            return;
        }
    }
    this.style.cursor='pointer';
    
})

document.querySelector('.search-icon').addEventListener('click',function(e){
    let found;
    for( let item of data){
        if(item.name.toUpperCase()==search.value.toUpperCase()){
            found=item;
            break;
        }
    }
    
    
    
    if(found){
        
        location.href=`product.html?id=${found._id}`;
        search.value='';

    }


})

}

function itemFound(searchItem,data){
    

    for(item of data){
        if(item.name.toUpperCase()==searchItem){
            document.querySelector('.search-icon').classList.remove('fade');
            return;
        }

    }
    document.querySelector('.search-icon').classList.add('fade');
}

function emptySuggestion(){
    let suggestion=document.querySelector('.suggestion');
    let childArrayLength=suggestion.children.length;
    for(let a=0;a<childArrayLength;a++){
          suggestion.children[0].remove();
    }
}




function dropDown(){
    document.querySelector('.drop-down').addEventListener('click',function(e){
        if(e.target.classList[0]=='drop-demo'){
            
        let drop= document.querySelector('.drop-content');
        if(drop.classList[1]=='hide'){
        drop.classList.remove('hide');
        document.querySelector('#arrow').style.transform='rotate(180deg)';
        }
        else{
            drop.classList.add('hide');
            document.querySelector('#arrow').style.transform='rotate(0deg)';
        }
    }
        
    })
    let dropItem=document.querySelectorAll(".drop-item");
    for(let a of dropItem){
        a.addEventListener('click',function(e){
            console.log(a.innerHTML)
            if(a.innerHTML=="All Books"){
              location.href=`all_product.html?category=all`;
              
            }
            else{
             location.href=`all_product.html?category=${a.innerHTML}`;
            }
        })
    }

    document.querySelector('.drop-down-author').addEventListener('click',function(e){
        if(e.target.classList[0]=='drop-demo-author'){
            
        let drop= document.querySelector('.drop-content-author');
        if(drop.classList[1]=='hide'){
        drop.classList.remove('hide');
        document.querySelector('#arrow-author').style.transform='rotate(180deg)';
        }
        else{
            drop.classList.add('hide');
            document.querySelector('#arrow-author').style.transform='rotate(0deg)';
        }
    }
        
    })  

    let dropItemAuthor=document.querySelectorAll(".drop-item-author");
    for(let a of dropItemAuthor){
        a.addEventListener('click',function(e){
           location.href=`all_product.html?author=${a.innerHTML}`;
        })
    }

}
dropDown();

for(a of document.querySelectorAll('.banner-item')){
    a.addEventListener('click',function(e){
        console.log(this.querySelector('p').innerHTML)
       if(this.querySelector('p').innerHTML=="All Books"){
        location.href=`all_product.html?category=all`;
       }
       else{
        location.href=`all_product.html?category=${this.querySelector('p').innerHTML}`
       }
      
    })
}


function allBookSection(data){

  for(let a=0;a<=4;a++){
   let div=document.createElement('div');
   div.classList.add('all-book-item');

   let bookImg=document.createElement('div');
   bookImg.classList.add('book-img');
   let img=document.createElement('img')
   img.src=data[a].imageUrl;
   bookImg.appendChild(img);
   div.appendChild(bookImg);

   let bookName=document.createElement('p');
   bookName.classList.add('book-name');
   bookName.innerHTML=data[a].name;
   div.appendChild(bookName);

   let bookAuthor=document.createElement('p');
   bookAuthor.classList.add('book-author');
   bookAuthor.innerHTML=data[a].author;
   div.appendChild(bookAuthor);

   
   let bookPrice=document.createElement('p');
   bookPrice.classList.add('book-price');

   if(data[a].currentDiscount!=0){

   let discountPrice=document.createElement('span');
   discountPrice.classList.add('discount-price');
   discountPrice.innerHTML=`₹${(data[a].price-(data[a].price*data[a].currentDiscount/100)).toFixed()}`
   bookPrice.appendChild(discountPrice)  

   let originalPrice=document.createElement('span');
   originalPrice.classList.add('original-price');
   originalPrice.innerHTML=`₹${data[a].price}`;
   bookPrice.appendChild(originalPrice) ;

   
   }
   else{
   let discountPrice=document.createElement('span');
   discountPrice.classList.add('discount-price');
   discountPrice.innerHTML=`₹${data[a].price}`
   bookPrice.appendChild(discountPrice) 
   }
   div.appendChild(bookPrice);
   document.querySelector('.all-books').appendChild(div);

  }
}

{/* <div class="all-book-item">
<div class="book-img">
    <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" alt="">
</div>
<p class="book-name"></p>
<p class="book-author"></p>
<p class="book-price">
<span class="discount-price"></span>
<span class="original-price"></span>
</p>

</div> */}