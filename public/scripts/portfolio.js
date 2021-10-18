const modelimage = document.getElementsByClassName("modelimage")
const bigshow = document.querySelector(".bigshow")
const bigshow_cancel = document.querySelector("#bigshow-cancel")
const image = document.querySelector(".image")


for(var i = 0; i< modelimage.length; i++){
    let model = modelimage[i]
    model.addEventListener("click",bigShow)
    bigshow_cancel.addEventListener("click",cancelBigShow)
}
function bigShow(e) {
    modelimagesrc = e.target.src
    bigshow.classList.remove("hide")
    image.src = modelimagesrc
}
function cancelBigShow() {
    bigshow.classList.add("hide")
}

// if(document.readyState === 'complete'){
// }

document.onreadystatechange = ()=>{
    setTimeout(() => {
    alert("You can expand an image by tapping it.")
    }, 5000);
}
// function bringUpAlert() {
//     setTimeout(() => {
//         alert("You can expand a View by just clicking it once")
//     }, 3000);
// }