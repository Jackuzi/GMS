<template>
    <v-data-table :headers="headers" :items="jobs" sort-by="date" class="elevation-1">
        <template v-slot:top>
            <v-form v-model="isValid" ref="form">
                <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen persistent>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" fab dark class="mb-2" fixed right bottom v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-form v-model="isValid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="customer.firstname" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="customer.lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="customer.email" :rules="emailRules" label="E-mail" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" :disabled="!isValid" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-form>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon small fab color="primary" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small fab color="red" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    //get all jobs endpoint call
    data: () => ({
        isValid: true,
        customers: [],
        customer: {
            firstname: null,
            lastname: null,
            email: null,
        },
        nameRules: [(v) => !!v || "Name is required", (v) => v.length <= 10 || "Name must be less than 10 characters"],
        emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],

        dialog: false,

        regRule: [(v) => !!v || "Reg is required"],
        modelRule: [(v) => !!v || "Model is required"],
        makeRule: [(v) => !!v || "Make is required"],

        headers: [
            { text: "JobNo", value: "jobNo", align: "start" },
            { text: "Date", value: "date" },
            { text: "Car", value: "car" },
            { text: "Description", value: "description" },
            { text: "Parts", value: "parts" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        jobs: [],
        editedIndex: -1,
        editedItem: {
            jobNo: null,
            date: null,
            car: null,
            description: null,
            parts: null,
        },
        defaultItem: {
            jobNo: null,
            date: null,
            car: null,
            description: null,
            parts: null,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Job" : "Edit Job";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        //get all customers endpoint call
        initialize() {
            this.jobs = [
                {
                    jobNo: "123",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "08/03/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "09/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "123",
                    date: "10/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
            ];

            this.customers = [
                {
                    firstname: "name",
                    lastname: "surname",
                    phone: "0123456789",
                    cars: "",
                },
            ];
        },

        // call backend endpoints for these actions
        editItem(item) {
            this.editedIndex = this.jobs.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.jobs.indexOf(item);
            confirm("Are you sure you want to delete this item?") && this.jobs.splice(index, 1);
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.jobs[this.editedIndex], this.editedItem);
            } else {
                this.jobs.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>