    let content = document.getElementById("content");
    let knob = document.getElementById("knob");
    let maxScroll = content.scrollWidth - content.offsetWidth;

    let scrollTween = gsap.to(content, {scrollTo: {x: maxScroll}, duration: 5, paused: true});

    Draggable.create(knob, {
      type: "rotation",
      bounds: {minRotation: 0, maxRotation: 2500},
      onDrag: function () {
        let progress = normalize(this.rotation, 0, 2500);
        console.log("progress = ", progress);
        scrollTween.progress(progress);
      }
    });

    function normalize(value, min, max) {
      return (value - min) / (max - min);
    }