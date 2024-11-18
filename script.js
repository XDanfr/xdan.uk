// View counter
let viewCount = localStorage.getItem('viewCount') || 0;
viewCount++;
localStorage.setItem('viewCount', viewCount);
document.getElementById('view-count').textContent = viewCount;

// Copy Discord username to clipboard
document.getElementById('discord-username').addEventListener('click', function (event) {
    const discordUsername = "hyperquasistatic";
    navigator.clipboard.writeText(discordUsername).then(() => {
        const copyMessage = document.getElementById('copy-message');

        copyMessage.style.left = `${event.pageX}px`;
        copyMessage.style.top = `${event.pageY}px`;
        copyMessage.style.opacity = 1;

        function moveMessage(e) {
            copyMessage.style.left = `${e.pageX}px`;
            copyMessage.style.top = `${e.pageY}px`;
        }

        document.addEventListener('mousemove', moveMessage);

        setTimeout(() => {
            copyMessage.style.opacity = 0;
            document.removeEventListener('mousemove', moveMessage);
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// Now Playing bar functionality
const audio = document.getElementById('background-audio');
const playPauseButton = document.getElementById('play-pause');
const muteButton = document.getElementById('mute');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationTimeDisplay = document.getElementById('duration-time');

// Start playing on load
audio.volume = 1; // Max volume on open
audio.play();
playPauseButton.innerHTML = '&#10074;&#10074;'; // Set button to pause symbol

// Set duration time when audio is loaded
audio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audio.duration);
    durationTimeDisplay.textContent = duration;
});

// Play/Pause button
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '&#10074;&#10074;'; // Change to pause symbol
    } else {
        audio.pause();
        playPauseButton.innerHTML = '&#9654;'; // Change to play symbol
    }
});

// Mute button
muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteButton.innerHTML = audio.muted ? '&#128263;' : '&#128266;';
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    
    // Update current time display
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Seek in audio
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
