const {createApp} = Vue


const statsApp = createApp({
    data(){
        return {
            events: [],
            eventsComing: [],
            eventsPast: [],
            categories: [],
            categoriesComing: [],
            categoriesPast: [],

            
            statisticsComing: [],
            statisticsPast: [],
            highAttendance: undefined,
            lowest: undefined,
            larger: undefined,
            eventsComingFilter: [],
            eventsPastFilter: [],


        }
    },
    created(){
        this.data()
    },
    methods: {
        data(){
            fetch('https://amazing-events.herokuapp.com/api/events')
            .then(res => res.json())
            .then(data => {
                this.events = data.events
                this.eventsFilter = this.events
                this.dateNow = data.currentDate
                
                
                this.categoriesComing = [... new Set(this.eventsFilter.filter(events => events.estimate).map(event => event.category))]
                this.categoriesPast = [... new Set(this.eventsFilter.filter(events => events.assistance).map(event => event.category))] 
                
                this.eventsComingFilter = [... new Set(this.eventsFilter.filter(events => events.estimate))]
                this.eventsPastFilter = [... new Set(this.eventsFilter.filter(events => events.assistance))]
                
                this.statisticsComing = this.categoriesComing.map(category => this.eventStatistics(this.eventsComingFilter, category))
                this.statisticsPast = this.categoriesPast.map(category => this.eventStatistics(this.eventsPastFilter, category))
                
              
                console.log(this.highAttendance)
                
                this.getCategory()
                
            })
            .catch(err => console.log(err))
        },
        getCategory(){
            fn = event => event.category
            this.categories = [ ... new Set(this.events.filter( fn ).map( fn ))]
            console.log(this.categories)
        },
        eventStatistics(events, categories) {
            let eventsFilter = events.filter(e => categories.includes(e.category))
            let aux = {
                category: categories,
                revenues: eventsFilter.reduce((acc, iter) => acc + this.revenuess(iter), 0),
                estimate: eventsFilter.filter(e => e.category == categories).map(e => parseInt(e.estimate)).reduce((acc,iter) => acc+=iter),
                capacity: eventsFilter.filter(e => e.category == categories).map(e => parseInt(e.capacity)).reduce((acc,iter) => acc+=iter),
                assistance: eventsFilter.filter(e => e.category == categories).map(e => parseInt(e.assistance)).reduce((acc,iter) => acc+=iter)
                
            }
            return aux
        },
        revenuess(event) {
            if (event.assistance === undefined) {
                return (event.price * event.estimate)
            } else {
                return (event.price * event.assistance)
            }
        }
        
        
    },
    computed: {
         highestAttendance(){
            this.highAttendance = this.events.filter(e => e.assistance).sort((a,b) => b.assistance - a.assistance ).map(e => e.name).slice(0,1)[0]    
            this.lowest = this.events.filter(e => e.assistance).sort((a,b) => a.assistance - b.assistance ).map(e => e.name).slice(0,1)[0]  
            this.larger = this.events.filter(e => e.capacity).sort( (a,b) => b.capacity - a.capacity ).map(e => e.name).slice(0,1)[0]        
        }
        
        
    }
})


statsApp.mount('#stats')