const poemText = document.getElementById('poem-text');
const poemAudio = document.getElementById('poem-audio');
var startLine = 1;
var stopLine = 1;
var repeatCount = 1;

var isPlaying = false;

const audioFiles = [
    '00.mp3', '01.mp3', '02.mp3', '03.mp3', '04.mp3', '05.mp3', '06.mp3', '07.mp3', 
    '08.mp3', '09.mp3', '10.mp3', '11.mp3', '12.mp3', '13.mp3', '14.mp3', '15.mp3', 
    '16.mp3', '17.mp3', '18.mp3', '19.mp3', '20.mp3', '21.mp3', '22.mp3', '23.mp3', 
    '24.mp3', '25.mp3', '26.mp3', '27.mp3', '28.mp3', '29.mp3', '30.mp3', '31.mp3', 
    '32.mp3', '33.mp3', '34.mp3', '35.mp3', '36.mp3', '37.mp3', '38.mp3', '39.mp3', 
    '40.mp3', '41.mp3', '42.mp3', '43.mp3', '44.mp3', '45.mp3', '46.mp3', '47.mp3', 
    '48.mp3', '49.mp3', '50.mp3', '51.mp3', '52.mp3', '53.mp3', '54.mp3', '55.mp3', 
    '56.mp3', '57.mp3', '58.mp3', '59.mp3', '60.mp3', '61.mp3'
];


function applyPlaybackRange() {
    startLine = parseInt(document.getElementById('start').value);
    stopLine = parseInt(document.getElementById('stop').value);
    repeatCount = parseInt(document.getElementById('repeat').value);
    
    console.log(repeatCount);
}

function togglePlay(on) {
    if (on) {
        isPlaying = true;
        document.getElementById('play').innerText = "Stop Audio";
    }
    else {
        isPlaying = false;
        document.getElementById('play').innerText = "Play Audio";
    }
}

function playAudio() {
    if (!isPlaying) {
        togglePlay(true);
        applyPlaybackRange();
        let currentLine = startLine;
        let currentRepeat = repeatCount;
        playLine(currentLine, currentRepeat);
    }
    else {
        togglePlay(false);
    }
    colorLine();
}

function playClick(data_line) {
    togglePlay(true);
    console.log(data_line);
    let currentLine = parseInt(data_line);

    document.getElementById('start').value = data_line;
    document.getElementById('stop').value = data_line;
    playLine(currentLine, repeatCount);
}

function playLine(line, repeat) {
    if (!isPlaying || (line + 1 > stopLine && repeat < 1)) {
        togglePlay(false);
        return;
    }
    console.log(line, repeat);
    poemAudio.src = "audio/" + audioFiles[line];
    poemAudio.play();
    highlightLine(line);

    poemAudio.onended = function () {
        if (line + 1 > stopLine) {
            if (repeat > 1) {
                playLine(startLine, repeat - 1);
            } else {
                togglePlay(false);
            }
        } else {
            playLine(line + 1, repeat);
        }
    };
}

function highlightLine(line) {
    const lines = document.querySelectorAll('.line');
    lines.forEach(l => l.classList.remove('highlight'));
    const currentLine = document.querySelector(`.line[id="${line}"]`);
    if (currentLine) {
        currentLine.classList.add('highlight');
    }
}

function startLineChange(line) {
    document.getElementById('stop').min = line;
    if (parseInt(document.getElementById('stop').value) < parseInt(line)) {
        document.getElementById('stop').value = line;
    }
    if (!isPlaying) {
        colorLine();
    }
}

function stopLineChange(line) {
    if (!isPlaying) {
        colorLine();
    }
}

function colorLine(){
    const start = parseInt(document.getElementById('start').value);
    const stop = parseInt(document.getElementById('stop').value);
    
    const lines = document.querySelectorAll('.line');
    
    lines.forEach(l => l.classList.remove('font-brown'));
    
    for (let i = start; i <= stop; i++) {
        const currentLine = document.querySelector(`.line[id="${i}"]`);
        if (currentLine) {
            currentLine.classList.add('font-brown');
        }
    }
}

function toggleDropdown() {
    const navi = document.querySelector('.navi');
    navi.classList.toggle('active');
}
