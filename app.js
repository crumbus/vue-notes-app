const App = {
    data() {
        return {
            title: "Notes",
            input: {
                value: "",
                placeholder: "Type ur note",
            },
            notes: [{text: "task 1", editable: false}, {text: "task 2", editable: false},
                {text: "task 3", editable: false}],
        };
    },
    mounted() {
        this.getNotes();
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem("notes", JSON.stringify(updatedList));
            },
            deep: true,
        },
    },
    methods: {
        getNotes() {
            const localNotes = localStorage.getItem("notes");
            if (localNotes) {
                this.notes = JSON.parse(localNotes);
            }
        },
        onSubmit() {
            const newNote = {text: this.input.value, editable: false}
            this.notes.push(newNote);

            // reset form input
            this.input.value = "";
        },
        edit(index) {
            this.editableTemp = this.notes[index].text
            this.notes[index].editable = true;

        },
        update(index) {
            this.notes[index].text = this.notes[index].text
            this.notes[index].editable = false
        },
        cancelUpdate(index) {
            this.notes[index].editable = false;
            this.notes[index].text = this.editableTemp
        },
        remove(index) {
            this.notes.splice(index, 1);
        },
    },
};

Vue.createApp(App).mount("#app");
