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

let cardBlock = document.querySelector(".card-block");
let searchInput = document.querySelector(".searchbar");
let searchBtn = document.querySelector(".search-btn");

function drawProductArray(array){
    cardBlock.innerHTML = "";

    for(let product of array){
        cardBlock.innerHTML += `
            <div class="border">
                        <div class="wrap">
                            <div class="product-wrap">
                                <a href=""><img src="${product.img}" width="100px"></a>
                            </div>
                            <div class="loop-action">
                                <button class="add-to-cart">Быстрый просмотр</button>
                                <button class="loop-add-to-cart" onclick="btnAddToCart(${product.id})">В корзину</button>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="stars"></div>                       
                            <h3 class="product-title">${product.title}</h3>
                            <div class="price"><span>${product.price}</span> ₸</div>                             
                        </div>
                    </div>
        `;
    }
};

drawProductArray(productArray);

//--------------------------------------------------------
// поиск

searchBtn.addEventListener("click", () => {
    console.log(searchInput.value);
    cardBlock.innerHTML = "";
    let result = [];

    for(let item of productArray) {
        if(item.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
            console.log(item.title);
            result.push(item); //без этого будет выводить только последнее значение в массиве products
            drawProductArray(result); // item в квадратных скобках, потому что функция создана выше для приема именно массива
        }
    }
})

//--------------------------------------------------------
// фильтр по категориям
let catalogue = document.getElementById("catalogue");

function showCatalogue(){
    let catalogueArr = ["Новинки", "Крема", "Сыворотки", "Увлажнение", "Очищение", "Рекомендации"];

    for(let i = 0; i < catalogueArr.length; i++){
        catalogue.innerHTML += `
        <option class="catalogue_names" value="${catalogueArr[i]}">${catalogueArr[i]}</option>`
    }
};

showCatalogue();

catalogue.addEventListener("change", () => {
    console.log(catalogue.value);
    cardBlock.innerHTML = "";
    let result = [];

    for(let product of productArray) {
        if(product.category.toLowerCase().includes(catalogue.value.toLowerCase())) {
            console.log(product.category);
            result.push(product); //без этого будет выводить только последнее значение в массиве products
            drawProductArray(result);
        }else if(catalogue.value == "КАТАЛОГ"){
            drawProductArray(productArray);
        }
    }
})

//--------------------------------------------------------
// добавление товара в корзину

let btnCart = document.querySelector(".cart-btn");

function btnAddToCart(productId){
    let arrId = JSON.parse(localStorage.getItem("productId")) || [];

    arrId.push({
        productId: productId,
        userEmail: localStorage.getItem("users")
    });

    localStorage.setItem("productId", JSON.stringify(arrId));
    console.log(arrId);
};

btnCart.addEventListener("click", () => {
    location.href = "cart.html";
});

//--------------------------------------------------------
// // модальное окно на главной странице
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
// // Отправка кода на почту
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
// // Рандомный 4-значный код для авторизации
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