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
    
    if (innerWidth <= 834) window.viewport = 'mobile'
    else if (innerWidth > 834 && innerWidth <= 1312) window.viewport = 'tablet'
    else window.viewport = 'pc'
}

function showViewport() {
    var allElements = document.querySelectorAll('[data-viewport]');
    allElements.forEach(function(el) {
        var viewport = el.dataset.viewport;
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
    const el_header = document.querySelector('header');

    if (el_header.className.includes('sub')) {
        const el = document.querySelector(".header__title");
        el.innerText = title;
    } else {
        const elements = document.querySelectorAll('.header [label]');

        elements.forEach(function(el) {
            if(el.getAttribute('label') === title) {
                el.classList.add('selected');
            }
        });
    }
}

// Navigation 선택된 메뉴 설정
function setSelectedNaviation(title) {
    const elements = document.querySelectorAll('.navigation [label]');

    elements.forEach(function(el) {
        if(el.getAttribute('label') === title) {
            el.classList.add('selected');
        }
    });
}

window.addEventListener('load', function() {
    findViewPort();
    includePath(() => {
        showViewport();
        setHeaderTitle(window.title);
        setSelectedNaviation(window.subTitle);
    });
});

window.addEventListener('resize', function() {
    findViewPort();
    showViewport();
});
