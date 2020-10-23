<template>
    <v-menu ref="menu" v-model="date" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="editedItem.date" label="Date" prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(editedItem.date)"> OK </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: "DatePicker",
    menu: false,

    data: () => ({
        date: Date,
    }),

    props: {
        editedItem: {
            date: Date,
        },
    },
    created() {
        this.editedItem.date = this.editedItem.date ?? new Date().toISOString().substr(0, 10);
    },
};
</script>

<style>
</style>