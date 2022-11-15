const {createApp} = Vue


const app = createApp({
    data(){
        return {
            events: [],
            eventsFilter: [],
            categories: [],
            checked: [],
            checkedSelect: [],
            searchI: ''
        }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(res => res.json())
            .then(data => {
                this.events = data.events
                this.eventsFilter = data.events
                this.getCategory()
            })
            .catch(err => console.log(err))
    },
    methods: {
        getCategory(){
            fn = event => event.category
            this.categories = [ ... new Set(this.events.filter( fn ).map( fn ))]
        }
        // searchInput(){
        //     this.eventsFilter = this.events.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
        // }
    },
    computed: {
        filter(){
            const filterChecked = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
            this.eventsFilter = filterChecked.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
        },
        filterSelect(){
            const filterCheckedSelect = this.events.filter(event => this.checkedSelect.includes(event.category) || this.checkedSelect === "Select Category")
            this.eventsFilter = filterCheckedSelect.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
        }
    }
})


app.mount('#app')