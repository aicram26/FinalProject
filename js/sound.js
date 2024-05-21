let  song = document.querySelector("#sound");
let playBtn = document.querySelector("#play-button");
let playlBtn = document.querySelector("#playl-button");

playBtn.addEventListener('click', function(){
    sound.play();
})
// playlBtn.addEventListener('click', function(){
//     mix.play();
// })
sound.onloadeddata = function(){
    playBtn.style.visibility = "visible";
}
mix.onloadeddata = function(){
    playBtn.style.visibility = "visible";
}