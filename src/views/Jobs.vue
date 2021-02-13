<template>
    <div>
        <v-data-table :headers="headers" :search="search" :items="jobs" sort-by="date" class="elevation-1">
            <template v-slot:top>
                <v-text-field class="mx-4" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </template>
            <template v-slot:item.actions="{ item }">
                <JobModal :modal.sync="dialog" :item="item" :jobs="jobs" />
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import JobModal from "@/components/JobModal";

export default {
    components: { JobModal },
    //get all jobs endpoint call

    data: () => ({
        search: "",
        dialog: false,
        isValid: true,
        customers: [],
        customer: {
            firstname: String,
            lastname: String,
            email: String,
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
        //get all jobs endpoint call
        initialize() {
            this.jobs = [
                {
                    jobNo: "123",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "1234",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "125",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "126",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "127",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "128",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "129",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
                {
                    jobNo: "1212",
                    date: "2020-10-31",
                    car: "Focus",
                    description: "some description",
                    parts: "List of parts used",
                },
            ];

            this.customers = [
                {
                    firstname: "name",
                    lastname: "surname",
                    phone: "01234567891",
                    cars: [],
                },
                {
                    firstname: "name2",
                    lastname: "surname2",
                    phone: "01234567891",
                    cars: [],
                },
                {
                    firstname: "name3",
                    lastname: "surname3",
                    phone: "01234567891",
                    cars: [],
                },
            ];
        },

        // call backend endpoints for these actions
    },
};
</script>