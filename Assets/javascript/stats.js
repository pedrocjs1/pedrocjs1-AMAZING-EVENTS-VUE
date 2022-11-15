const eventStatistics = document.getElementById("events-statistics")
const upcomingStatistics = document.getElementById("upcoming-statistics")
const pastStatistics = document.getElementById("past-statistics")
const headerError = document.getElementById("header-error")
let newArrayComing = []
let newArrayPast = []


fetch('https://amazing-events.herokuapp.com/api/events')
.then((response) => response.json())
.then((json) => {
    let info = json
    let datos = info.events
    let eventsEstiamteOnly = datos.filter(events => events.estimate)
    let eventsEstiamteCategory = [... new Set(eventsEstiamteOnly.map(event => event.category))] 
    
    let eventsAssistanceOnly = datos.filter(events => events.assistance)
    let eventsAssistanceCategory = [... new Set(eventsAssistanceOnly.map(event => event.category))] 
    
    printStatistics(datos, eventStatistics)

    objetoCategoria(eventsEstiamteCategory,eventsEstiamteOnly)
    printUpcomingStatistics(newArrayComing, upcomingStatistics)
    
    
    objetoCategoriaPast(eventsAssistanceCategory,eventsAssistanceOnly)
    printPastStatistics(newArrayPast, pastStatistics)
 
   
})
.catch(problems => headerError.innerHTML = `<h1>We are having technical problems, try again later. 🛠</h1>`)



/////FUNCTIONS TABLE EVENTS STATISTICS/////


function highestAttendance(event){
    let high = event.filter(e => e.assistance).sort( (a,b) => b.assistance - a.assistance ).map(e => e.name).slice(0,1)
    return high
}

function lowestAttendance(event){
    let lowest = event.filter(e => e.assistance).sort( (a,b) => b.assistance - a.assistance ).map(e => e.name).slice(-1)
    return lowest
}

function largerCapacity(event){
    let larger = event.filter(e => e.capacity).sort( (a,b) => b.capacity - a.capacity ).map(e => e.name).slice(0,1)
    return larger
    
}


function printStatistics(event, table){
    let template = ``
    let highestAttendancee = highestAttendance(event)
    let lowestAttendancee = lowestAttendance(event)
    let largerCapacityy = largerCapacity(event)
        template += `
                <td>${highestAttendancee}</td>
                <td>${lowestAttendancee}</td>
                <td>${largerCapacityy}</td>
        `
    
    return table.innerHTML = template 
}

/////FUNCTIONS TABLE UPCOMING/////

function objetoCategoria(category, eventsFilter){
    category.map(evento=>{
        return newArrayComing.push({
            name: evento,
            revenue: eventsFilter.filter(e => e.category == evento).map(e => e.price).reduce((acc,iter) => acc+=iter), 
            estimate: eventsFilter.filter(e => e.category == evento).map(e => parseInt(e.estimate)).reduce((acc,iter) => acc+=iter),
            capacity : eventsFilter.filter(e => e.category == evento).map(e => parseInt(e.capacity)).reduce((acc,iter) => acc+=iter)  
        })
    })
}


function printUpcomingStatistics(event, table){
    let template = ``
    event.forEach(element => {
        template += `
            <tr>
                <td>${element.name}</td>
                <td>$${Math.round(element.revenue*element.estimate)}</td>
                <td>${Math.round(element.estimate*100/element.capacity)}%</td>
            </tr>
        `
    });
    return table.innerHTML = template
}

/////FUNCTIONS TABLE PAST/////


function objetoCategoriaPast(category, eventsFilter){
    category.map(evento=>{
        return newArrayPast.push({
            name: evento,
            revenue: eventsFilter.filter(e => e.category == evento).map(e => e.price).reduce((acc,iter) => acc+=iter), 
            assistance: eventsFilter.filter(e => e.category == evento).map(e => parseInt(e.assistance)).reduce((acc,iter) => acc+=iter),
            capacity : eventsFilter.filter(e => e.category == evento).map(e => parseInt(e.capacity)).reduce((acc,iter) => acc+=iter)  
        })
    })
}

function printPastStatistics(event, table){
    let template = ``
    event.forEach(element => {
        template += `
            <tr>
                <td>${element.name}</td>
                <td>$${Math.round(element.revenue*element.assistance)}</td>
                <td>${Math.round(element.assistance*100/element.capacity)}%</td>
            </tr>
        `
    });
    return table.innerHTML = template
}





