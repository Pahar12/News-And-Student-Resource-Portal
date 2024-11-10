const API_KEY ="bc81ae854fd147fda67b654098c0494f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data);
}
function bindData(data){
    const cardsContainer =document.getElementById('cards-container');
    const newsCardTemplate =document.getElementById('template-news-card');

    cardsContainer.innerHTML="";


    data.articles.forEach((article )=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img")
    const newsTitle=cardClone.querySelector("#news-title")
    const newsSource=cardClone.querySelector("#news-source")
    const newsDesc=cardClone.querySelector("#news-desc")

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

    newsSource.innerHTML=`${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=> {window.open(article.url,"_blank");})
}

let curSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',() => {
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})
// Get form elements
const form = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

// Add submit event listener to form
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;

    // Display response message to the user
    responseMessage.innerText = `Thank you, ${name}! We have received your message and will respond to you at ${email} soon.`;
    responseMessage.style.color = 'green';

    // Clear the form
    form.reset();
});
