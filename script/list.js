document.addEventListener('DOMContentLoaded', function() {
    const menuTabs = document.querySelectorAll('.menu-tabs li');
    
    menuTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 모든 a 태그에서 active 클래스 제거
            document.querySelectorAll('.menu-tabs a').forEach(function(a) {
                a.classList.remove('active');
            });
            // 클릭된 li의 a 태그에 active 클래스 추가
            this.querySelector('a').classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuTabs = document.querySelectorAll('.tab-menu li');
    
    menuTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 모든 a 태그에서 active 클래스 제거
            document.querySelectorAll('.tab-menu a').forEach(function(a) {
                a.classList.remove('active');
            });
            // 클릭된 li의 a 태그에 active 클래스 추가
            this.querySelector('a').classList.add('active');
        });
    });
});

