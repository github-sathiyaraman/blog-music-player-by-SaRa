const music = document.querySelector('#audio-source');
const listaudio = document.querySelector('#listaudio');
const seek_slider = document.querySelector('.music-seek-bar');
var songName = document.querySelector('.current-song-name');
const movieName = document.querySelector('.movie-name');
const coverImage = document.querySelector('.cover');
const curr_time = document.querySelector('.current-time');
const total_duration = document.querySelector('.duration');
const listsong = document.querySelector('.listsong');
const lists = [...document.querySelectorAll('.lists')];
const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');
const controls = document.querySelector('.controls');
const homeposter = [...document.querySelectorAll('.homeposter img ')];
const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');
const backToMusicPlayer = document.querySelector('.playlist .back-btn');
const musicPlayerSection = document.querySelector('.music-player-section');
const playlistcard = document.querySelector('.playlist-card img');






var songs = songs;
//function
function revalue1(FILE_URL, async = true) {
    let scriptEle = document.createElement("script");
    document.getElementById('playlistsrc').remove()
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);
    scriptEle.setAttribute("id", "playlistsrc");

    document.body.appendChild(scriptEle);
    // success event 
    scriptEle.addEventListener("load", () => {
        console.log("File loaded")
        disSongs()
        var index = 0
        play_init(index, songs)
        songobj.pause()
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });
}

var l
function randomlistgenrator() {
    l = [];
    for (let i = 0; i < 20; i++) {
        //let's show on music list in home view
        var index = Math.floor(Math.random() * songs.length)
        var random_file = songs[index];

        l.push.apply(l, [{
            name: `${random_file.name}`,
            path: `${random_file.path}`,
            movie: `${random_file.movie}`,
            cover: `${random_file.cover}`
        }]);
    }
}
randomlistgenrator()
//audio fun
class InitSong {
    constructor(index, array) {
        this.updateSongs(index, array)
    }
    updateSongs(index, array) {
        this.songsList = array;
        this._setCurrentIndex(index)
        this._createAudio(array[index])
    }
    _setCurrentIndex(index) {
        this.currentIndex = index;
    }
    _createAudio(song) {
        seek_slider.value = 0;
        music.src = song.path;
        songName.innerHTML = song.name;

        movieName.innerHTML = song.movie;
        coverImage.src = song.cover;
        music.addEventListener('ended', () => {
            if (repeatBtn.className.includes('active')) {
                songobj.play();
            } else {

            }
        });
    }
    next() {
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songsList.length - 1;
        } else {
            this.currentIndex--;
        }
        this._createAudio(this.songsList[this.currentIndex]);
        music.play();
    }
    prev() {
        if (this.currentIndex >= this.songsList.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this._createAudio(this.songsList[this.currentIndex]);
        music.play();
    }
    play() {
        music.play();
        playBtn.classList.remove('active');
        pauseBtn.classList.add('active');
        coverImage.classList.remove("pause");
    }
    pause() {
        music.pause();
        pauseBtn.classList.remove('active');
        playBtn.classList.add('active');
        coverImage.classList.add('pause');
    }
}

music.addEventListener('ended', () => { //repeat fun
    if (repeatBtn.className.includes('active')) {

    } else {
        songobj.prev();
    }
});
/*document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    playlistSection.classList.toggle('active');
}, false);
*/
var songobj = new InitSong(0, songs);
updateTimer = setInterval(seekUpdate, 1000);
//////set default current music = 0
let currentMusic = 0;
///// displayshows/////////////////
let homeposterImageIndex = 0;
const changehomeposter = () => {
    homeposter[homeposterImageIndex].classList.toggle('active');
    if (homeposterImageIndex >= homeposter.length - 1) {
        homeposterImageIndex = 0;
    } else {
        homeposterImageIndex++;
    }
    homeposter[homeposterImageIndex].classList.toggle('active');
}
setInterval(() => {
    changehomeposter();
}, 3000);///set interval 3000 sec
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////       button functions
/////// back from music player
backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})
//////// access playlist
navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})
//seek
function seekTo() {
    let seekto = music.duration * (seek_slider.value / 100);
    music.currentTime = seekto;

    //seekbar change event
    seekBar.addEventListener('change', () => {
        music.currentTime = seekBar.value;
    })

}

//reset seek_slider durations
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}


