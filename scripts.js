const baseURL = 'https://gateway.marvel.com/';

const btn = document.getElementById('getMarvel');
const bar = document.getElementById('statusBar');
const displayDeck = document.getElementById('deck');
const h3 = document.querySelector('h3');
const dpool = document.getElementById('deadpoolSayz')

h3.style.display = 'none';
bar.parentElement.style.display = 'hidden';
dpool.style.display = 'none';

btn.addEventListener('click', fetchIt)

// Default IDs to randomly pull from.
let marvelCharIds = [
    1017474, 1009281, 1009282, 1010735, 1009539, 1011389, 1010743, 1009338, 1010373, 1010933, 1010704, 1009372, 1009382, 1009508, 1009404, 1009407, 1009215, 1009417, 1009490, 1009452, 1009456, 1009459, 1009464, 1009471, 1009472, 1009465, 1011388, 1009156, 1009504, 1009526, 1009546, 1009562, 1009583, 1009592, 1017603, 1016181, 1011010, 1010860, 1010978, 1009631, 1009652, 1017576, 1011128, 1011226, 1009718, 1009722, 1009185, 1009187, 1009191, 1009197, 1009220, 1010338
]

// Built array that houses team assembly.
let marvelCharArr = [];
let hydraAgents = [];

// Array builder depending on size of class.
let pickCharIds = () => {
    let storedIds = []
    
    for(let i = 0; i < studentsArr.length; i++) {
        let x = Math.floor(Math.random() * marvelCharIds.length);
        let pushCharacter = marvelCharIds[x];
        
        storedIds.length !== studentsArr.length ? 
        storedIds.push(pushCharacter) : null;

        marvelCharIds.splice(x,1);
    }

    return storedIds
}

// Fetch & Progress Bar
async function fetchIt() {
    bar.parentElement.style.display = 'visible';
    let toFill;

    // Searching per ID that was stored.  Each ID needs it's own individual fetch request.
    for(i of pickCharIds()) {
        // console.log('Search: ', i);
        url = `${baseURL}/v1/public/characters/${i}?apikey=${marvelPublicKey}&hash=${marvelPrivKey}`;
        
        const res = await fetch(url);
        const json = await res.json();
        const store = await marvelCharArr.push(json.data.results[0])
        
        studentsArr.length !== marvelCharArr.length ?
        toFill = (marvelCharArr.length / studentsArr.length).toFixed(2) * 100 :
        toFill = 100

        const status = bar.style = `width: ${toFill}%`;
        
    }
    
    h3.style.display = 'block';
    h3.style.marginLeft = '3rem';

    setTimeout(() => {
        bar.parentElement.style.display = 'none';
    }, 2000)

}


//! INDIVIDUAL CARDS
function showChar(event) {
    let target = event.target;
    let para = target.nextElementSibling.querySelector('p');
    let i = Number(event.target.getAttribute('index'));
    target.src = `${marvelCharArr[i].thumbnail.path}.${marvelCharArr[i].thumbnail.extension}`;
    para.innerText = marvelCharArr[i].name;

}

//! Default Display
function displayCards() {

    //NOTE: quick build to pull character lists.
    // url = `${baseURL}/v1/public/characters?limit=100&apikey=${marvelPublicKey}&hash=${marvelPrivKey}`;
    // fetch(url)
    //     .then(res => res.json())
    //     .then(console.log)

    while(displayDeck.firstChild) {
        displayDeck.removeChild(displayDeck.firstChild);
    }

    studentsArr.forEach((x,i) => {
    
    let r = Math.ceil(Math.random() * 30 + 1);
    
    // Create Elements
    let col = document.createElement('div');
    let card = document.createElement('div');
    let img = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardTitle = document.createElement('h5');
    let cardText = document.createElement('p');

    // Assign Attributes
    col.setAttribute('class', 'col');
    card.setAttribute('class','card h-100');
    card.setAttribute('index', i);
    img.src = 
        r % 6 === 0 ? 
        './assets/hydraPlaceholder.jpg' :
        './assets/shield_placeholder.png'
    ;
    r% 6 === 0 ? hydraAgents.push(x) : null
    setTimeout(() => {
        img.src = './assets/shield_placeholder.png'
        dpool.style.display = 'block';
    },3500);
    img.setAttribute('class', 'card-img-top img-thumbnail img-fluid');
    img.setAttribute('index', i);
    cardBody.setAttribute('class', 'card-body');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.innerText = x;
    cardText.setAttribute('class','card-text');

    // Append
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    displayDeck.appendChild(col);

    })

    dPoolSays();
}

//Modal Info:
function dPoolSays() {
    
    console.log(hydraAgents);
    let tbody = document.querySelector('tbody');

    //Create Hydra Table Build
    hydraAgents.forEach((h,i) => {
        console.log(h, i);
        let tr = document.createElement('tr');
        let agentNum = document.createElement('td');
        let agent = document.createElement('td');
    
        agentNum.innerText = i+1;
        agent.innerText = h

        tr.appendChild(agentNum);
        tr.appendChild(agent);
        tbody.appendChild(tr);

    })
    

}


