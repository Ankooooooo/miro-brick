// 마우스 드래그 스크롤 기능 및 가로 스크롤
function dragToScroll(selector_name) {
    const target = document.querySelector(`${selector_name} .drag__area`);
    if (!target) return;

    let isDown = false;
    let startX = 0, scrollLeft = 0;

    // 마우스 드래그
    target.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - target.offsetLeft;
        scrollLeft = target.scrollLeft;
    });

    target.addEventListener('mouseleave', () => isDown = false);
    target.addEventListener('mouseup', () => isDown = false);

    target.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - target.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        target.scrollLeft = scrollLeft - walk;
    });
};
