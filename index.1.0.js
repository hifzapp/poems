const poemText = document.getElementById('poem-text');
const poemAudio = document.getElementById('poem-audio');
var startLine = 1;
var stopLine = 1;
var repeatCount = 1;

var isPlaying = false;

const audioFiles = ['0.mp3', 'T0101.mp3', 'T0102.mp3', 'T0103.mp3', 'T0104.mp3', 'T0105.mp3', 'T0201.mp3', 'T0202.mp3', 'T0203.mp3', 'T0204.mp3', 'T0205.mp3', 'T0206.mp3', 'T0207.mp3', 'T0208.mp3', 'T0209.mp3', 'T0210.mp3', 'T0211.mp3', 'T0301.mp3', 'T0401.mp3', 'T0402.mp3', 'T0403.mp3', 'T0404.mp3', 'T0405.mp3', 'T0406.mp3', 'T0501.mp3', 'T0502.mp3', 'T0503.mp3', 'T0504.mp3', 'T0505.mp3', 'T0506.mp3', 'T0601.mp3', 'T0602.mp3', 'T0603.mp3', 'T0604.mp3', 'T0605.mp3', 'T0701.mp3', 'T0702.mp3', 'T0703.mp3', 'T0704.mp3', 'T0705.mp3', 'T0706.mp3', 'T0707.mp3', 'T0801.mp3', 'T0802.mp3', 'T0803.mp3', 'T0804.mp3', 'T0805.mp3', 'T0806.mp3', 'T0901.mp3', 'T0902.mp3', 'T0903.mp3', 'T0904.mp3', 'T0905.mp3', 'T0906.mp3', 'T0907.mp3', 'T0908.mp3', 'T0909.mp3', 'T0910.mp3', 'T1001.mp3', 'T1002.mp3', 'T1003.mp3', 'T1004.mp3']


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
    poemAudio.src = "audio/1/" + audioFiles[line];
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