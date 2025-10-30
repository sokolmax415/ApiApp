import"./modulepreload-polyfill-B5Qt9EMX.js";document.addEventListener("DOMContentLoaded",async()=>{document.getElementById("info").addEventListener("click",()=>{alert("Для использования введите в строку название книги на английском и нажмите на стрелочку")}),document.getElementById("result").innerHTML="<li class='load'>Загрузка топа книг....</li>";try{const n=await fetch("https://openlibrary.org/search.json?subject=fiction");if(!n.ok)throw new Error("Ошибка запроса к API");const t=await n.json();if(!t.docs||t.docs.length===0){document.getElementById("result").innerHTML="<li class='load'>Не удалось загрузить книги</li>";return}const i=t.docs.sort((e,c)=>(c.edition_count||0)-(e.edition_count||0)).slice(0,12).map((e,c)=>`<li class="card">
            <img src="${e.cover_i?`https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`:"img.png"}" alt="${t.docs[c].title}">
            <div class="info_card">
                <span>${e.title}</span>
                <span>Автор: ${e.author_name}</span>
                <span>Год публикации: ${e.first_publish_year}</span>
            </div>
        </li>`).join("");document.getElementById("result").innerHTML=i}catch{document.getElementById("result").innerHTML="<li class='load'>Непредвиденная ошибка</li>"}document.getElementById("enter").addEventListener("click",async n=>{document.getElementById("result").innerHTML="<li class='load'>Загрузка книг по запросу....</li>";try{const t=await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(document.getElementById("film_name").value)}`);if(!t.ok)throw new Error("Ошибка запроса к API");const s=await t.json();if(!s.docs||s.docs.length===0){document.getElementById("result").innerHTML="<li class='load'>Ничего не найдено, попробуйте ввести название книги на английском</li>";return}const i=s.docs.slice(0,12).map((e,c)=>`<li class="card">
                      <img src="${e.cover_i?`https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`:"img.png"}" alt="${s.docs[c].title}">
                      <div class="info_card">
                          <span>${e.title}</span>
                          <span>Автор: ${e.author_name}</span>
                          <span>Год публикации: ${e.first_publish_year}</span>
                      </div>
                  </li>`).join("");document.getElementById("result").innerHTML=i}catch{document.getElementById("result").innerHTML="<li class='load'>Непредвиденная ошибка</li>"}});const r=window.location.pathname.split("/").pop(),a=document.querySelectorAll(".nav-link");a.forEach(n=>{n.getAttribute("href")===r&&n.classList.add("active"),n.addEventListener("click",function(s){a.forEach(i=>i.classList.remove("active")),this.classList.add("active")})})});
