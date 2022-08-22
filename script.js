

$.get('https://where-is-my-book-services.onrender.com/api/products/product/all',function(data,status){
    console.log(data.allProducts);
    searchBar(data.allProducts)
})


document.querySelector('body').addEventListener('click',function(e){
    if(e.target.classList[0]!='suggested_item'&&e.target.classList[0]!='search-field'&&e.target.classList[0]!='search-icon'){
        document.querySelector('.suggestion').classList.add('none');
        document.querySelector('input[type=text]').value='';
        emptySuggestion();

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


document.querySelector('.search-icon').addEventListener('click',function(e){
    let found;
    for( let item of data){
        if(item.name.toUpperCase()==search.value.toUpperCase()){
            found=item;
            break;
        }
    }

    if(found){
        
        location.href=`product.html?id=${found._id}`
    }

})

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
              console
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



