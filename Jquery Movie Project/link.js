
 let key=localStorage.getItem("key");
window.addEventListener("load",()=>{
   
  let title= localStorage.getItem("Title");
  let image=localStorage.getItem("Img");
  let rate= localStorage.getItem("Rate");
  let rd= localStorage.getItem("ReleaseDate");
  let ov= localStorage.getItem("Over");
 
  const dic=document.createElement("div");
   dic.className="box"
   dic.innerHTML=`
   
   <div class="imgbox">
       <img src="${image}" >
   </div>
   <div class="d">
       <table>
           <tr>
               <th>Movie Name</th>
               <td>-</td>
               <td>${title}</td>
           </tr>
          
           <tr>
               <th>Release Date</th>
               <td>-</td>
               <td>${rd}</td>
               </tr>
               <tr>
                   <th>Rating</th>
                   <td>-</td>
                   <td>${rate}</td>
               
           </tr>
           <tr class="dis" id="in">
            <th>
              <div class="button"><i class='bx bx-movie-play'></i>PlayTriler</div>
            </th>    
           </tr>
       </table>
          
         
      
       <h2 class="over">OverView: <h3>${ov}</h3></h2>
        
       <div class="youtube dis">
         <div class="i">X</div>
           
        </div>

</div>
`;
$(".container").append(dic);
$(".button").click(()=>{
    $(".youtube").removeClass("dis");
})
$(".i").click(()=>{
    // console.log("a")
    $(".youtube").addClass("dis");
    const f=$("iframe");
   
    $('iframe').attr('src', $('iframe').attr('src'));
    
})
});

setTimeout(h,3000);
function h(){
    $("#in").removeClass("dis");
 
}
setTimeout(a,2000);
let u=`<iframe width="100%" height="400" src="https://www.youtube.com/embed/${key}" frameborder="0" allowfullscreen></iframe>`;
function a(){
  
    $(".i").append(u)
}
setInterval(cv,1000);
function cv(){
    key=localStorage.getItem("key");
    u=`<iframe width="100%" height="400" src="https://www.youtube.com/embed/${key}"  frameborder="0"  allowfullscreen></iframe>`;
}
