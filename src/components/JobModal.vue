<template v-slot:top>
    <v-form v-model="localIsValid" ref="form">
        <v-dialog v-model="dial" transition="dialog-bottom-transition" fullscreen persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab dark class="mb-2" fixed right bottom v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-form v-model="localIsValid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="editedItem.jobNo" :rules="[(v) => !!v || 'jobNo is required']" :counter="10" label="Job No" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <DatePicker :editedItem="editedItem" />
                            </v-col>
                            <!-- 
                            <v-col cols="12" md="4">
                                <v-text-field v-model="customer.lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="customer.email" :rules="emailRules" label="E-mail" required></v-text-field>
                            </v-col> -->
                        </v-row>
                    </v-container>
                </v-form>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" :disabled="!localIsValid" text @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-icon small fab color="primary" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small fab color="red" @click="deleteItem(item)">mdi-delete</v-icon>
    </v-form>
</template>

<script>
import DatePicker from "../components/DatePicker";

export default {
    components: { DatePicker },

    name: "JobModal",
    props: {
        dialog: {
            default: false,
        },

        jobs: Array,
        isValid: {
            default: true,
        },
        item: Object,
    },

    data() {
        return {
            editedItem: {
                jobNo: null,

                date: null,
                car: null,
                description: null,
                parts: null,
            },
            defaultItem: {
                jobNo: null,

                date: new Date().toISOString().substr(0, 10),
                ownedCars: null,
                car: {
                    Reg: null,
                    Make: null,
                    Model: null,
                    Year: null,
                    Mileage: null,
                    Color: null,
                },
                description: null,
                parts: null,
            },

            dial: this.dialog,
            localIsValid: this.isValid,

            nameRules: [(v) => !!v || "Name is required", (v) => v.length <= 10 || "Name must be less than 10 characters"],
            emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],

            regRule: [(v) => !!v || "Reg is required"],
            modelRule: [(v) => !!v || "Model is required"],
            makeRule: [(v) => !!v || "Make is required"],
            editedIndex: -1,
        };
    },

    methods: {
        close() {
            this.$emit("update:dialog");
            this.dial = false;
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
                this.editedItem = Object.assign({}, this.editedItem);
            }
            this.close();
        },
        editItem(item) {
            this.editedIndex = this.jobs.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dial = true;
        },

        deleteItem(item) {
            const index = this.jobs.indexOf(item);
            confirm("Are you sure you want to delete this item?") && this.jobs.splice(index, 1);
        },
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Job" : "Edit Job";
        },
    },
};
</script>

