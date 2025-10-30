document.addEventListener("DOMContentLoaded", async() => {

  document.getElementById("info").addEventListener("click", () => {
    alert("Для использования введите в строку название книги на английском и нажмите на стрелочку")
  });


  document.getElementById("result").innerHTML = "<li class='load'>Загрузка топа книг....</li>"
  try{
    const result = await fetch("https://openlibrary.org/search.json?subject=fiction")
    if(!result.ok){
    throw new Error("Ошибка запроса к API")
  }
  const books = await result.json()

    if (!books.docs || books.docs.length === 0) {
        document.getElementById("result").innerHTML = "<li class='load'>Не удалось загрузить книги</li>";
        return;
    }

    const top = books.docs.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0)).slice(0,12);

    const toHTML = top.map((book, i) => {
        const pic = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`: "https://via.placeholder.com/100х150?text=No+Cover"
        return `<li class="card">
            <img src="${pic}" alt="${books.docs[i].title}">
            <div class="info_card">
                <span>${book.title}</span>
                <span>Автор: ${book.author_name}</span>
                <span>Год публикации: ${book.first_publish_year}</span>
            </div>
        </li>`}).join("");

    document.getElementById("result").innerHTML = toHTML

    }
    catch(err){
       document.getElementById("result").innerHTML = "<li class='load'>Непредвиденная ошибка</li>"
    }

  //Запрос на название книги
  document.getElementById("enter").addEventListener("click", async(e) => {
      document.getElementById("result").innerHTML = "<li class='load'>Загрузка книг по запросу....</li>"
      try{
          const result = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(document.getElementById("film_name").value)}`)
          if(!result.ok){
            throw new Error("Ошибка запроса к API")
          }
          const data = await result.json()

          if (!data.docs || data.docs.length === 0) {
             document.getElementById("result").innerHTML = "<li class='load'>Ничего не найдено, попробуйте ввести название книги на английском</li>";
             return;
          }

          const ans = data.docs.slice(0,12).map((book, i) => {
                  const img = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`: "https://via.placeholder.com/100x150?text=No+Cover"
                  return `<li class="card">
                      <img src="${img}" alt="${data.docs[i].title}">
                      <div class="info_card">
                          <span>${book.title}</span>
                          <span>Автор: ${book.author_name}</span>
                          <span>Год публикации: ${book.first_publish_year}</span>
                      </div>
                  </li>`}).join("");

              document.getElementById("result").innerHTML = ans

      }
      catch(err){
        document.getElementById("result").innerHTML = "<li class='load'>Непредвиденная ошибка</li>"
      }

  });


  const currentPage = window.location.pathname.split('/').pop();
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
          const linkPage = link.getAttribute('href');
          if (linkPage === currentPage) {
              link.classList.add('active');
          }

          link.addEventListener('click', function(e) {
              navLinks.forEach(l => l.classList.remove('active'));
              this.classList.add('active');
          });
      });
});