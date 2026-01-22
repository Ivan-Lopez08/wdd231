const url = "data/members.json";

const cards = document.querySelector('#members');
const tableBody = document.querySelector('#members-table tbody');

async function getMembersData() {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.table(data.companies);

    displayMembers(data.companies);
    displayTable(data.companies);
}

const displayMembers = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        const image = document.createElement('img');
        const locationLabel = document.createElement('span')
        const locations = document.createElement('ul')
        const phone = document.createElement('span');
        const badge = document.createElement('span');
        const website = document.createElement('a');

        // image settings
        image.setAttribute('src', `${member.image}`);
        image.setAttribute('alt', 'Company logo');
        image.setAttribute('loading', 'lazy')

        // label settings
        locationLabel.textContent = "Locations:"

        // locations settings
        member.addresses.forEach(address => {
            const location = document.createElement('li');
            location.textContent = `${address}`;

            locations.appendChild(location);
        });

        // badge settings
        badge.classList.add('membership-badge');

        switch (member["membership-lvl"]) {
            case 1:
                badge.textContent = "Member";
                badge.classList.add('member');
                break;
            case 2:
                badge.textContent = "Silver Member";
                badge.classList.add('silver');
                break;
            case 3:
                badge.textContent = "Gold Member";
                badge.classList.add('gold');
                break;
        }

        // phone number settings
        phone.textContent = member["phone-number"];

        // url settings
        website.setAttribute('href', `${member.website}`);
        website.textContent = `${member.website}`;

        // card settings
        card.append(image, badge, locationLabel, locations, phone, website);

        card.classList.add('member-card')

        cards.appendChild(card);

    });
}

const displayTable = (members) => {

    tableBody.innerHTML = "";

    members.forEach(member => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = member.name;

        const tdPhone = document.createElement('td');
        tdPhone.textContent = member["phone-number"];

        const tdWebsite = document.createElement('td');
        const link = document.createElement('a');
        link.href = member.website.startsWith('http') ? member.website : `https://${member.website}`;
        link.textContent = member.website;
        link.target = "_blank";
        tdWebsite.appendChild(link);

        tr.append(tdName, tdPhone, tdWebsite);

        tableBody.appendChild(tr);
    });
}

const toggleButton = document.getElementById('toggle');
const cardsContainer = document.getElementById('members');
const tableContainer = document.getElementById('members-table');

toggleButton.addEventListener('click', () => {
    const showingCards = cardsContainer.style.display !== 'none';

    if (showingCards) {
        cardsContainer.style.display = 'none';
        tableContainer.style.display = 'table';
        toggleButton.textContent = "Show Cards";
    } else {
        cardsContainer.style.display = 'grid';
        tableContainer.style.display = 'none';
        toggleButton.textContent = "Show Table";
    }
});

getMembersData();
