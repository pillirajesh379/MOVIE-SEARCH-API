const movieSearchBox= document.getElementById('movie-search-box');
const searchList= document.getElementById('search-list');
const resultGrid= document.getElementById('result-grid');

async function loadMovies(searchTerm){
    const  URL =`http://www.omdbapi.com/?i=${searchTerm}&apikey=16bd1f50`;
    const res= await fetch (`${URL}`);
    const data=await res.json();
    if(data.Response == "True") displayMovieList(data.Search);

}
function findMovies()
{
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0)
    {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else{
        searchList.classList.add('hide-search-list');
    }
}
function displayMovieList(movies){
    searchList.innerHTML="";
    for(let idx=0; idx < movies.length; idx++)
    {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id=movies[idx].imbdID;
        movieListItem.classList.add('search-List-item');
        if(movies[idx].Poster != "N/A")
        moviePoster = movies[idx].Poster;
    else
    movieListItem.innerHTML=`
<div class="search-item-thumbnail">
<img src="${moviePoster}" alt="" /></div>
<div className="search-item-info">
    <h3>${movies[idx].Title}</h3>
    <p>${movies[idx].Year}</p>
</div>`;
searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
function  loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-List-item');
    searchListMovies.forEach(movie =>{
        movie.addEventListener('click',async()=>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value="";
            const result=await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=16bd1f50`);
            const movieDeatils= await result.json();
            console.log(movieDeatils);
            // displayMovieDetails(movieDeatils);
        });
    });
}
// function displayMovieDetails(deatils){
//     resultGrid.innerHTML=`
//     <div class="movie-poster">
//                 <img src="${(detials.Poster!= "N/A")? deatils.Poster:"image_not_found.png"}" alt="">
//                 <div class="movie-info">
//                     <h3 class="movie-title">
//                        ${details.title}
//                     </h3>
//                     <ul class="movie-misc-info">
//                         <li class="year">Year: ${details.Year}</li>
//                         <li class="rated">Rated: ${details.Rated}</li>
//                         <li class="released">Released:${detials.Released}</li>
//                     </ul>
//                     <p class="genre"><b>Genre:</b> ${deatils.Genre}</p>
//                     <p class="writer"><b>Writer:</b>${deatils.Writer}</p>
//                     <p class="actor"><b>Actors:</b> ${deatils.Actors}</p>
//                     <p class="plot"><b>Plot:</b>${deatils.Plot}</p>
//                     <p class="language"><b>Language:</b> ${deatils.Language}</p>
//                     <p class="awards"><b><i class="fas fa-awards"></i></b> ${deatils.Awards}</p>
//                 </div>
//             </div>`;
// }
// window.addEventListener('click',(event)=>{
//     if(event.target.className != "form-control"){
//         searchList.classList.add('hide-search-list');
//     }
// });


