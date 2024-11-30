let content = document.getElementById("content");
let knob = document.getElementById("knob");
let maxScroll = content.scrollWidth - content.offsetWidth; // calculate maximum scroll distance
let progress;
let catButton = document.querySelector('.cat_btn');

// create scroll animation using GSAP
let scrollTween = gsap.to(content, {scrollTo: {x: maxScroll}, duration: 5, paused: true});

// initialize draggable knob with rotation bounds
Draggable.create(knob, {
  type: "rotation",
  bounds: {minRotation: 0, maxRotation: 2500},
  onDrag: function () {
    // normalize rotation value to determine scroll progress
    progress = normalize(this.rotation, 0, 2500);
    scrollTween.progress(progress);

    // check progress range and enable corresponding button actions
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
        // disable button actions outside specified ranges
        btnEnable = false;
        btnVolPlay = false;
        btnTxtRead = false;
        btnImgCrop = false;
        setButtonAction(null);
    }
  }
});

// normalize value to a range of 0 to 1
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

// set button action based on URL, or disable if no URL
function setButtonAction(url) {
    catButton.onclick = url ? () => window.location.href = url : null;
}
