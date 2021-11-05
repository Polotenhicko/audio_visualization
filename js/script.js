const audio = document.getElementById("audio"),
    logo = document.getElementById("logo").style;
let context, analyser, src, array;

document.getElementById("logo").onclick = function () {
    play();
}

window.onkeydown = function (event) {
    if (event.keyCode == 32 && event.repeat == false) {
        play();
    }
}

function play() {
     if (!context) {
        prepare();
    }
    if (audio.paused) {
        audio.play();
        loop();
    } else {
        audio.pause();
    }
}

function prepare(param) {
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop() {
    if (!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    logo.minHeight = (array[255]) + "px";
    logo.width = (array[255]) + "px";    
}