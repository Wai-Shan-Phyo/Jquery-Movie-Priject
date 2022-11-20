//import * as link from "../link.js";

// navbar background-color
window.addEventListener("scroll",()=>{
    if(window.scrollY>400){
        $("#navcolor").css("background-color","#115fc4");
    }else{
        $("#navcolor").css("background-color","#00204a");
    }
});
// loading
window.addEventListener("load",()=>{
    document.querySelector(".loader").style.display="none";
    //console.log("F")
})
//fetch API
const url={
    apikey:"api_key=ec58d4bebc90d7769b644a3b411df94e",
    baseurl:"https://api.themoviedb.org/3/discover/movie?",
    movieurl:"https://api.themoviedb.org/3/movie/top_rated?",
    collection:"https://api.themoviedb.org/3/collection/",
    discover:"https://api.themoviedb.org/3/discover/tv?",
    showtrail:"/movie/"
}

const discover=url.discover+url.apikey+"&sort_by=popularity.desc";
console.log(discover)
const movieUrl=url.movieurl+url.apikey;
//console.log(movieUrl);

const IMG="https://image.tmdb.org/t/p/w500/";
const popularUrl=url.baseurl+url.apikey+"&sort_by=popularity.desc";
console.log(popularUrl)
const searchUrl="https://api.themoviedb.org/3/search/movie?"+url.apikey;

fetchmovie(popularUrl);
function fetchmovie(path) {
    
    fetch(path)
    .then(res=>res.json())
    .then(data=>movie(data))
}
function movie(data){
    let res =data.results;
  // console.log(res)
  $("#heading").html("");

res.forEach(e => {
    showresult(e)
   });
}


function showresult(element){
   // console.log(element.original_t);
     // console.log(element)
     const div=document.createElement("div");
     //const div=$("<div></div>");
     div.className="col-6 col-sm-4 col-md-3 col-lg-2";
     div.innerHTML=`<div>
     <a href="link.html" target="_blank"><img  src="${IMG+element.poster_path}"></a>
     
<div class="hr">
<span class="text-warning" id="title">${element.original_title}</span>
<span class="ratingbg">${element.vote_average.toFixed(1)}</span>
</div>  
<div class="detail d-none">
   <p class="bimg">${IMG+element.poster_path}</p>
   <p class="overview">${element.overview}</p>
   <p class="rd">${element.release_date}</p>
   <p class="id">${element.id}</p>
</div>              
</div>`;
   //console.log(element.id)
     $("#heading").append(div);
    // hover click
  
    let image=Array.from($("img"));
    image.forEach((i)=>{
      imagehover(i);
      //console.log(element.id);
    
   });
  
}
function ihover(i){
    //console.log(i)  
    $(i).hover(()=>{
      $(i).css("opacity","0.5");
  },function(){
      $(i).css("opacity","1");
  });
  $(i).click((is)=>{
    //title
   
let title=(is.target.parentElement.parentElement.children[1].firstElementChild.innerHTML);
 //img
let img=(is.target.parentElement.parentElement.children[2].firstElementChild.innerHTML);
//Rating
let rate=(is.target.parentElement.parentElement.children[1].lastElementChild.innerHTML);
 //Release Date
let rd=(is.target.parentElement.parentElement.children[2].children[2].innerText);
//  overview 
let overview=(is.target.parentElement.parentElement.children[2].children[1].innerText);

//movieid
// let movieid=is.target.parentElement.parentElement.children[2].children[3].innerText;
console.log(is.target.parentElement.parentElement)

 //console.log(is.target.parentElement.parentElement.children[2].children[3].innerText)
 holly(title,img,rate,rd,overview);
})
}
function holly(title,img,rate,rd,overview){
    localStorage.setItem("Title",title);
    localStorage.setItem("Img",img);
    localStorage.setItem("Rate",rate);
    localStorage.setItem("ReleaseDate",rd);
    localStorage.setItem("Over",overview);
}

