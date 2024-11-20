let content = document.getElementById("content");
let knob = document.getElementById("knob");
let maxScroll = content.scrollWidth - content.offsetWidth;
let progress;
let catButton = document.querySelector('.cat_btn');


let scrollTween = gsap.to(content, {scrollTo: {x: maxScroll}, duration: 5, paused: true});

Draggable.create(knob, {
  type: "rotation",
  bounds: {minRotation: 0, maxRotation: 2500},
  onDrag: function () {
    progress = normalize(this.rotation, 0, 2500);
    scrollTween.progress(progress);

    if (progress >= 0.01 && progress <= 0.048) {
        btnEnable = true;
        btnVolPlay = true;
        setButtonAction('vol_player.html');
    } else if (progress >= 0.27 && progress <= 0.31) {
        btnEnable = true;
        btnTxtRead = true;
        setButtonAction('txt_readitor.html');
    } else if (progress >= 0.70 && progress <= 0.82) {
        btnEnable = true;
        btnImgCrop = true;
        setButtonAction('img_cropper.html');
    } else {
        btnEnable = false;
        btnVolPlay = false;
        btnTxtRead = false;
        btnImgCrop = false;
        setButtonAction(null);
    }

}
});

function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function setButtonAction(url) {
    catButton.onclick = url ? () => window.location.href = url : null;
}