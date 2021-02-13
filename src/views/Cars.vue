<template>
    <div>
        <v-data-table :headers="headers" :search="search" :items="cars" sort-by="reg" class="elevation-1">
            <template v-slot:top>
                <v-text-field class="mx-4" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </template>

            <!-- table record controls -->
            <template v-slot:item.actions="{ item }">
                <v-icon small fab color="primary" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small fab color="red" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <!--end table record controls -->
        </v-data-table>

        <!-- modal form for edit or create -->
        <v-form v-model="isValid">
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" fab dark class="mb-2" fixed right bottom v-bind="attrs" v-on="on">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.reg" label="Reg" :rules="regRule"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.model" label="Model" :rules="modelRule"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.make" label="Make" :rules="makeRule"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedItem.owner" label="Owner"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" :disabled="!isValid" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>
        <!-- end of modal form for edit or create -->
    </div>
</template>

<script>
export default {
    //get all cars endpoint call
    data: () => ({
        isValid: true,
        dialog: false,
        search: "",
        regRule: [(v) => !!v || "Reg is required"],
        modelRule: [(v) => !!v || "Model is required"],
        makeRule: [(v) => !!v || "Make is required"],

        headers: [
            { text: "Reg", value: "reg", align: "start" },
            { text: "Make", value: "make" },
            { text: "Model", value: "model" },
            { text: "Owner", value: "owner" },
            { text: "Jobs", value: "jobs", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        cars: [],
        editedIndex: -1,
        editedItem: {
            reg: "",
            make: "",
            model: "",
            owner: "",
            jobs: "",
        },
        defaultItem: {
            reg: "",
            make: "",
            model: "",
            owner: "",
            jobs: "",
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Car" : "Edit Car";
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
            this.cars = [
                {
                    reg: "aabb11",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: [],
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy 2",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb13",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb14",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb15",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
                {
                    reg: "aabb12",
                    make: "Ford",
                    model: "Focus",
                    owner: "some guy",
                    jobs: "List of jobs ids with link for details",
                },
            ];
        },

        // call backend endpoints for these actions
        editItem(item) {
            this.editedIndex = this.cars.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.cars.indexOf(item);
            confirm("Are you sure you want to delete this item?") && this.cars.splice(index, 1);
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
                Object.assign(this.cars[this.editedIndex], this.editedItem);
            } else {
                this.cars.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>
<style lang="scss" scoped>
</style>

