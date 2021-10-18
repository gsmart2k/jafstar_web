const hamopen = document.querySelector(".fa-bars")
const edit = document.getElementsByClassName("fa-edit")
const hide = document.getElementsByClassName("hide")

    const hamclose = document.querySelector(".ham-cancel")
    const menubar = document.querySelector(".menu-bar")

    hamopen.addEventListener("click",openMenuBar)
    hamclose.addEventListener("click",closeMenuBar)

    function openMenuBar(e) {
        menubar.classList.add("show")
    }   
    function closeMenuBar(e) {
       menubar.classList.remove("show")
    }  
    for(var i = 0; i<edit.length; i++){
        indedit = edit[i]
        indedit.addEventListener("click",(e)=>{
        targetted = e.target.parentElement.nextElementSibling
            
        targetted.classList.remove("hide")
        })
    }
// Fatherwell2000