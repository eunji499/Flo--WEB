document.addEventListener("DOMContentLoaded",()=>{
    //메뉴버튼을 누르면 header가 나오는 기능
const btnMenu = document.querySelector('.btn-menu');
const menuSmartHidden = document.querySelector('.menu-smart-hidden');
const btnClose = document.querySelector('.btn-close');
const gnbSmartList = document.querySelectorAll(".gnb-smart>li")




btnMenu.addEventListener('click',()=>{
    menuSmartHidden.classList.add('on');
})
btnClose.addEventListener('click',()=>{
    menuSmartHidden.classList.remove('on');
    gnbSmartList.forEach(tag=>tag.classList.remove("on"))
})



//모바일에서 2뎁스 메뉴 나오는 기능
const btnMores = document.querySelectorAll('.gnb-smart li .btn-more')
btnMores.forEach((span)=>{
    span.addEventListener('click',()=>{
        span.parentElement.classList.toggle("on")
    })
})

// 제품 이미지에 '위로 튀는' 애니메이션(뷰포트 진입 시)
const productSpanImgs = document.querySelectorAll('.product-image-container span img');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('jump-up');
                img.addEventListener('animationend', () => {
                    img.classList.remove('jump-up');
                }, { once: true });
            }
        });
    }, { threshold: 0.4 });

    productSpanImgs.forEach(img => observer.observe(img));
} else {
    productSpanImgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.classList.add('jump-up');
            img.addEventListener('animationend', () => img.classList.remove('jump-up'), { once: true });
        });
    });
}

});