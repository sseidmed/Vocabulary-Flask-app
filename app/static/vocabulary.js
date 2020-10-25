
let searchButton = document.getElementsByClassName('search-button')[0]
searchButton.addEventListener('click', addTitleToUrl)

let clearButton = document.getElementById("clear")
clearButton.addEventListener('click', clearInput)

let addButton = document.getElementById('add-button')
addButton.disabled = true

function clearInput() {
    document.getElementById('search-value').value = ''
}

function addTitleToUrl() {
let searchContainer = document.getElementsByClassName('search-results')[0]
searchContainer.innerHTML = ''
let searchValue = document.getElementById('search-value').value
fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${searchValue}?key=a1728eb8-5084-424d-b80f-ceb91b3fe715`)
.then(response => response.json())
.then(data => {
    try {
        let word = data[0]["meta"]["id"]
        console.log("word I am searching for: " + word)
        let type = data[0]["fl"]
        console.log("type: " + type)
        let definition = data[0]["shortdef"]
        console.log("shoft definition in a list: " + definition)
        let div = document.createElement('div')
        div.setAttribute('id', 'word-container')
        let wordContents = `
            <h3 id="word-name">${word}</h3>
            <p id="word-type">${type}</p>
            <p id="word-definition">${definition}</p>
            `
        div.innerHTML = wordContents
        searchContainer.appendChild(div)
        addButton.disabled = false;
    }
    catch(err) {
        let errorHead = document.createElement('h3')
        errorHead.innerHTML = "This word does not exist. Did you mean:"
        searchContainer.append(errorHead)
        for (let i = 0; i < data.length; i ++) {
            let suggestP = document.createElement('p')
            suggestP.innerHTML = data[i]
            searchContainer.append(suggestP)
        }
        addButton.disabled = true  
        console.log("Your word or other suggestions " + data)
    }
  })
}