//seek bar duration update functions
function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(music.duration)) {
        seekPosition = music.currentTime * (100 / music.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(music.currentTime / 60);
        let currentSeconds = Math.floor(music.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(music.duration / 60);
        let durationSeconds = Math.floor(music.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//////////////////////controls 
//darkmode
function darkbutton() {
    var element = document.body;
    element.classList.add("darkmode");
    element.classList.remove("autocolor");
}

function lightbutton() {
    var element = document.body;
    element.classList.add("autocolor");
    element.classList.remove("darkmode");
}

//key functions
document.body.onkeydown = function (e) {
    if (e.keyCode == 37) {

        songobj.next();
        playBtn.classList.remove('active');
        pauseBtn.classList.add('active');
        coverImage.classList.remove("pause");

    }
};

document.body.onkeyup = function (f) {
    if (f.keyCode == 39) {
        songobj.prev();
        playBtn.classList.remove('active');
        pauseBtn.classList.add('active');
        coverImage.classList.remove("pause");
    }
};

document.body.onkeypress = function (e) {
    if (e.keyCode == 32) {
        pauseBtn.classList.remove('active');
        playBtn.classList.add('active');
        coverImage.classList.add('pause');
        music.pause();
    }
};

// volume section
volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

// back from playlist to music player
backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})
//clicking controls section then the music player selection class name add active
controls.addEventListener('click', () => {
    musicPlayerSection.classList.add('active');
})

// repeat button
repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');

})

//update playlistloadon
playlistcard.addEventListener("click", () => {
    var index = 0
    play_init(index, songs)
});



//list function
function disSongs() {
    randomlistgenrator()
    var ulTaglisthome = document.getElementById("ullisthome");
    ulTaglisthome.innerHTML = ""
    list0 = l.length;
    for (let m = 0; m < list0; m++) {
        //let's show on music list
        let liTag1 = `<li li-index="${m + 1}" >
  <div class="playlist-card">
  <img src="${l[m].cover}" class="playlist-card-img" alt="assets/images/musiccover.jpeg" onclick="playforrandom(${m})">
  <p class="playlist-card-name">${l[m].name}</p>
  <audio src="${l[m].path}" ></audio>
  </li>`;

        ulTaglisthome.insertAdjacentHTML("beforeend", liTag1);
    }

    var ulTagmusics = document.getElementById("ul-musics");
    ulTagmusics.innerHTML = ""
    // let create li tags acording to array length for list
    liston = songs.length;
    for (let i = 0; i < liston; i++) {
        //let's show on musicsing song list
        var liTag1 = `<li li-index="${i + 1}" >
  <div class="playlist-card">
  <img src="${songs[i].cover}" class="playlist-card-img" onclick="playformylist(${i})" alt="assets/images/musiccover.jpeg">
  <p class="playlist-card-name">${songs[i].name}</p>
  </li>`;

        ulTagmusics.insertAdjacentHTML("beforeend", liTag1);

    }

    const ulTaglist = document.getElementById("ullist");
    ulTaglist.innerHTML = ''
    // let create li tags ccording to array length for list
    for (let i = 0; i < songs.length; i++) {
        //let's show the song name, movie from the array in playlist section
        let liTag = `<li  li-index="${i + 1}" onclick="playformylist(${i})">
      <div class="lists id="listplay" ">
      <div class="lists-cover">
      <img src="${songs[i].cover}" alt="assets/images/musiccover.jpeg" >
    </div>
    
    <p ><span class="Names" >${songs[i].name}</span></p> 
                  </div>
                  </li>`;

        ulTaglist.insertAdjacentHTML("beforeend", liTag);
    }
}
disSongs();
function playforrandom(index) {
    songobj.updateSongs(index, l)
    songobj.play()
}
function playformylist(index) {
    songobj.updateSongs(index, songs)
    songobj.play()
}
function play_init(index) {
    songobj.updateSongs(index, songs)
}

//nav
const nav = document.getElementById("navbar");
let navbar = `
  <div class="topnav" id="myTopnav">
  <a href="index.html" class="on">Home</a>
  <a href="contact.html">Contact</a>
  <div class="dropdown ">
    <button class="dropbtn">Dark Mode 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content ">
      <a class="dark" onclick="darkbutton()">Dark Mode ON</a>
      <a class="light" onclick="lightbutton()">Dark Mode OFF</a>

    </div>
  </div> 
  <a href="about.html">About</a>
  <a href="javascript:void(0);" style="font-size:15px;" class="iconnav" onclick="myFunctionnav()">&#9776;</a>
</div>
  
  ` ;
nav.insertAdjacentHTML("beforeend", navbar);

function myFunctionnav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
//end nav