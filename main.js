//xu ly slider

var slides = document.getElementsByClassName("slide-item");
var dots = document.getElementsByClassName("btn-around");
var slideIndex = 0;

//show slide
function showSlides(n) {
    let i;

    if (n > slides.length-1){
        slideIndex = 0;
    }    

    if (n < 0) {
        slideIndex = slides.length-1;
    }

    for (i = 0; i < slides.length; i++) {
       slides[i].classList.remove('active');  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex].classList.add("active");  
    dots[slideIndex].classList.add("active");
}

showSlides(slideIndex);

//click nut sang phai
document.querySelector(".btn-right").addEventListener("click",()=>{
    slideIndex +=1 ;
    showSlides(slideIndex);
})

//click nut sang trai
document.querySelector(".btn-left").addEventListener("click",()=>{
    slideIndex -=1 ;
    showSlides(slideIndex);
})

//click nut tron
for(let i = 0; i< dots.length ; i++){
    dots[i].addEventListener("click",()=>{
        slideIndex = i;
        showSlides(slideIndex);
        console.log(dots[i]);
        console.log(i);
    })
}


//tu dong chuyen slide 
var auto = setInterval(function(){
    slideIndex+=1;
    showSlides(slideIndex);
    return slideIndex;
},5000);



// Xu ly form 
