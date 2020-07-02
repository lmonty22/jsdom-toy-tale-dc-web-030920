let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  toyForm.addEventListener('submit', submitform)
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function submitform(e){
  e.preventDefault()
  const children = e.target.querySelectorAll('.input-text')
  const name = children[0].value
  const image = children[1].value
  const obj = {
    name: name, 
    image: image, 
    likes: 0
  }
  postToy(obj)
}

function postToy(obj){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
  }).then(res => res.json())
  .then(toy => renderToy(toy))
}

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then( toys => renderToys(toys))
}

function renderToys(toys){
  const toyContainer = document.querySelector('#toy-collection')
  toys.map(t => {
    renderToy(t)
  })
}

function likeToy(id, likes){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      likes: likes
    })
  }).then(res => res.json())
  .then(toy => {
    tCard = document.getElementById(toy.id)
    likes = tCard.querySelector('p')
    likes.innerText = `${toy.likes} likes`
  })
}

function renderToy(t){
  const card = document.createElement('div')
  card.className = 'card'
  card.id = t.id
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const likes = document.createElement('p')
  const likeBtn = document.createElement('button')
  likeBtn.innerText = 'Like'
  likeBtn.addEventListener('click', () => likeToy(t.id, (parseInt(likes.innerText.split(' ')[0])+1)))
  likes.innerText = `${t.likes} likes`
  img.className = 'toy-avatar'
  img.src = t.image
  h2.innerText = t.name
  card.append(h2, img, likes, likeBtn)
  const toyContainer = document.querySelector('#toy-collection')
  toyContainer.append(card)
}