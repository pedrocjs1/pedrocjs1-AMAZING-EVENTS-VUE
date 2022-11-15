const {createApp} = Vue


const app = createApp({
    data(){
        return {
            events: [],
            eventsComing: [],
            eventsPast: [],
            eventsFilter: [],
            eventsFilterComing: [],
            eventsFilterPast: [],
            categories: [],
            checked: [],
            checkedSelect: [],
            searchI: '',
            id: new URLSearchParams(location.search).get("id"),
            eventId:[]

        }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(res => res.json())
            .then(data => {
                this.events = data.events
                this.eventsFilter = data.events
                this.dateNow = data.currentDate
                this.eventsComing = this.events.filter(event => this.dateNow < event.date)
                this.eventsPast = this.events.filter(event => this.dateNow > event.date)
                this.eventsFilterComing = this.eventsComing
                this.eventsFilterPast = this.eventsPast
                this.eventId = this.events.find(item => item._id == this.id)
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
            //HOME
            const filterChecked = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
            this.eventsFilter = filterChecked.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
            //UPComing
            const filterCheckComing = this.eventsComing.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
            this.eventsFilterComing = filterCheckComing.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
            //PAST
            const filterCheckPast = this.eventsPast.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
            this.eventsFilterPast = filterCheckPast.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
        },
        filterSelect(){
            const filterCheckedSelect = this.events.filter(event => this.checkedSelect.includes(event.category) || this.checkedSelect === "Select Category")
            this.eventsFilter = filterCheckedSelect.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
            //UPcomingSelect
            const filterCheckedSelectComing = this.eventsComing.filter(event => this.checkedSelect.includes(event.category) || this.checkedSelect === "Select Category")
            this.eventsFilterComing = filterCheckedSelectComing.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
            //PAST
            const filterCheckedSelectPast = this.eventsPast.filter(event => this.checkedSelect.includes(event.category) || this.checkedSelect === "Select Category")
            this.eventsFilterPast = filterCheckedSelectPast.filter(event => event.name.toLowerCase().trim().includes(this.searchI.toLowerCase().trim()))
        }
    }
})


app.mount('#app')