// data-include-path
function includePath(callback) {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                    callback();
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
}

window.viewport = 'pc';
function findViewPort() {
    let { innerWidth } = window
    
    if (innerWidth < 834) window.viewport = 'mobile'
    else if (innerWidth >= 834 && innerWidth < 1312) window.viewport = 'tablet'
    else window.viewport = 'pc'
}

function showViewport() {
    var allElements = document.querySelectorAll('[data-viewport]');
    allElements.forEach(function(el) {
        const { viewport } = el.dataset;
        if ( viewport && !viewport.includes(window.viewport) ) {
            el.style.display = 'none';
        } else {
            el.style.display = '';
        }
    });

    console.log('viewport: ', window.viewport);
    console.log('innerWidth: ', innerWidth);
}

// 메뉴별 타이틀 설정
function setHeaderTitle(title) {
    const el_header = document.querySelector('body > header');

    if (el_header?.className.includes('sub')) {
        const el = document.querySelector("body > header .header__title");
        el.innerText = title;
    }

    const elements = document.querySelectorAll('body > header .header__inner-menu [label]');

    elements.forEach(function(el) {
        if(el.getAttribute('label') === title) {
            el.classList.add('selected');
        }
    });
}

// Navigation 선택된 메뉴 설정
function setSelectedNaviation(title) {
    const elements = document.querySelectorAll('.navigation [label]');

    elements.forEach(function(el) {
        if(el.getAttribute('label') === title) {
            el.classList.add('selected');
        }
    });

    title === '공지' && document.querySelector('.navigation__list > .navigation__item-btn')?.remove();
}

// 사이드 메뉴 열기 or 닫기
function handleOpenCategory(value = true) {
    const el_category = document.querySelector('.category');
    value ? el_category?.classList.add('open') : el_category?.classList.remove('open');
};

function handleOpenFootercontent() {
    const el_fc = document.querySelector('body > footer .footer__content');
    el_fc.className?.includes('open') ? el_fc.classList?.remove('open') : el_fc.classList?.add('open')
}

// 뒤로가기
function goback() {
    window.history.back()
};

// 사이트 이동
function openUrl(value) {
    const type = {
        instagram: 'https://instagram.com/mirobrick',
        naver: 'https://blog.naver.com/miro-brick'
    };

    window.open(type[value]);
}

function toggle() {
    let toggle = document.querySelectorAll('.toggleBtn');
    let toggleTarget = document.querySelectorAll('.toggleBody');

    toggleTarget.forEach((e)=>{
        e.style.height = 0;
    });

    toggle.forEach(function(item){
        item.addEventListener('click', function(e){
            e.preventDefault();

            let parent = item.closest(".toggle");
            let toggleBody = parent.querySelector('.toggleBody');

            if( !item.classList.contains('is-active') ){
                item.classList.add('is-active');
                toggleBody.style.height = 'auto';

                let setHeight = toggleBody.clientHeight + 'px';

                toggleBody.style.height = '0';

                setTimeout(()=>{
                    toggleBody.style.height = setHeight;
                },0)

            }else {
                item.classList.remove('is-active');
                toggleBody.style.height = '0';
            }
        })
    })
}


window.addEventListener('load', function() {
    findViewPort();
    includePath(() => {
        showViewport();
        setHeaderTitle(window.title);
        setSelectedNaviation(window.subTitle);
    });
    toggle();
});

window.addEventListener('resize', function() {
    findViewPort();
    showViewport();
});