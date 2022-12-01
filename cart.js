let productArray = [
    {
        id: 1,
        img: "images/images5ff6aaa837065.webp",
        title: "Крем для тела Оригинальный Hempz",
        category: "Крема",
        price: 6000
    },
    {
        id: 2,
        img: "images/images6346ae37a9732.png",
        title: "Herzsamen Шампунь для чувствительной кожи головы",
        category: "Новинки",
        price: 2500
    },
    {
        id: 3,
        img: "images/images612127755d0e1.webp",
        title: "Шампунь от перхоти с яблочным уксусом",
        category: "Новинки",
        price: 7250
    },
    {
        id: 4,
        img: "images/images634f91b860c8b.webp",
        title: "Сухой шампунь для уменьшения кожного сала",
        category: "Новинки",
        price: 4080
    },
    {
        id: 5,
        img: "images/images624e824759aea.webp",
        title: "Крем для рук Madecassoside hand Cream",
        category: "Крема",
        price: 2800
    },
    {
        id: 6,
        img: "images/images5f940c20eeab1.webp",
        title: "Лосьон для тела для сухой кожи OUD",
        category: "Крема",
        price: 1300
    },
    {
        id: 7,
        img: "images/images61eeb5c6895bd.webp",
        title: "Молочко для тела Тройное увлажнение Herbal Body",
        category: "Крема",
        price: 4210
    },
    {
        id: 8,
        img: "images/images624ec9c389a7e.webp",
        title: "Сыворотка GALACTOMY NIACIN ESSENCE",
        category: "Сыворотки",
        price: 3100
    },
    {
        id: 9,
        img: "images/images5f8c6430db28f.webp",
        title: "Омолаживающая сыворотка с ретинолом Cos De BAHA Re",
        category: "Сыворотки",
        price: 8730
    },
    {
        id: 10,
        img: "images/images5f8c567cc329f.webp",
        title: "Эмульсия Soon Jung Centella 10-Free moist Emulsion",
        category: "Увлажнение",
        price: 1780
    },
    {
        id: 11,
        img: "images/images62905075805b3.webp",
        title: "Крем для лица Hamamelis Cream (APIEU)",
        category: "Увлажнение",
        price: 5780
    },
    {
        id: 12,
        img: "images/images5f71b98848c26.webp",
        title: "Очищающий крем Skin Regimen Cleansing cream",
        category: "Очищение",
        price: 8350
    },
    {
        id: 13,
        img: "images/images5f8c6f67d46cb.webp",
        title: "Интенсивно очищающий гель для нормальной кожи CeraVe",
        category: "Очищение",
        price: 8250
    },
    {
        id: 14,
        img: "images/images5feaf921ae615.webp",
        title: "Увлажняющий гель для умывания Round Lab Birch Juic",
        category: "Рекомендации",
        price: 3940
    },
    {
        id: 15,
        img: "images/images62317c1d815e7.webp",
        title: "Пенка для умывания Etude Soon Jun",
        category: "Рекомендации",
        price: 5999
    },
]

document.querySelector("#user_email").innerHTML += localStorage.getItem("currentUserEmail");

let cardBlock = document.querySelector("#card-block-cart");
let productIdCart = JSON.parse(localStorage.getItem("productId")) || [];

function drawProductArray() {
    cardBlock.innerHTML = "";

    for(let i = 0; i < productIdCart.length; i++) {
        cardBlock.innerHTML += `
            <div class="border-cart">
                        <div class="wrap-cart">
                            <div class="product-wrap-cart">
                                <a href=""><img src="${productArray[i].img}" width="100px"></a>
                            </div>
                        </div>
                        <div class="product-info-cart">
                            <h3 class="product-title-cart">${productArray[i].title}</h3>

                            <div id="product-count-block">
                                <div class="count">
                                    <div class="minus" data-id="${productIdCart[i].productId}">-</div>
                                    <div class="number">1</div>
                                    <div class="plus" data-id="${productIdCart[i].productId}">+</div>
                                    <div class="price-cart"><span>${productArray[i].price}</span> ₸</div>
                                </div>                                
                            </div>
                        </div>
                    </div>
        `;
    }
}

