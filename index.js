let startLine = 1;
let stopLine = 1;
let repeatTimes = 1;

    function applyPlaybackRange() {
        startLine = parseInt(document.getElementById('start').value);
        stopLine = parseInt(document.getElementById('stop').value);
        repeatTimes = parseInt(document.getElementById('repeat').value);
    }

    function playAudio() {
        const audioElement = document.getElementById('poem-audio');
        audioElement.currentTime = getStartTimeForLine(startLine);
        const duration = getDurationForLines(startLine, stopLine);

        audioElement.play();

        let repetitions = 0;
        audioElement.addEventListener('timeupdate', function() {
            if (audioElement.currentTime >= getStartTimeForLine(stopLine) + duration) {
                repetitions++;
                if (repetitions < repeatTimes) {
                    audioElement.currentTime = getStartTimeForLine(startLine);
                } else {
                    audioElement.pause();
                }
            }
        });
    }