<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" :to="{ name: item.link }" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-subheader class="mt-4 grey--text text--darken-1">GENERAL</v-subheader>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{ name: settingsLink.link }">
                    <v-list-item-action>
                        <v-icon>{{ settingsLink.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ settingsLink.text }} </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="green" dense>
            <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-icon color="white darken-1" class="mx-4" large @click="$router.push('/').catch((err) => {})">mdi-car</v-icon>
            <v-toolbar-title class="mr-12 align-center" style="cursor: pointer" @click="$router.push('/').catch((err) => {})">
                <span class="title">Garage</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <v-container class>
                <v-row justify="center" align="center">
                    <v-col>
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [
            { icon: "mdi-car-multiple", text: "Cars", link: "cars" },
            { icon: "mdi-briefcase", text: "Jobs", link: "jobs" },
            { icon: "mdi-hammer-wrench", text: "Parts", link: "parts" },
            { icon: "mdi-account-multiple", text: "Customers", link: "customers" },
            { icon: "mdi-clock", text: "Mots", link: "mots" },
            { icon: "mdi-receipt", text: "Invoices", link: "invoices" },
        ],
        settingsLink: { icon: "mdi-cog", text: "Settings", link: "settings" },
    }),
    created() {
        this.$vuetify.theme.dark = false;
    },
};
</script>