drawProductArray();

// заполнение номера телефона
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.mobile-cart'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

});

//отправка заказа на почту
const sendEmail = (from, name, email, html) => {
    const templateParams = {
        from_name: from,
        to_name: name,
        to_email: email,
        my_html: html
    };

    emailjs.send('service_kc9nfcr', 'template_vq8me5g', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

let mobile = document.querySelector(".mobile-cart");
let address = document.querySelector("#address-cart");
let btnSendOrder = document.querySelector(".order");
let productsInCart = productIdCart;

btnSendOrder.addEventListener("click", () => {
    if(mobile.value !== "" && address.value !== "") {

        // let email = localStorage.getItem("currentUserEmail");
        // sendEmail("Natural Cosmetics", name.value, email, productsInCart);

        cardBlock.innerHTML = "";
        cardBlock.innerHTML = "В вашей корзине пусто";
        let totalPriceText = document.querySelector(".total-price-text");
        totalPriceText.style.display = "none";

    }else if(name.value === ""){
        name.style.borderColor = "red";
    }if(mobile.value === ""){
        mobile.style.borderColor = "red";
    }if(address.value === ""){
        address.style.borderColor = "red";
    }
});

// счетчик
// подсчет общей суммы товаров в корзине

// console.log(productIdCart[2].productId);
// console.log(document.getAttribute("change"));

// document.onclick = event => {
//     console.log(document.getAttribute("change"));
//     let number = ++document.querySelector(".number").innerText;
//
//     if(event.target.classList.contains('plus')){
//         // plusFunction();
//         // console.log(event.target.dataset.id++);
//     }
//     if(event.target.classList.contains('minus')){
//         // console.log(event.target.dataset.id++);
//     }
// }
//
// function plusFunction() {
//     productIdCart++;
//     console.log(productIdCart);
// }



// function addHandlers(count) {
//     let priceString = document.querySelectorAll(".price-cart");
//     console.log(priceString);
//
//     // str = str.split(' ').join('');
//
//     let priceCart = document.querySelector(".price-cart");
//     let minus = count.querySelector(".minus");
//     let number = count.querySelector(".number");
//     let plus = count.querySelector(".plus");
//
//     plus.addEventListener("click", function() {
//         number.innerText++;
//         priceString.forEach(addHandlers);
//         console.log(priceString);
//         // let productSum = number.innerText++ * priceCart.InnerText;
//         // priceCart.InnerText = productSum;
//         // console.log(priceCart.InnerText);
//     });
//     minus.addEventListener("click", function() {
//         number.innerText--;
//     });
//
//     // let totalPriceSum = document.querySelector(".total-price-sum");
//     // let priceCart = document.querySelector(".price-cart");
//     //
//     // totalPriceSum.innerText = counts.value * priceCart;
// }
//
// let counts = document.querySelectorAll(".count");
// counts.forEach(addHandlers);








// let productIdCart = JSON.parse(localStorage.getItem("productId")) || [];
// let userEmailCart = JSON.parse(localStorage.getItem("userEmail")) || [];
// let emailInput = document.querySelector("#email").value;
//
// console.log(emailInput);
//



// через id и создать функции minus plus



//--------------------------------------------------------
//
// let searchInput = document.querySelector(".searchbar");
// let searchBtn = document.querySelector(".search-btn");

//--------------------------------------------------------
// поиск

// searchBtn.addEventListener("click", () => {
//     console.log(searchInput.value);
//     cardBlock.innerHTML = "";
//     let result = [];
//
//     for(let item of productArray) {
//         if(item.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
//             console.log(item.title);
//             result.push(item); //без этого будет выводить только последнее значение в массиве products
//             drawProductArray(result); // item в квадратных скобках, потому что функция создана выше для приема именно массива
//         }
//     }
// })

//--------------------------------------------------------
// фильтр по категориям
// let catalogue = document.getElementById("catalogue");
//
// function showCatalogue(){
//     let catalogueArr = ["Новинки", "Крема", "Сыворотки", "Увлажнение", "Очищение", "Рекомендации"];
//
//     for(let i = 0; i < catalogueArr.length; i++){
//         catalogue.innerHTML += `
//         <option class="catalogue_names" value="${catalogueArr[i]}">${catalogueArr[i]}</option>`
//     }
// };
//
// showCatalogue();
//
// catalogue.addEventListener("change", () => {
//     console.log(catalogue.value);
//     cardBlock.innerHTML = "";
//     let result = [];
//
//     for(let product of productArray) {
//         if(product.category.toLowerCase().includes(catalogue.value.toLowerCase())) {
//             console.log(product.category);
//             result.push(product); //без этого будет выводить только последнее значение в массиве products
//             drawProductArray(result);
//         }else if(catalogue.value == "КАТАЛОГ"){
//             drawProductArray(productArray);
//         }
//     }
// })

//--------------------------------------------------------
// добавление товара в корзину
//
// let btnCart = document.querySelector(".cart-btn");
//
// function btnAddToCart(id){
//     let arrId = JSON.parse(localStorage.getItem("productId")) || [];
//     arrId.push(id);
//     localStorage.setItem("productId", JSON.stringify(arrId));
//     console.log(arrId);
// };
//
// btnCart.addEventListener("click", () => {
//     window.open("cart.html");
// });

//--------------------------------------------------------
// модальное окно
//
// const modal = document.getElementById("modal_window");
// const btnOpenModal = document.getElementById("btn_open_modal");
// const closeModal = document.getElementsByClassName("close")[0];
//
// btnOpenModal.onclick = function() {
//     modal.style.display = "block";
// }
//
// closeModal.onclick = function() {
//     modal.style.display = "none";
// }
//
// // Закрываем окно, кликнув в любом месте сайта
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
//
// // Авторизация
// let name = document.querySelector("#name");
// let nameHTMLBlock = document.querySelector("#name_block");
// let email = document.querySelector("#email");
// let emailHTMLBlock = document.querySelector("#email_block");
// let code = document.querySelector("#code");
// let codeHTMLBlock = document.querySelector("#code_block");
// let btnGetCode = document.querySelector("#btn_get_code");
// let btnLogin = document.querySelector("#btn_login");
// let loginText = document.querySelector("#login_text");
// let fullInput = document.querySelector("#full_input");
// let codeWrong = document.querySelector("#code_text");
// let btnShopping = document.querySelector("#btn_shopping");
//
// const sendEmail = (from, name, email, message) => {
//     const templateParams = {
//         from_name: from,
//         to_name: name,
//         to_email: email,
//         message: message
//     };
//
//     emailjs.send('service_kc9nfcr', 'template_2wl7yx7', templateParams)
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text);
//         }, function(error) {
//             console.log('FAILED...', error);
//         });
// }
//
// function random(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// const codeNumber = random(1000, 9999);
//
// btnGetCode.addEventListener("click", () => {
//     console.log("asd")
//     if(name.value !== "" && email.value !== "") {
//         localStorage.setItem('name', name.value);
//         localStorage.setItem('email', email.value);
//
//         sendEmail("Natural Cosmetics", name.value, email.value, codeNumber);
//
//         code.style.display = 'block';
//         codeHTMLBlock.style.display = 'block';
//         btnLogin.style.display = 'block';
//         nameHTMLBlock.style.display = 'none';
//         emailHTMLBlock.style.display = 'none';
//         fullInput.style.display = 'none';
//         btnGetCode.innerText = "Отправить новый код";
//     }else if(name.value == "" && email.value == "" && code.value == ""){
//         fullInput.style.display = 'block';
//     }
// });
//
// btnLogin.addEventListener("click", () => {
//     if(code.value == codeNumber){
//         code.style.display = 'none';
//         btnGetCode.style.display = 'none';
//         btnLogin.style.display = 'none';
//         loginText.style.display = 'block';
//         btnShopping.style.display = 'block';
//         codeWrong.style.display = 'none';
//     }else if(code.value !== codeNumber){
//         console.log("asd");
//         codeWrong.innerText = "Вы ввели неверный код";
//     }
// });

//--------------------------------------------------------