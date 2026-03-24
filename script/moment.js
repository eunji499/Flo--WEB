window.addEventListener('load', () => {
    
    
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const galleryTrack = document.querySelector('.gallery-track');
    
    console.log('Elements found:', progressContainer, progressBar, galleryWrapper, galleryTrack);
    
    let isDragging = false;
    let autoSlideInterval;
    let currentPercentage = 0;
    const slideSpeed = 0.001; // 자동 슬라이드 속도 (더 느리게 조정)

    // -- 정렬 드롭다운 2뎁스 --
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortTrigger = sortDropdown?.querySelector('.sort-trigger');
    const sortOptions = sortDropdown?.querySelectorAll('.sort-options li');

    function closeSortDropdown() {
        sortDropdown?.classList.remove('open');
    }

    function setSortSelected(label) {
        if (!sortTrigger) return;
        sortTrigger.textContent = `${label} `;
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = '<img src="./img/solar_alt-arrow-down-outline.svg" alt="">';
        sortTrigger.appendChild(iconSpan);
    }

    if (sortTrigger) {
        sortTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            sortDropdown.classList.toggle('open');
        });
    }

    sortOptions?.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selected = option.dataset.sort;
            setSortSelected(option.textContent.trim());

            sortOptions.forEach(item => item.classList.remove('active'));
            option.classList.add('active');

            closeSortDropdown();

            // 여기서 실제 정렬 로직을 넣어주세요.
            // (예: review-list 내부 review-card 정렬 적용)
            console.log('정렬 옵션 선택:', selected);
        });
    });

    document.addEventListener('click', closeSortDropdown);

    // 마우스와 터치 이벤트에서 공통으로 X 좌표를 가져오는 함수
    function getClientX(e) {
        // e.touches가 있으면 모바일 터치, 없으면 PC 마우스
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function updateProgressAndGallery(percentage) {
        console.log('Updating progress:', percentage);
        // 1. 프로그레스 바 너비 업데이트 (%)
        progressBar.style.width = (percentage * 100) + '%';

        // 2. 갤러리 슬라이드 연동 로직
        // 갤러리 트랙의 전체 길이에서 화면에 보이는 래퍼의 길이를 뺀 '최대 이동 가능 거리' 계산
        const maxScroll = galleryTrack.clientWidth - galleryWrapper.clientWidth;
        console.log('galleryTrack.clientWidth:', galleryTrack.clientWidth, 'galleryWrapper.clientWidth:', galleryWrapper.clientWidth, 'maxScroll:', maxScroll);
        
        // 이미지가 화면을 넘어갈 만큼 많을 때만 슬라이드 작동
        if (maxScroll > 0) {
            const translateX = percentage * maxScroll;
            galleryTrack.style.transform = `translateX(-${translateX}px)`;
            console.log('Transform applied:', translateX);
        } else {
            console.log('No scroll needed');
        }
    }

    // 자동 슬라이드 시작
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // 기존 인터벌 정리
        console.log('Auto slide started');
        autoSlideInterval = setInterval(() => {
            if (!isDragging) {
                currentPercentage += slideSpeed;
                if (currentPercentage >= 1) {
                    currentPercentage = 0; // 끝에 도달하면 처음으로 리셋
                }
                updateProgressAndGallery(currentPercentage);
            }
        }, 50); // 50ms마다 업데이트
    }

    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // 수동 드래그 시 자동 슬라이드 일시 정지
    function handleDragStart(e) {
        isDragging = true;
        stopAutoSlide();
        // 클릭 시 즉시 위치 업데이트 제거하여 점핑 방지
    }

    function updateProgressAndGalleryFromEvent(e) {
        const rect = progressContainer.getBoundingClientRect();
        let x = getClientX(e) - rect.left;
        
        // 0 ~ 컨테이너 너비 사이로 값 제한
        x = Math.max(0, Math.min(x, rect.width));
        
        const percentage = x / rect.width;
        currentPercentage = percentage; // 수동 드래그 시 현재 퍼센트 업데이트
        updateProgressAndGallery(percentage);
    }

    // --- PC 마우스 이벤트 ---
    progressContainer.addEventListener('mousedown', (e) => {
        handleDragStart(e);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateProgressAndGalleryFromEvent(e);
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        startAutoSlide(); // 드래그 끝나면 자동 슬라이드 재시작
    });

    // --- 📱 모바일 터치 이벤트 ---
    progressContainer.addEventListener('touchstart', (e) => {
        handleDragStart(e);
        updateProgressAndGalleryFromEvent(e); // 터치 시작 시 위치 업데이트
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            // 터치 중 화면 스크롤 방지 (touch-action: none; 과 함께 사용)
            e.preventDefault(); 
            updateProgressAndGalleryFromEvent(e);
        }
    }, { passive: false }); // preventDefault를 사용하기 위해 passive 옵션 끄기

    window.addEventListener('touchend', () => {
        isDragging = false;
        startAutoSlide(); // 터치 끝나면 자동 슬라이드 재시작
    });

    // 페이지 로드 시 자동 슬라이드 시작 (이미지 로드 후)
    startAutoSlide();
});
   