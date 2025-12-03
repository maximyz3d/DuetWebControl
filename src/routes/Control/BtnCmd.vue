<template>
        <v-container>
                <v-row justify="center">
                        <v-col cols="12" md="8" lg="6">
                                <v-card>
                                        <v-card-title class="headline">
                                                Button Commands
                                        </v-card-title>
                                        <v-card-text>
                                                <p class="mb-4">
                                                        Enter the 6-digit access PIN to unlock the full interface.
                                                </p>

                                                <v-text-field
                                                        v-model="pin"
                                                        label="Access PIN"
                                                        type="password"
                                                        autocomplete="off"
                                                        maxlength="6"
                                                        counter
                                                        outlined
                                                        @keyup.enter="submit"
                                                />

                                                <v-alert v-if="error" type="error" dense class="mt-2">
                                                        Incorrect PIN. Please try again.
                                                </v-alert>
                                                <v-alert v-else-if="!locked" type="success" dense class="mt-2">
                                                        Interface unlocked. Hidden tabs are now available.
                                                </v-alert>
                                        </v-card-text>
                                        <v-card-actions>
                                                <v-btn color="primary" :disabled="pin.length !== 6" @click="submit">
                                                        Unlock
                                                </v-btn>
                                                <v-btn text @click="reset">
                                                        Clear
                                                </v-btn>
                                                <v-spacer />
                                                <v-btn text v-if="!locked" @click="lock">
                                                        Lock Again
                                                </v-btn>
                                        </v-card-actions>
                                </v-card>
                        </v-col>
                </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import store from "@/store";

const unlockPin = "123456";

export default Vue.extend({
        data() {
                return {
                        pin: "",
                        error: false
                };
        },
        computed: {
                locked(): boolean {
                        return store.state.uiLocked;
                }
        },
        methods: {
                submit(): void {
                        if (this.pin === unlockPin) {
                                store.commit("setUiLocked", false);
                                this.error = false;
                        } else {
                                this.error = true;
                        }
                },
                reset(): void {
                        this.pin = "";
                        this.error = false;
                },
                lock(): void {
                        store.commit("setUiLocked", true);
                        this.reset();
                }
        }
});
</script>
