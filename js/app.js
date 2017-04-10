/*jshint esversion: 6*/
const contentContainer = document.querySelector('#contentContainer');
const requestBtn = document.querySelector('#requestResourceButton');
const resourceType = document.querySelector('#resourceType');

requestBtn.addEventListener('click', () => {
  if (resourceType.value === 'people') {
    personRequest();
  } else if (resourceType.value === 'starships') {
    starshipsRequestion();
  } else if (resourceType.value === 'planet') {
    planetRequest();
  }
});

function singleRequest(apiLink, elementID, property) {
  let newRequest = new XMLHttpRequest();
}

function personRequest() {
  removeOldChilds();
  let nameTag = document.createElement('h2');
  let genderTag = document.createElement('p');
  let speciesTag = document.createElement('p');
  contentContainer.appendChild(nameTag);
  contentContainer.appendChild(genderTag);
  contentContainer.appendChild(speciesTag);
}

function removeOldChilds() {
  while (contentContainer.hasChildNodes()) {
    contentContainer.removeChild(node.lastChild);
  }
}