let containerCard = document.getElementById("index-card")
const $containerCategory = document.getElementById("index-category")
const $containerCategorySelect = document.getElementById("index-category-select")
const $fragmentCategory = document.createDocumentFragment()

let searchInput = document.getElementById("search-input")

fetch('https://amazing-events.herokuapp.com/api/events')
.then((response) => response.json())
.then((json) => {
    let info = json
    let datos = info.events
    let categoriesOnly = new Set(datos.map(category => category.category))
    let categoriesOnlySelect = new Set(datos.map(category => category.category))
    let categories = datos.map(category => category.category)
    let eventCard = datos.map(event => event) 
    
    printCard(datos, containerCard)

    printCategory(categoriesOnly, $containerCategory)
    printCategorySlct(categoriesOnlySelect, $containerCategorySelect)

    $containerCategorySelect.addEventListener("change", e => {
        let select = Array.from(document.querySelectorAll('option')).filter(elemento => elemento.selected).map(element => element.textContent)
        let filterCategory = filterCategoriesSelect(eventCard, select)
        select.includes("Select Category")
        ? printCard(eventCard, containerCard)
        : printCard(filterCategory, containerCard)
        
    })
    
    $containerCategory.addEventListener("change", (event) => {
        let checked =Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(valor => valor.value)
        let filterEvents = filterCards(eventCard, checked)
        filterEvents.length !== 0
        ?   printCard(filterEvents, containerCard)
        :   containerCard.innerHTML = `<h2>Select a category</h2>`
        filterEventsGlobal = filterEvents.map(e => e)
    })
    searchInput.addEventListener("keyup", e => {
        const valorInput = Array.from(document.querySelectorAll('input[type="search"]')).map(element => element.value)
        const cadenaInput = valorInput.toString().toLowerCase()
        filterEventsGlobal = valorEventGlobal()
        const cardsFilter = filterSearch(filterEventsGlobal, cadenaInput)
        printCard(cardsFilter, containerCard)  
    })
    function valorEventGlobal(){
        if (filterEventsGlobal.length === 0) {
            return datos
        }
        return filterEventsGlobal
    }
})
.catch(problems => containerCard.innerHTML = `<h1>We are having technical problems, try again later. 🛠</h1>`)


//|||||FUNCTIONS CARDS|||||//

function createCards(event) {
        let card = document.createElement("div")
        card.classList.add('card', 'mb-3', 'mb-md-0')
        card.innerHTML = `
            <img src="${event.image}" class="card-img-top" alt="this is an ${event.name}">
            <div class="card-body d-flex flex-column gap-3">
                <div class="d-flex flex-column align-items-center text-card">
                    <h5 class="card-title d-flex text-align-center">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="d-flex flex-row gap-1">
                        <h5>Price: </h5>
                        <p>$${event.price}</p>
                    </div>
                    <div>
                    <a href="./details-target.html?id=${event._id}" class="btn">View More</a>
                    </div>
                </div>
            </div>
        `
        return card      
}
function printCard(events, container) {
    container.innerHTML = ''
    let $fragment = document.createDocumentFragment()
    events.forEach(event => $fragment.appendChild(createCards(event)))

    container.appendChild($fragment)

}

//|||||FUNCTIONS CATEGORIES DESKTOP|||||//

function printCategory(category, where) {
    let template = ''
    category.forEach( element => {
        template += `
                <div class="d-flex padding-left">
                    <input class="form-check-input" type="checkbox" value="${element}" checked id="${element}">
                    <label class="form-check-label" for="${element}">
                        ${element}
                    </label>
                </div>
        `
    })
    where.innerHTML = template

}
let filterEventsGlobal = []
function filterCards(events, condition) {
    let filter = events.filter(event => condition.includes(event.category))
    return filter
}

//|||||FUNCTIONS SEARCH|||||//

function filterText(array, text){
    if (text === ""){
        return array
    } else {
        return array.filter(element => element.name.toLowerCase().includes(text))
    }
}

function filterSearch(events, valorInput) {
    let filter = events.filter(e => e.name.toLowerCase().includes(valorInput)) 
    return filter
}

function printCategorySlct(category, where) {
    let template = `
    <option selected>Select Category</option>
    `
    category.forEach( element => {
        template += `
            <option value="">${element}</option>      
        `
    })
    where.innerHTML = template

}
function filterCategoriesSelect(category, condition){
    const filter = category.filter(categories => condition.includes(categories.category))
    return filter
}

























