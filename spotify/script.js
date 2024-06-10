

console.log('hi bro');
currentSong = new Audio();  
let songs;
let currFolder;

function formatSecondsToMinutesAndSeconds(seconds) {
    seconds = parseInt(seconds);

    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
}




async function getsongs(folder) {
    currFolder = folder;       
    let a = await fetch(`/${currFolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
   //very important to understand
   let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
   songUL.innerHTML=""
   for (const song of songs) {

       songUL.innerHTML = songUL.innerHTML + `<li>
     
       <img class="invert" src="music.svg" alt="">
       <div class="info">
           <div>${song.replaceAll("%20", " ")}</div>
           <div></div>
       </div>
       <div class="playnow">                   <span>playnow</span>
       <img class="invert" src="play.svg">
   </div>    </li>`;
   

}


//attach an event listener to the current song    
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
   e.addEventListener("click", element=>{
       console.log(e.querySelector(".info").firstElementChild.innerHTML)
       
       playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

   })

  
})
}


const playMusic=(track, pause=false)=>{
//let audio = new Audio("/songs/"+ track)
currentSong.src = `/${currFolder}/` + track
if(!pause){
    
currentSong.play()
}
play.src="pause.svg"
document.querySelector(".songinfo").innerHTML=decodeURI(track)
document.querySelector(".songtime").innerHTML="00:00"

}
//here is the fucking problem, linking the cards
async function displayAlbums(){
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
     for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
          
        if(e.href.includes("/songs/")){
            let folder = e.href.split("/").slice(-1)[0]
            //getting metadata
            let a = await fetch(`/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response)
            cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}"  class="card">
            <div class="play">
                
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="13" fill="#4CAF50" />
                    <circle cx="15" cy="15" r="13" stroke="#141B34" stroke-width="1.5" />
                    <path
                        d="M18.4531 15.3948C18.3016 16.0215 17.5857 16.4644 16.1539 17.3502C14.7697 18.2064 14.0777 18.6346 13.5199 18.4625C13.2893 18.3913 13.0793 18.2562 12.9098 18.07C12.5 17.6198 12.5 16.7465 12.5 15C12.5 13.2535 12.5 12.3802 12.9098 11.9299C13.0793 11.7438 13.2893 11.6087 13.5199 11.5375C14.0777 11.3654 14.7697 11.7936 16.1539 12.6498C17.5857 13.5356 18.3016 13.9785 18.4531 14.6052C18.5156 14.8639 18.5156 15.1361 18.4531 15.3948Z"
                        stroke="#141B34" stroke-width="1.5" stroke-linejoin="round" />
                </svg>


            </div>
            <img class="rounded" src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div> `
        }
     }
    


//load a new list everytime another card is played
Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click",async item=>{ 
        songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
               
    })
})

7

}


async function main() {



    //getting list of all the songs
    await getsongs("songs/ncs")
    playMusic(songs[0],true)

 
//display all the albums on the page
displayAlbums();


//attach an event listener to play,previous,next
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src="pause.svg"
    }
    
    else{
        currentSong.pause()
        play.src="play.svg"
    }
})
//listen for time update
currentSong.addEventListener("timeupdate",()=>{

    
    document.querySelector(".songtime").innerHTML = `${formatSecondsToMinutesAndSeconds(currentSong.currentTime)}/${formatSecondsToMinutesAndSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"
}) 

//adjusting seekbar through event
document.querySelector(".seekbar").addEventListener("click", e=>{

    let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent)/ 100 ;
    
})


//add event listener for a hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0"
})

//add event listener to close the hamburger
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-100%"
    }) 


//add event listener to prev and next

previous.addEventListener("click",()=>{
    let index = songs.indexOf( currentSong.src.split("/").slice(-1)[0])
    

    if((index-1) >= length){
        playMusic(songs [index-1])
    }
    

})


next.addEventListener("click",()=>{

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

    if((index+1) < songs.length){
        playMusic(songs[index+1])
    }
    

})

//event for the volume bar
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    
    currentSong.volume = parseInt(e.target.value)/100
})

//event for muting track
document.querySelector(".volume>img").addEventListener("click", e=>{
  if(e.target.src.includes("volume.svg")){
    e.target.src=e.target.src.replace("volume.svg","mute.svg") 
    currentSong.volume=0;
    
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  }  
  else{
    e.target.src=e.target.src.replace("mute.svg","volume.svg")
    currentSong.volume = .10;
    
    document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
  }
})






} 




main()

/* continue at */