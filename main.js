//Xử lý slide

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

//click nút sang phải
document.querySelector(".btn-right").addEventListener("click",()=>{
    slideIndex +=1 ;
    showSlides(slideIndex);
})

//click nút sang trái
document.querySelector(".btn-left").addEventListener("click",()=>{
    slideIndex -=1 ;
    showSlides(slideIndex);
})

//Click nút chấm chuyển slide
for(let i = 0; i< dots.length ; i++){
    dots[i].addEventListener("click",()=>{
        slideIndex = i;
        showSlides(slideIndex);
    })
}

//Tự động chuyển slide 5 giây 
var auto = setInterval(function(){
    slideIndex+=1;
    showSlides(slideIndex);
    return slideIndex;
},5000);




//Xử lý form

//Đối tượng validator
function Validator(options){
    var formElement = document.querySelector(options.form); //lấy phần tử form

    if(formElement){
        options.rules.forEach((rule)=>{
            var inputElement = formElement.querySelector(rule.selector); // lấy phần tử input trong form
            var errorElement= inputElement.parentElement.querySelector(".form-message"); //lấy ra phần tử message
            var submit = document.querySelector('.form-submit');//nút submit

            if(inputElement){
                //Xử lý trường hợp Blur khỏi input: khi blur khỏi input sẽ kiểm tra và thông báo lỗi (nếu có)
                inputElement.onblur = ()=>{
                    var errorMessage = rule.test(inputElement.value); //Cho giá trị nhập vào hàm test để kiểm tra

                    //Có lỗi
                    if(errorMessage){
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add("active");
                        submit.classList.add('disable');
                    }
                    else{
                        errorElement.innerText = "";
                        inputElement.parentElement.classList.remove("active");
                        submit.classList.remove('disable');
                    }
                }

                //Xử lý mỗi khi người dùng nhập: Khi đang nhập nếu đang hiện lỗi sẽ ẩn lỗi đi
                inputElement.oninput= ()=>{
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("active");
                    submit.classList.add('disable');
                }
            }

        })
    }
    
}

//Định nghĩa các rule
//vai trò : Khi có lỗi thì trả ra message lỗi
Validator.isRequired = (selector)=>{
    return{
        selector: selector,
        test: (value)=>{
            return value.trim() ? undefined : "Vui lòng nhập trường này"; //thông báo lỗi
        }
    }
}

Validator.isEmail = (selector)=>{
    return{
        selector: selector,
        test: (value)=>{
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value)? undefined : "Trường này phải là email"; //thông báo lỗi
        }
    }
}

Validator.isPassword = (selector,min,max)=>{
    return{
        selector: selector,
        test: (value)=>{
            var message = "";
            var partten = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ;
            if(value.length < min||value.length > max){
                message +="Mật khẩu nằm trong khoảng từ 8-32 ký tự\n";
            }
            if(!partten.test(value)){
                message += "Mật khẩu phải có cả chữ hoa, chữ thường và số\n"
            }
            return message.length<=1? undefined:message ;
        }
    }
}

Validator.isConfirm = (selector, getConfirmValue)=>{
    return{
        selector: selector,
        test: (value)=>{
            return value == getConfirmValue()? undefined: "Mật khẩu không chính xác";
        }
    }
}
