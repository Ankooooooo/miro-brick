// data-include-path
window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

window.device = 'mobile';



function findViewType() {
    let { innerWidth } = window
    
    if (innerWidth <= 390) window.device = 'mobile'
    else if (innerWidth > 390 && innerWidth <= 834) window.device = 'tablet'
    else window.device = 'window'
    
    console.log('innerWidth', innerWidth);
    console.log('device', window.device);
}


// Mobile 여부 확인
window.addEventListener('load', function() {
    findViewType();
});

// ====== 창 리사이즈때마다 현재 기기가 무엇인지 판단
window.addEventListener('resize', function() {
    findViewType();
});