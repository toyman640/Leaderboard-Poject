import './style.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pQo40Ry8TZ17ITbNOQcr/scores';
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');

const loadData = (e) => {
  e.preventDefault();
  const gamerName = nameInput.value;
  const gamerScore = scoreInput.value;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: `${gamerName}`, score: `${gamerScore}` }),
  })
    .then((response) => response.json());
};

form.addEventListener('submit', loadData);

const refreshBtn = document.querySelector('#btn-get-data');
const scoreSection = document.querySelector('.board');

const getData = () => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      scoreSection.innerHTML = '';
      const ulside = document.createElement('ul');
      data.result.forEach((element) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${element.user} : ${element.score}`;
        ulside.appendChild(listItem);
        scoreSection.appendChild(ulside);
      });
    });
};
refreshBtn.addEventListener('click', getData);