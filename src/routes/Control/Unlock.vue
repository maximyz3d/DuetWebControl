<template>
        <v-container fluid>
                <v-row justify="center">
                        <v-col cols="12" md="8" lg="6">
                                <v-card>
                                        <v-card-title>
                                                Unlock Interface
                                        </v-card-title>
                                        <v-card-text>
                                                <p class="mb-4">
                                                        Enter the 6-digit PIN to show the full interface.
                                                </p>
                                                <v-text-field
                                                        v-model="pin"
                                                        label="PIN"
                                                        type="password"
                                                        counter="6"
                                                        maxlength="6"
                                                        :error-messages="error"
                                                        @keyup.enter="submit"
                                                />
                                        </v-card-text>
                                        <v-card-actions>
                                                <v-spacer />
                                                <v-btn text @click="reset">Clear</v-btn>
                                                <v-btn color="primary" @click="submit">Unlock</v-btn>
                                        </v-card-actions>
                                </v-card>
                        </v-col>
                </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

const PIN_CODE = "123456";

export default Vue.extend({
        data() {
                return {
                        pin: "",
                        error: ""
                };
        },
        methods: {
                reset(): void {
                        this.pin = "";
                        this.error = "";
                },
                submit(): void {
                        if (this.pin === PIN_CODE) {
                                store.commit("settings/update", { uiUnlocked: true });
                                this.reset();
                        } else {
                                this.error = "Invalid PIN";
                        }
                }
        }
});
</script>
