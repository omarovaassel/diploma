let name = document.querySelector("#name");
let nameHTMLBlock = document.querySelector("#name_block");
let email = document.querySelector("#email");
let emailHTMLBlock = document.querySelector("#email_block");
let password = document.querySelector("#password");
let passwordHTMLBlock = document.querySelector("#password_block");
let btnRegistration = document.querySelector("#registration");
let btnLogin = document.querySelector("#btn_login");
let btnGetCode = document.querySelector("#btn_get_code");
let loginAfterAuthorization = document.querySelector("#login_after_authorization");
let code = document.querySelector("#code");
let codeHTMLBlock = document.querySelector("#code_block");
let fullInput = document.querySelector("#full_input");
let loginText = document.querySelector("#login_text");
let loginWrong = document.querySelector("#login_wrong");

const sendEmail = (from, name, email, message) => {
    const templateParams = {
        from_name: from,
        to_name: name,
        to_email: email,
        message: message
    };

    emailjs.send('service_kc9nfcr', 'template_2wl7yx7', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const codeNumber = random(1000, 9999);

btnRegistration.addEventListener("click", () => {
    nameHTMLBlock.style.display = "flex";
    passwordHTMLBlock.style.display =  "none";
    btnLogin.style.display = "none";
    btnRegistration.style.display = "none";
    btnGetCode.style.display = "block";
});

btnGetCode.addEventListener("click", () => {
    if(name.value !== "" && email.value !== "") {
        sendEmail("Natural Cosmetics", name.value, email.value, codeNumber);

        codeHTMLBlock.style.display = "flex";
        passwordHTMLBlock.style.display = "flex";
        btnGetCode.innerText = "Отправить новый код";
        loginAfterAuthorization.style.display = "block";
    }else{
        fullInput.style.display = 'block';
    }
});

btnLogin.addEventListener("click", () => {
    let userEmail = document.querySelector("#email").value;
    let userPassword = document.querySelector("#password").value;

    let allUsers = JSON.parse(localStorage.getItem("users")) || [];

    let index = allUsers.findIndex(item => item.email === userEmail && item.password === userPassword);
    if(index === -1){
        loginWrong.style.display = "block";
    }else{
        console.log("second");
        emailHTMLBlock.style.display = "none";
        passwordHTMLBlock.style.display = "none";
        btnLogin.style.display = "none";
        loginAfterAuthorization.style.display = "none";
        btnRegistration.style.display = "none";
        loginText.style.display = "block";
        loginWrong.style.display = "none";

        localStorage.setItem("currentUserEmail", userEmail);

        setTimeout(function() {
            location.href = "main.html";
        }, 3000);
    }
});

let codeWrong = document.querySelector("#code_wrong");


loginAfterAuthorization.addEventListener("click", () => {
    if(name.value !== "" && email.value !== "" && password.value !== "" && code.value == codeNumber) {
        nameHTMLBlock.style.display = "none";
        emailHTMLBlock.style.display = "none";
        passwordHTMLBlock.style.display = "none";
        codeHTMLBlock.style.display = "none";
        btnLogin.style.display = "none";
        btnGetCode.style.display = "none";
        loginAfterAuthorization.style.display = "none";
        fullInput.style.display = "none";
        codeWrong.style.display = "none";
        loginText.style.display = "block";

        let userEmail = email.value;
        let userPassword = password.value;

        let user = {
            email: userEmail,
            password: userPassword
        }

        let allUsers = JSON.parse(localStorage.getItem("users")) || [];
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));

        console.log(allUsers);

        setTimeout(function () {
            location.href = "main.html";
        }, 3000);
    }else if(name.value !== "" && email.value !== "" && password.value == "" && code.value == codeNumber) {
        fullInput.style.display = "block";
    }else if(code.value !== codeNumber){
        codeWrong.style.display = "block";
    }
});