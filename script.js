console.log("welcome to spotify");

// Initialize Variables
let songIndex = 0;
let audioElement ;
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let playPre = document.getElementById('preSong');
let playNext = document.getElementById('nextSong');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let playIcons= Array.from(document.getElementsByClassName("playThisSong"));
let banner = document.getElementsByClassName('banner');
let currentSongName=document.getElementsByClassName('currentSong');
// array of songs
let songs = [
    {songName: "Gundellonaa.mp3", 
    filePath: "./songs/[iSongs.info] 03 - Gundellonaa.mp3",
    coverPath: "./thumbnails/Ori-Devuda.jpg" },
    {songName: "Pataas Pilla.mp3", 
     filePath: "./songs/[iSongs.info] 02 - Pataas Pilla.mp3",
     coverPath: "./thumbnails/dj tillu.jpg" },
    {songName: "Oh Sita Hey Rama.mp3", 
     filePath: "./songs/[iSongs.info] 01 - Oh Sita Hey Rama.mp3",
     coverPath: "./thumbnails/Sita-Ramam.jpg" },
    {songName: "Deva Deva.mp3", 
     filePath: "./songs/[iSongs.info] 02 - Deva Deva.mp3",
     coverPath: "./thumbnails/bramhastra.jpg" },
    {songName: "Tillu Anna.mp3", 
     filePath: "./songs/[iSongs.info] 01 - Tillu Anna DJ Pedithe.mp3",
     coverPath: "./thumbnails/dj tillu.jpg" },
     {songName: "Kumkuumala.mp3", 
     filePath: "./songs/[iSongs.info] 01 - Kumkumala.mp3",
     coverPath: "./thumbnails/bramhastra.jpg" },
]

//list the songs onto web page
songItems.forEach((element ,i)=>{
    element.getElementsByClassName('songImage')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText= songs[i].songName;
});

//make all songs paused
let makeAllPlay = ()=>{
    playIcons.forEach((element,i)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

//handel master play/pause click and gif opacity
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
        playIcons[songIndex].classList.remove('fa-play');
        playIcons[songIndex].classList.add('fa-pause');
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
        makeAllPlay(); 
    }
});

// change progressbar & auto play next song
function changeProgressBar (){
    audioElement.addEventListener("timeupdate",()=>{ 
        progressBar.value = parseInt((audioElement.currentTime/audioElement.duration)*100);
        if(audioElement.currentTime == audioElement.duration){
            makeAllPlay();
            if(songIndex>=5){
                songIndex = 0;
            }
            else{
                songIndex+=1;
            }
            changeSong(songIndex);
        }
    });
    progressBar.addEventListener("change",()=>{
        audioElement.currentTime = parseInt((progressBar.value*audioElement.duration)/100);
    });
};
//Initial Song
function initialSong() {
    audioElement = new Audio(songs[songIndex].filePath);
    banner[0].src = songs[songIndex].coverPath;
    currentSongName[0].innerText = songs[songIndex].songName;
    changeProgressBar();
}
initialSong();



//play a particular song
playIcons.forEach((element,i)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlay();
        audioElement.pause();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
        audioElement = new Audio(songs[i].filePath);
        banner[0].src = songs[i].coverPath;
        currentSongName[0].innerText = songs[i].songName;
        progressBar.value=0;
        audioElement.play();
        songIndex=i;
        changeProgressBar();
    });
});

//change a song
function changeSong (songIndex){
    makeAllPlay();
    audioElement.pause();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity=1;
    audioElement = new Audio(songs[songIndex].filePath);
    banner[0].src = songs[songIndex].coverPath;
    currentSongName[0].innerText = songs[songIndex].songName;
    progressBar.value=0;
    audioElement.play();
    playIcons[songIndex].classList.remove('fa-play');
    playIcons[songIndex].classList.add('fa-pause');
    changeProgressBar();
}

// paly next song
playNext.addEventListener("click",(e)=>{
    makeAllPlay(); 
    audioElement.pause();
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    changeSong(songIndex);
});

//play previous song
playPre.addEventListener("click",(e)=>{
    makeAllPlay(); 
    audioElement.pause();
    if(songIndex<=0){
        songIndex=5;
    }
    else{
        songIndex-=1;
    }
    changeSong(songIndex);
});

//pause on pressing space bar
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        if(audioElement.paused || audioElement.currentTime<=0)
        {
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity=1;
            playIcons[songIndex].classList.remove('fa-play');
            playIcons[songIndex].classList.add('fa-pause');
        }
        else
        {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
            makeAllPlay(); 
        }
    }
  }
  