    const message = document.querySelector(".message")
    if(message.innerText){
        setTimeout(() => {
            message.classList.add("hide")
        }, 3000);
    }

    