function imagehover(i){
      //console.log(i)  
      $(i).hover(()=>{
        $(i).css("opacity","0.5");
    },function(){
        $(i).css("opacity","1");
    });
    $(i).click((is)=>{
        //title
       
  let title=(is.target.parentElement.parentElement.children[1].firstElementChild.innerHTML);
     //img
  let img=(is.target.parentElement.parentElement.children[2].firstElementChild.innerHTML);
   //Rating
let rate=(is.target.parentElement.parentElement.children[1].lastElementChild.innerHTML);
     //Release Date
 let rd=(is.target.parentElement.parentElement.children[2].children[2].innerText);
//  overview 
let overview=(is.target.parentElement.parentElement.children[2].children[1].innerText);

//movieid
let movieid=is.target.parentElement.parentElement.children[2].children[3].innerText;


     //console.log(is.target.parentElement.parentElement.children[2].children[3].innerText)
  finalresult(title,img,rate,rd,overview,movieid);
    })
}
 function  finalresult(title,img,rate,rd,overview,movieid){
    const showmoviedata="https://api.themoviedb.org/3"+url.showtrail+movieid+"/videos?"+url.apikey;
// console.log(showmoviedata)
 fetch(showmoviedata)
 .then(res=>res.json())
 .then(data=>showtrailers(data))
 function showtrailers(data){
     let datatres=data.results;
     //console.log(IMG+datatres.backdrop_path);
    //console.log(datatres)
    datatres.forEach((trailer)=>{
      //console.log(trailer)
      if(trailer.type==="Trailer"){
        let key=([trailer][0].key);
        localStorage.setItem("key",key);
      }
    })
    
}
       localStorage.setItem("Title",title);
       localStorage.setItem("Img",img);
       localStorage.setItem("Rate",rate);
       localStorage.setItem("ReleaseDate",rd);
       localStorage.setItem("Over",overview);
    //    localStorage.setItem("mid",movieid);
 }

// Search
$("#search").keypress((e)=>{
   // console.log(e.keyCode)
    let val=$("#search").val();
  if(e.keyCode===13 ){
    if(val){
       fetchmovie(searchUrl+"&query="+val);
       $("#search").val("");
      // document.querySelector("#search").value="";
      }else{
        fetchmovie(popularUrl);
        $("#search").val("");
        //document.querySelector("#search").value="";
   }
  };
  
});
let ok=false;
// discover movie
$(".series").click(()=>{
     if(ok){
           $("#del").empty();
           jp();
           ok=false;
     }
     
    $(".mus").removeClass("active")
    $(".ser").addClass("active");
    $(".pop").removeClass("active");
dmovie(discover);
function dmovie(path) {
    fetch(path)
    .then(res=>res.json())
    .then(data=>series(data))
}
function series(data){
    let res =data.results;
  // console.log(res)
  $("#heading").html("");

res.forEach(e => {
    showresult(e)
   });
}
function showresult(element){
   // console.log(element.original_title);
     // console.log(element)
     const div=document.createElement("div");
     //const div=$("<div></div>");
     div.className="col-6 col-sm-4 col-md-3 col-lg-2";
     div.innerHTML=`  div>
     <a href="link.html" target="_blank"><img  src="${IMG+element.poster_path}"></a>
     
<div class="hr">
<span class="text-warning" id="title">${element.original_name}</span>
<span class="ratingbg">${element.vote_average.toFixed(1)}</span>
</div>  
<div class="detail d-none">
   <p class="bimg">${IMG+element.poster_path}</p>
   <p class="overview">${element.overview}</p>
   <p class="rd">${element.first_air_date}</p>
   <p class="id">${element.id}</p>
</div>              
</div>`;
     $("#heading").append(div);

    let image=Array.from($("img"));
    image.forEach((i)=>{
      imagehover(i);
   });
  
}
});
// popular
$(".popular").click(()=>{
    fetchmovie(popularUrl);
    $(".mus").removeClass("active")
    $(".ser").removeClass("active");
    $(".pop").addClass("active");
})


// Global Variable

let musics = [
  {
  id : 1,
  title : "ALone",
  singer : "Alan Worker",
  img_path : "img/1.jpg",
  music_path : "music/a.mp3"
  },
  {
  id : 2,
  title : "AloneII",
  singer : "Alan Worker",
  img_path : "img/3.jpg",
  music_path : "music/b.mp3"
  },
  {
    id : 3,
    title : "On Our Way",
    singer : "Royal Concept",
    img_path : "img/1.jpg",
    music_path : "music/c.mp3"
    },
    {
    id : 4,
    title : "Queen Of Heart",
    singer : "Juice Newton",
    img_path : "img/2.jpeg",
    music_path : "music/e.mp3"
    },
    {
        id : 5,
        title : "Miss Ya",
        singer : "Khin Mg Toe",
        img_path : "img/5.jpeg",
        music_path : "music/d.mp3"
        }
 
];
function jp(){
    track.pause();
}
function justPause(){
   
    playing = false;
    track.pause();
   
    play.className = "fas fa-play";
    
    
}
const track = document.createElement("audio");

