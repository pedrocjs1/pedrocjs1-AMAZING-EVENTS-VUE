fetch('https://amazing-events.herokuapp.com/api/events')
.then((response) => response.json())
.then(json => {
    let info = json
    let datos = info.events
    // console.log(datos)
    let containerDescription = document.getElementById("container-details")
    let containerImage = document.getElementById("image-details")
    let queryString = location.search
    let params = new URLSearchParams(queryString).get("id")
    
    let events = datos.find(item => item._id === params)
    
    
    containerDescription.innerHTML = `
                <h1>${events.name}</h1>
                <p>${events.category}</p>
                <p>${events.description}</p>
                <p>Place: ${events.place}</p>
                <p>Capacity: ${events.capacity}</p>
                <p>Price: $${events.price}</p>
        `
    
    
    
    containerImage.innerHTML = `
                <div class="d-flex w-100 h-100" >
                    <img class="" src="${events.image}" alt="this an image of ${events.name}"/>      
                </div>
        `
    
})
.catch(problems => containerDescriptions.innerHTML = `<h1>We are having technical problems, try again later. 🛠</h1>`)





let containerDescriptions = document.getElementById("container-details")
