// const formGPT = document.querySelector('.formGpt');
// const chatContainer = document.querySelector('#chat_container');

// let loadInterval;

// const loader = (e) => {
//     e.textContent = '';

//     loadInterval = setInterval(() => {
//         e.textContent += '.';

//         if (e.textContent === '....') {
//             e.textContent = '';
//         }
//     }, 300)
// };

// const typeText = (e, text) => {
//     let index = 0;

//     let interval = setInterval(() => {
//         if (index < text.length) {
//             e.innerHTML += text.charAt(index);
//             index++;
//         } else {
//             clearInterval(interval);
//         }
//     }, 20)
// }

// const generateUniqueId = () => {
//     const timestamp = Date.now();
//     const randomNumber = Math.random();
//     const hexadecimalString = randomNumber.toString(16);

//     return `id-${timestamp}-${hexadecimalString}`;
// }

// const chatStripe = (isAi, value, uniqueId) => {
//     return (
//         `
//         <div class="wrapper ${isAi && 'ai'}">
//             <div class="chat">
//                 <div class="profile">
//                     <img
//                       src="${isAi ? '/images/bot.svg' : '/images/user.svg'}"
//                       alt="${isAi ? 'bot' : 'user'}"
//                     />
//                 </div>
//                 <div class="message" id=${uniqueId}>${value}</div>
//             </div>
//         </div>
//     `
//     )
// }

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData(formGPT);

//     chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

//     formGPT.reset();

//     const uniqueId = generateUniqueId();
//     chatContainer.innerHTML += chatStripe(true, "", uniqueId);

//     chatContainer.scrollTop = chatContainer.scrollHeight;

//     const messageDiv = document.getElementById(uniqueId);

//     loader(messageDiv);

//     const response = await fetch('http://localhost:3001/chat-gpt', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             prompt: data.get('prompt')
//         })
//     });

//     clearInterval(loadInterval)
//     messageDiv.innerHTML = " ";

//     if (response.ok) {
//         const data = await response.json();
//         const parsedData = data.bot.trim()
//         typeText(messageDiv, parsedData)
//     } else {
//         const err = await response.text()

//         messageDiv.innerHTML = "Something went wrong"
//         alert(err)
//     }

// }

// if (formGPT) {
//     formGPT.addEventListener("submit", handleSubmit);
// }

document.addEventListener("DOMContentLoaded", () => {
  const chatbotButton = document.getElementById("chatbot-button");
  const chatbox = document.getElementById("chatbox");
  const closeChat = document.getElementById("close-chat");
  const formGPT = document.querySelector(".formGpt");
  const chatContainer = document.querySelector("#chat_container");

  let loadInterval;

  const loader = (element) => {
    element.textContent = "";
    loadInterval = setInterval(() => {
      element.textContent += ".";
      if (element.textContent === "....") element.textContent = "";
    }, 300);
  };

  const typeText = (element, text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };

  const chatStripe = (isAi, value, uniqueId) => {
    return `
      <div class="wrapper ${isAi ? "ai" : ""}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${isAi ? "/images/bot.svg" : "/images/user.svg"}"
              alt="${isAi ? "bot" : "user"}" 
            />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 chặn reload trang

    const data = new FormData(formGPT);
    const prompt = data.get("prompt");

    if (!prompt.trim()) return;

    chatContainer.innerHTML += chatStripe(false, prompt);
    formGPT.reset();

    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, "", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

    try {
      const response = await fetch("http://localhost:3001/chat-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      clearInterval(loadInterval);
      messageDiv.innerHTML = "";

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();
        typeText(messageDiv, parsedData);
      } else {
        const err = await response.text();
        messageDiv.innerHTML = "Lỗi! Vui lòng thử lại.";
        console.error(err);
      }
    } catch (error) {
      clearInterval(loadInterval);
      messageDiv.innerHTML =
        "Bạn vui lòng đăng nhập tài khoản để sử dụng chức năng này !";
      console.error(error);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  chatbotButton?.addEventListener("click", () => {
    chatbox.classList.toggle("hidden");
  });

  closeChat?.addEventListener("click", () => {
    chatbox.classList.add("hidden");
  });

  formGPT?.addEventListener("submit", handleSubmit);
});
