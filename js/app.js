let num = 0;
let mousePos = 0;
let currentPos = 0;
let draggable = false;
const offset = 95;
let timer ;
let position = 0;
let textOffset = 50;
let textPost = 0;
const btnDecreas= document.getElementById('decreas');
const btnIncreas= document.getElementById('increas');
const stepper= document.getElementById('stepper');

btnIncreas.addEventListener('click' , () =>counterNumber("increas"));
btnDecreas.addEventListener('click' , () =>counterNumber("decreas"));
stepper.addEventListener('mouseup' , function(){
   if(draggable) center();
    console.log(draggable);
})
stepper.addEventListener("mousedown", function (event) {
    currentPos = mousePos;
    draggable = true;
});
document.addEventListener('mousemove' , function(event){
    mousePos = event.pageX;

    if (draggable) {
        position = mousePos - currentPos;
        stepper.style.transform = `translateX(${position / 2}px)`;
      }
    
      if (position <= offset * -1 && draggable) {
        counterNumber("decreas");
        center();
      }
    
      if (position >= offset && draggable) {
        counterNumber("increas");
        center();
      }
});

function center(){
    draggable = false;
    let pos = position /2;

    let time = position > 0 ? (200/(pos)) : (200/pos) * -1

    timer = setInterval(() => {
        if ((pos <= 0 && position > 0)  || (pos >= 0 && position < 0)){
            clearInterval(timer);
            return;
        }
        if(position>0){
            pos--;
        }else{
            pos++;
        }    
        stepper.style.transform = `translateX(${pos}px)`;
    } ,time )
};

function counterNumber(action){
    if(action == "increas"){
        num++;
    }
    else{
        num--;
    }
    // stepper.textContent = num;
    setTimeout(fnTextAnimate , 150);
}

//function for text animate
function fnTextAnimate (){
    const textAnimate = setInterval(() => {
        if(textPost < textOffset){
            textPost++;
        }else{
            stepper.getElementsByTagName('span')[0].textContent = num;
            clearInterval(textAnimate);
            fnTextAnimateBack();
        }
        stepper.getElementsByTagName('span')[0].style.transform = `translateX( ${textPost}px)`;
    }, 1);
}
function fnTextAnimateBack(){
    const textAnimateBack = setInterval ( () => {
        if(textPost > 0){
            textPost--;
        }else{
            clearInterval(textAnimateBack);
        }
        stepper.getElementsByTagName('span')[0].style.transform = `translateX( ${textPost}px)`;
    } , 1);
}