// MUSIC
$(".home").click(()=>{
    ok=true;

    $(".mus").addClass("active")
    $(".ser").removeClass("active");
    $(".pop").removeClass("active");
    $("#heading").html("");
    $("#heading").html(
      `
      <section id="del">
      <div class="container">

          <div class="nav">
              <p><span id="current"></span>/<span id="count"></span></p>
              <i class="fas fa-bars" id="menu"></i>
          </div>

          <ul id="nav-list">
              <!-- <li>
                  <div>
                      <h3>Music Title 1</h3>
                      <p>Singer</p>
                  </div>
                  <i class="fas fa-play" id="playSingle"></i>
              </li> -->
              
          </ul>

          <h1 id="title">Music Title 3</h1>

          <p id="singer">Artist</p>

          <img src="img/1.jpg" alt="" id="poster">

          <div class="btn-container">
              <i class="fas fa-caret-left"  id="prev"></i>
              <i class="fas fa-play" id="play"></i>
              <i class="fas fa-caret-right" id="next"></i>
          </div>

          <input type="range" id="range" min="0" max="100">
      </div>
  </section>

  
      `
    );
  





    // DOM Selector

const current = $("#current");
const count = $("#count");
const menu = $("#menu");
const navList = $("#nav-list");
const title = $("#title");
const singer =$("#singer");
const poster = document.querySelector("#poster");
const prev = $("#prev");
const play = document.querySelector("#play");
const next =$("#next");
const range = document.querySelector("#range");


// Global Variable



    let playing = false;

    let index = 0;

   

    // load Track 

    function loadTrack(i){
        let index = Number(i);
        
        title.html(musics[index].title);
        singer.html(musics[index].singer);
        poster.src = musics[index].img_path;

        track.src = musics[index].music_path;
        track.load();

        current.html(index + 1);
        count.html(musics.length);

        setInterval(trackCurrentTime,1000);

    }

    loadTrack(index);


    // check play or pause

    function checkMusic(){
        playing === true ? justPause() : justPlay();
    }

    // just Play

    function justPlay(){
        track.play();
        playing = true;

        play.className = "fas fa-pause";
    }

    // just Pause
    function justPause(){
   
        playing = false;
        track.pause();
       
        play.className = "fas fa-play";
        
        
    }
     

    // prev Song

    function prevSong(){
        if(index <= 0) index = musics.length - 1;
        else index--;

        loadTrack(index);

        playing =  false;
        checkMusic();

    }

    // next Song

    function nextSong(){
        if(index >= musics.length - 1) index = 0;
        else index++;

        loadTrack(index);

        playing =  false;
        checkMusic();
        
    }


    // Slider Dynamic

    function trackCurrentTime(){
        range.value = track.currentTime * (100 / track.duration);

        if(track.ended){
            nextSong();
        }
    }

    // Dynamic Range

    function changeRange(){
        track.currentTime =  range.value * (track.duration / 100);
    }

    // Nav List Toogle

    function toggleMenu(){
        navList.toggleClass("nav-list-active");
        menu.toggleClass('fa-times');
    }

    // fetch music in nav list

    musics.map((music,index) => {
        let li = document.createElement("li");
        li.innerHTML = `<div>
                            <h3>${music.title}</h3>
                            <p>${music.singer}</p>
                        </div>
                        <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>
                        `;

        navList.append(li);
    });

    // load Single Song

    function loadSingleSong(e){
        if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-play")){
            loadTrack(e.target.classList[1]);

            playing = false;
            checkMusic();

            Array.from(navList.children).forEach(li => {
                li.lastElementChild.classList.remove("fa-pause");
                li.lastElementChild.classList.add("fa-play");
            });

            e.target.classList.add("fa-pause");
            e.target.classList.remove('fa-play');

        }
        else if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-pause")){
            playing = true;
            checkMusic();
            e.target.classList.add("fa-play");
            e.target.classList.remove('fa-pause');
        }
        else{
            navList.classList.toggle("nav-list-active");
            menu.toggleClass('fa-times');
        }
    }


    // Event Listener

    play.addEventListener('click',checkMusic);
    prev.click(prevSong);
    next.click(nextSong);
    range.addEventListener('change',changeRange);
    menu.click(toggleMenu)
    navList.click(loadSingleSong);


    

});

  // {
  // id : 3,
  // title : "Tha Di Ya Yin",
  // singer : "Eternal Gosh",
  // img_path : "img/3.jpg",
  // music_path : "music/3.mp3"
  // },
  // {
  // id : 4,
  // title : "Danyar Houng Myar..",
  // singer : "Zaw Win Htut",
  // img_path : "img/4.jpg",
  // music_path : "music/4.mp3"
  // },
  // {
  // id : 5,
  // title : "Lamin Tean Chin",
  // singer : "Eternal Gosh",
  // img_path : "img/5.jpg",
  // music_path : "music/5.mp3"
  // }
   