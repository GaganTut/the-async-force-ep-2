/*jshint esversion: 6*/
const contentContainer = document.querySelector('#contentContainer');
const requestBtn = document.querySelector('#requestResourceButton');
const resourceType = document.querySelector('#resourceType');
const resourceID = document.querySelector('#resourceId');

requestBtn.addEventListener('click', () => {
  if (resourceType.value === 'people') {
    personRequest();
  } else if (resourceType.value === 'starships') {
    starshipsRequest();
  } else if (resourceType.value === 'planets') {
    planetRequest();
  }
});

function createError(apiLink, elementQuery) {
  let errorMessage = document.createElement('h2');
  errorMessage.innerHTML = `Error: Fetching Resource: ${apiLink} : NOT FOUND`;
  errorMessage.style['background-color'] = 'red';
  document.querySelector(elementQuery).appendChild(errorMessage);
}

function singleRequest(apiLink, elementQuery, property, deepBool, deepProperty) {
  let newRequest = new XMLHttpRequest();
  newRequest.addEventListener('load', runRequest);
  newRequest.open('GET', apiLink);
  newRequest.send();

  function runRequest() {
    let requestData = JSON.parse(this.responseText);
    if (requestData[property] === undefined) {
      createError(apiLink, elementQuery);
    } else if (deepBool) {
      singleRequest(requestData[property], elementQuery, deepProperty);
    } else {
      document.querySelector(elementQuery).innerHTML = requestData[property];
    }
  }
}

function listRequest(apiLink, parentQuery, property, listElement, listProperty) {
  let listRequest = new XMLHttpRequest();
  listRequest.addEventListener('load', runListRequest);
  listRequest.open('GET', apiLink);
  listRequest.send();

  function runListRequest() {
    let listData = JSON.parse(this.responseText);
    for (let i = 0; i < listData[property].length; i++) {
      let elementInList = document.createElement(listElement);
      elementInList.id = `elementInList${i}`;
      singleRequest(listData[property][i], `#${elementInList.id}`, listProperty);
      document.querySelector(parentQuery).appendChild(elementInList);
    }
  }
}

function personRequest() {
  removeOldChilds();
  let nameTag = document.createElement('h2');
  nameTag.id = 'nameTag';
  let genderTag = document.createElement('p');
  genderTag.id = 'genderTag';
  let speciesTag = document.createElement('p');
  speciesTag.id = 'speciesTag';

  contentContainer.appendChild(nameTag);
  contentContainer.appendChild(genderTag);
  contentContainer.appendChild(speciesTag);
  contentContainer.style.display = 'none';

  singleRequest(`http://swapi.co/api/people/${resourceID.value}`, '#nameTag', 'name');
  singleRequest(`http://swapi.co/api/people/${resourceID.value}`, '#genderTag', 'gender');
  singleRequest(`http://swapi.co/api/people/${resourceID.value}`, '#speciesTag', 'species', true, 'name');

  setTimeout(() => {
    contentContainer.style.display = 'block';
  }, 2000);
}

function removeOldChilds() {
  while (contentContainer.hasChildNodes()) {
    contentContainer.removeChild(contentContainer.lastChild);
  }
}

function planetRequest() {
  removeOldChilds();
  let nameTag = document.createElement('h2');
  nameTag.id = 'nameTag';
  let terrainTag = document.createElement('p');
  terrainTag.id = 'terrainTag';
  let populationTag = document.createElement('p');
  populationTag.id = 'populationTag';
  let filmsTag = document.createElement('ul');
  filmsTag.id = 'filmsTag';

  contentContainer.appendChild(nameTag);
  contentContainer.appendChild(terrainTag);
  contentContainer.appendChild(populationTag);
  contentContainer.appendChild(filmsTag);
  contentContainer.style.display = 'none';

  singleRequest(`http://swapi.co/api/planets/${resourceID.value}`, '#nameTag', 'name');
  singleRequest(`http://swapi.co/api/planets/${resourceID.value}`, '#terrainTag', 'terrain');
  singleRequest(`http://swapi.co/api/planets/${resourceID.value}`, '#populationTag', 'population');
  listRequest(`http://swapi.co/api/planets/${resourceID.value}`, '#filmsTag', 'films', 'li', 'title');

  setTimeout(() => {
    contentContainer.style.display = 'block';
  }, 2000);
}

function starshipsRequest() {
  removeOldChilds();
  let nameTag = document.createElement('h2');
  nameTag.id = 'nameTag';
  let manufacTag = document.createElement('p');
  manufacTag.id = 'manufacTag';
  let shipClassTag = document.createElement('p');
  shipClassTag.id = 'shipClassTag';
  let filmsTag = document.createElement('ul');
  filmsTag.id = 'filmsTag';

  contentContainer.appendChild(nameTag);
  contentContainer.appendChild(manufacTag);
  contentContainer.appendChild(shipClassTag);
  contentContainer.appendChild(filmsTag);
  contentContainer.style.display = 'none';

  singleRequest(`http://swapi.co/api/starships/${resourceID.value}`, '#nameTag', 'name');
  singleRequest(`http://swapi.co/api/starships/${resourceID.value}`, '#manufacTag', 'manufacturer');
  singleRequest(`http://swapi.co/api/starships/${resourceID.value}`, '#shipClassTag', 'starship_class');
  listRequest(`http://swapi.co/api/starships/${resourceID.value}`, '#filmsTag', 'films', 'li', 'title');

  setTimeout(() => {
    contentContainer.style.display = 'block';
  }, 2000);
}