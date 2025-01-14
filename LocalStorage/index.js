const chat = document.getElementById("chat");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

const greeting = document.getElementById("greeting")

let popupClose = document.querySelector(".popup-close");
let popupOwerflow = document.querySelector(".popup-overflow");
let loginInput = document.getElementById("loginInput");
let loginForm = document.getElementById("loginForm");


let userName = localStorage.getItem("userName");


window.onload = (event) => {
    
  
    if (userName) {
        popupOwerflow.style.display = "none";
      }
      
      popupClose.addEventListener("click", (e) => {
          e.preventDefault();
          popupOwerflow.style.display = "none";
        });
      
        loginForm.onsubmit = (e) => {
          // e.preventDefault(); нужна перезагрузка страницы
          if (loginInput.value) {
            let userName = loginInput.value;
            localStorage.setItem("userName", userName);
            popupOwerflow.style.display = "none";
          }
        };
        if (userName) {
          greeting.textContent = `Приветствую, ${userName}!`;
        }
  };

