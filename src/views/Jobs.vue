<template>
    <v-data-table :headers="headers" :items="jobs" sort-by="date" class="elevation-1">
        <template v-slot:item.actions="{ item }">
            <JobModal :modal.sync="dialog" :item="item" :jobs="jobs" />
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
import JobModal from "../components/JobModal.vue";

export default {
    components: { JobModal },
    //get all jobs endpoint call

    data: () => ({
        dialog: false,
        isValid: true,
        customers: [],
        customer: {
            firstname: null,
            lastname: null,
            email: null,
        },

        nameRules: [(v) => !!v || "Name is required", (v) => v.length <= 10 || "Name must be less than 10 characters"],
        emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],

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
    }),

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
                    jobNo: "1234",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "125",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "126",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "127",
                    date: "11/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "128",
                    date: "08/03/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "129",
                    date: "09/02/2020",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "1212",
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
    },
};
</script>