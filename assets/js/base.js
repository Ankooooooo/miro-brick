// data-include-path
function includePath(callback) {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
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

// 메뉴별 타이틀 설정
function setHeaderTitle(title) {
    const el_header = document.querySelector('body > header');

    if (el_header?.className.includes('sub')) {
        const el = document.querySelector("body > header .header__title");
        el.innerText = window.isDetail && window.detailTitle ? window.detailTitle : title;
    }

    const elements = document.querySelectorAll('body > header .header__inner-menu [label]');

    elements.forEach(function (el) {
        if (el.getAttribute('label') === title) {
            el.classList.add('selected');
        }
    });
}

// Navigation 선택된 메뉴 설정
function setSelectedNaviation(title) {
    const elements = document.querySelectorAll('.navigation [label]');

    elements.forEach(function (el) {
        if (el.getAttribute('label') === title) {
            el.classList.add('selected');
        }
    });

    title === '공지' && document.querySelector('.navigation__list > .navigation__item-btn')?.remove();
}

// 사이드 메뉴 열기 or 닫기
function handleOpenCategory(value = true) {
    const el_category = document.querySelector('.category');

    if (value) {
        el_category?.classList.add('open');
        document.body.style.overflow = 'hidden';
    } else {
        el_category?.classList.remove('open');
        document.body.style.overflow = '';
    }
};

// Footer Show 여부 지정
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

    toggleTarget.forEach((e) => {
        e.style.height = 0;
    });

    toggle.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            let parent = item.closest(".toggle");
            let toggleBody = parent.querySelector('.toggleBody');

            if (!item.classList.contains('is-active')) {
                item.classList.add('is-active');
                toggleBody.style.height = 'auto';

                let setHeight = toggleBody.clientHeight + 'px';

                toggleBody.style.height = '0';

                setTimeout(() => {
                    toggleBody.style.height = setHeight;
                }, 0)

            } else {
                item.classList.remove('is-active');
                toggleBody.style.height = '0';
            }
        })
    })
}

function headerFixedTop() {
    const isPc = window.viewport === 'pc';

    const el = {
        header: document.querySelector('body > header') || '',
        navigation: document.querySelector('body > .navigation:not(.sub)') || '',
        main: document.querySelector('body > main') || ''
    };

    const height = { header: el.header.clientHeight || 0, nav: el.navigation.clientHeight || 0 };

    for( const item in el ) {
        if(!el[item]) continue;

        if(isPc) {
            el[item].style.position = '';
        } else {
            el[item].style.position = (item === 'main') ? 'relative' : 'fixed';
        }
    }

    if(el.navigation) {
        el.navigation.style.top = isPc ? '' : `${height['header']}px` ;
    }

    el.main.style.marginTop = isPc ? '' : `${height['header'] + height['nav']}px`;
}

window.isTop = false;
function hadnleScroll() {
    window.isTop = window.scrollY > 0 ? false : true;

    const el_header = document.querySelector('body > header') || '';
    const el_navigation = document.querySelector('body > .navigation:not(.sub)') || '';
    const el = el_navigation && !window.isDetail ? el_navigation : el_header;

    if(!isTop && window.viewport !== 'pc')  {
        el.classList && el.classList.add('headerShadow');
    } else {
        el.classList && el.classList.remove('headerShadow');
    }
}

// 개발 완료 후 추가
function changeDetailNavigation() {
    // 상세 페이지일 경우 BODY에 detail 클래스 추가
    if(window.isDetail) {
        document.body.classList.add('detail');
    } else {
        document.body.classList.remove('detail');
    }
}

function topScroll() {
    const topScroll = document.querySelector('.scrollTopBtn');
    const topScrollBtn = topScroll.querySelector('.scrollTopBtn__btn');

    window.scrollY > 0 ? topScroll.classList.remove('is-hide') : topScroll.classList.add('is-hide');
    
    topScrollBtn.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

// fileUploader 
function addFiles(files, text) {
    const fileName = files[0].name;

    text.classList.remove('is-empty');
    text.querySelector('span').innerText = fileName;
}

function fileUploader() {
    let fileUploader = document.querySelectorAll('.file');

    // file search input event 
    fileUploader.forEach(function(el){
        let fileInput = el.querySelector('.file__input');
        let fileName = el.querySelector('.fileName');
        let fileNameSpan = fileName.querySelector('span');
        let fileDelete = el.querySelector('.file__delete');


        fileInput.addEventListener('change', function(){
            if( fileInput.files.length > 0 ){
                fileName.classList.remove('is-empty');
                fileNameSpan.innerText = fileInput.files[0].name;
            }else if(fileInput.files.length = 0){
                fileName.classList.add('is-empty');
                fileNameSpan.innerText = '첨부한 파일이 없습니다.';
            }
        });

        fileDelete.addEventListener('click', function(){
            fileInput.value = null;
            fileName.classList.add('is-empty');
            fileNameSpan.innerText = '첨부한 파일이 없습니다.';
        })
    })

}

window.addEventListener('load', function () {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }

    findViewPort();
    includePath(() => {
        // html용
        setHeaderTitle(window.title);
        setSelectedNaviation(window.subTitle);
        headerFixedTop();
    });
    
    // == php용 ==
    setHeaderTitle(window.title);
    setSelectedNaviation(window.subTitle);
    headerFixedTop();
    // ===========

    toggle();
    changeDetailNavigation();
    hadnleScroll();
    fileUploader();
});

window.addEventListener('resize', function () {
    findViewPort();
    headerFixedTop();
    changeDetailNavigation();
});

window.addEventListener('scroll', function() {
    hadnleScroll();
    topScroll();
})
