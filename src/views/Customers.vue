<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            fab
            dark
            class="mb-2"
            fixed
            right
            bottom
            v-bind="attrs"
            v-on="on"
          >
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
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.car"
                    label="Car"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small fab color="primary" class="mr-2" @click="editItem(item)"
        >mdi-pencil</v-icon
      >
      <v-icon small fab color="red" @click="deleteItem(item)"
        >mdi-delete</v-icon
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", align: "start", value: "name" },
      { text: "Phone", value: "phone" },
      { text: "Car", value: "car" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      phone: "",
      car: "",
    },
    defaultItem: {
      name: "",
      phone: "",
      car: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
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
      this.customers = [
        {
          name: "John",
          phone: "01234567891",
          car: "EX123KK",
        },
        {
          name: "John1",
          phone: "01234567891",
          car: "EX123KC",
        },
        {
          name: "John2",
          phone: "01234567891",
          car: "EX123KB",
        },
        {
          name: "John3",
          phone: "01234567891",
          car: "EX123KA",
        },
      ];
    },

    // call backend endpoints for these actions
    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.customers.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.customers.splice(index, 1);
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
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>