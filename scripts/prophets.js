const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const dateOfBirth = document.createElement('p');
        const placeOfBirth = document.createElement('p');
        const portrait = document.createElement('img');

        fullName.textContent = `Portrait of ${prophet.name} ${prophet.lastname}`;

        dateOfBirth.textContent = `Date of birth: ${prophet.birthdate}`;

        placeOfBirth.textContent = `Place of birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname} portrait`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

getProphetData();
