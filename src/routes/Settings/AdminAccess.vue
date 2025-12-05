<template>
        <v-container class="mt-3" fluid>
                <v-row justify="center">
                        <v-col cols="12" md="6">
                                <v-card class="mb-3">
                                        <v-card-title>
                                                Admin Access
                                        </v-card-title>

                                        <v-card-text>
                                                <v-alert :type="isLocked ? 'info' : 'success'" dense text class="mb-3">
                                                        <span v-if="isLocked">User mode is active. Enter credentials to unlock admin access.</span>
                                                        <span v-else>Admin mode is active. All tabs are visible.</span>
                                                </v-alert>
                                                <v-alert v-if="error" type="error" dense text class="mb-3">
                                                        Invalid credentials. Please try again.
                                                </v-alert>

                                                <v-text-field
                                                        v-model="username"
                                                        label="Username"
                                                        autocomplete="off"
                                                        :disabled="!isLocked"
                                                />
                                                <v-text-field
                                                        v-model="password"
                                                        label="Password"
                                                        type="password"
                                                        autocomplete="off"
                                                        :disabled="!isLocked"
                                                />
                                        </v-card-text>

                                        <v-card-actions>
                                                <v-btn color="primary" :disabled="!isLocked" @click="unlock">Unlock</v-btn>
                                                <v-spacer />
                                                <v-btn color="secondary" :disabled="isLocked" @click="lock">Lock User Mode</v-btn>
                                        </v-card-actions>
                                </v-card>
                        </v-col>
                </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import store from "@/store";
import { DefaultLockedMenuItems } from "@/store/settings";

export default Vue.extend({
        data() {
                return {
                        username: "",
                        password: "",
                        error: false
                };
        },
        computed: {
                isLocked(): boolean {
                        return store.state.settings.locked;
                }
        },
        methods: {
                unlock(): void {
                        if (this.username === "SQ4D" && this.password === "SQ4D1234") {
                                this.error = false;
                                store.commit("settings/update", { locked: false, hiddenMenuItems: [] });
                        } else {
                                this.error = true;
                        }
                },
                lock(): void {
                        this.error = false;
                        store.commit("settings/update", { locked: true, hiddenMenuItems: [...DefaultLockedMenuItems] });
                }
        }
});
</script>
