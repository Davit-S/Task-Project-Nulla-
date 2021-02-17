const mainProducts = document.querySelector('#main');
const products = document.querySelector('.products')
const mainBaskets = document.querySelector('#main-2');
const baskets = document.querySelector('.baskets');
const productsClick = document.querySelector('.productsClick');
const basketsClick = document.querySelector('.basketsClick');
const totalCount = document.querySelector('.count');
const totalPrice = document.querySelector('.price');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
let price = 0;
let count = 0;
let productObjectsElement = 5;

productsClick.onclick = () => {
    pageHidden(mainProducts, mainBaskets, productsClick, basketsClick)
}


basketsClick.addEventListener('click', () => {
    pageHidden(mainBaskets, mainProducts, basketsClick, productsClick)
})

function pageHidden(mainpro, mainBas, proClick, basClic) {

    mainpro.hidden = false;
    mainBas.hidden = true;
    proClick.classList.add("active");
    basClic.classList.remove("active");
    
}


// Version 1

// Auto add product
for (let i = 0; i < 5; i++) {
    let element = `<div class="product" data-id="${productObjects[i].id}">
                <img src=${productObjects[i].img} width="120" height="120">
                <h4>${productObjects[i].title}</h4>
                <span class="priceProduct">${productObjects[i].price} AMD</span>
                <br><button class="addBaskets" onclick="addBaskets('${productObjects[i].id}')">Add Baskets</button>
            </div>
    `
    products.insertAdjacentHTML('afterbegin', element)
}


// Product add in baskets

function addBaskets(id) {
    let child = baskets.childNodes;
    let toggle = false
    child.forEach(elem => {
        if (elem.nodeType === 1) {
            if (elem.dataset.id === id) {
                let newCount = Number(elem.childNodes[5].innerText)
                let newPrice = Number(elem.childNodes[7].innerText)
                elem.childNodes[5].innerText = newCount + 1
                price = Number(price) + newPrice;
                count = Number(count) + 1;
                totalPrice.innerText = price + ' AMD';
                totalCount.innerText = count;
                toggle = true;
                return;
            }

        }
    });

    if (toggle) {
        return
    }

    for (let i = 0; i < productObjects.length; i++) {
        if (productObjects[i].id === id) {
            let elem =
                `
                <div class="basketsProduct" data-id="${productObjects[i].id}">
                <img src="${productObjects[i].img}" alt="" width="60%" height="90%" style="margin-right: 5%;">
                <span style="margin-right: 5%; font-size: x-large; font-family: serif;">
                ${productObjects[i].title}
                </span>
                <span style="margin-right: 65%; font-size: x-large; font-family: serif;">
                    1
                </span>
                <span style="font-size: x-large; font-family: serif;">
                ${productObjects[i].price}
                </span>
                <span onclick="cancleBaskets('${productObjects[i].id} ${productObjects[i].price}')"> 	&#10060 </span>
            </div>
            `
            baskets.insertAdjacentHTML('afterbegin', elem)
            let elemPrice = productObjects[i].price.split(' ')[0];
            price = Number(price) + Number(elemPrice);
            totalPrice.innerText = price + ' AMD';
            totalCount.innerText = ++count
            return;
        }
    }

}


//product delete in baskets

function cancleBaskets(prodId) {
    let basketsArray = baskets.childNodes;
    let data = prodId.split(" ")
    console.log(data);

    basketsArray.forEach(elem => {
        if (elem.nodeType === 1) {
            if (elem.dataset.id === data[0]) {
                elem.remove();
                price = Number(price) - Number(data[1]);
                console.log(Number(data[1]));
                totalPrice.innerText = price + ' AMD';
                totalCount.innerText = --count;
            }
        }
    })


}


// add new products

forward.onclick = () => {

    if (productObjectsElement > 14) {
        return
    }

    for (i = productObjectsElement; i < productObjectsElement + 5; i++) {

        let newElement = `<div class="product" data-id="${productObjects[i].id}">
        <img src=${productObjects[i].img} width="120" height="120">
        <h4>${productObjects[i].title}</h4>
        <span class="priceProduct">${productObjects[i].price}</span>
        <br><button class="addBaskets" onclick="addBaskets('${productObjects[i].id}')">Add Baskets</button>
    </div>
`
        products.insertAdjacentHTML('beforeend', newElement)
    }
    productObjectsElement = productObjectsElement + 5;
}


// delete last products

back.onclick = () => {
    let lastProduct = products.querySelectorAll('.product');
    productObjectsElement = lastProduct.length - 1;
    if (productObjectsElement < 5) {
        return;
    }
    for (j = productObjectsElement; j > productObjectsElement - 5; j--) {
        lastProduct[j].remove();
    }
}






















//Version 2


// let addBasketsClick = document.querySelectorAll('.addBaskets');

// function addClick(array) {
//     array.forEach(element => {
//         const parentElem = element.closest('div');
//         addBaskets(parentElem.dataset.id);
//     });
// }

// addClick(addBasketsClick);

// function addBaskets(prod) {
//     const parentElem = prod.closest('div');
//     const clonParentElem = parentElem.cloneNode(true);
//     baskets.insertAdjacentElement('afterbegin', clonParentElem)
//     let elemPrice = parentElem.querySelector('.priceProduct').innerText.split(' ')[0];
//     price = Number(price) + Number(elemPrice);
//     totalPrice.innerText = price + ' AMD';
//     totalCount.innerText = ++count
// }


// forward.onclick = () => {
//     console.log(productObjectsElement);

//     if (productObjectsElement > 14) {
//         return
//     }

//     for (i = productObjectsElement; i < productObjectsElement + 5; i++) {

//         let newElemen = `
//     <div class="product">
//     <img src=${productObjects[i].img} alt="" width="100" height="100">
//     <h4>${productObjects[i].title}</h4>
//     <span class="priceProduct">${productObjects[i].price}</span>
//     <br><button class="addBaskets">Add Baskets</button>
// </div>
//     `

//         products.insertAdjacentHTML('beforeend', newElemen)
//     }

//     const newAddBasketsClick = document.querySelectorAll('.addBaskets');
//     addClick(newAddBasketsClick);

//     productObjectsElement = productObjectsElement + 5;
// }

// back.onclick = () => {

//     let lastProduct = products.querySelectorAll('.product');

//     productObjectsElement = lastProduct.length - 1;

//     if (productObjectsElement < 5) {
//         return;
//     }

//     for (j = productObjectsElement; j > productObjectsElement - 5; j--) {
//         lastProduct[j].remove();
//     }

//     console.log(productObjectsElement);


// }










