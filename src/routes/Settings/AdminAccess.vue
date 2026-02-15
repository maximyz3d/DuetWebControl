<template>
        <v-card class="mt-3" outlined>
                <v-card-title>
                        <v-icon left class="mr-2">mdi-lock</v-icon>
                        {{ $t('settings.adminAccess.title') }}
                </v-card-title>
                <v-card-text>
                        <div v-if="isUnlocked" class="mb-4">
                                <v-alert type="success" dense text>
                                        {{ $t('settings.adminAccess.unlocked') }}
                                </v-alert>
                        </div>
                        <v-form ref="form" @submit.prevent="unlock">
                                <v-text-field
                                        v-model="username"
                                        :label="$t('settings.adminAccess.username')"
                                        prepend-icon="mdi-account"
                                        :disabled="isUnlocked"
                                        outlined
                                        dense
                                        required
                                />
                                <v-text-field
                                        v-model="password"
                                        :label="$t('settings.adminAccess.password')"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        :disabled="isUnlocked"
                                        outlined
                                        dense
                                        required
                                />
                                <v-alert v-if="error" type="error" dense text>{{ error }}</v-alert>
                                <v-btn v-if="!isUnlocked" color="primary" class="mt-3" @click="unlock">
                                        {{ $t('settings.adminAccess.unlock') }}
                                </v-btn>
                                <v-btn v-else color="secondary" class="mt-3" @click="lock">
                                        {{ $t('settings.adminAccess.lock') }}
                                </v-btn>
                        </v-form>
                </v-card-text>
        </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import store from "@/store";
import { DefaultHiddenMenuItems } from "@/store/settings";

const ADMIN_USERNAME = "SQ4D";
const ADMIN_PASSWORD = "SQ4D1234";

export default Vue.extend({
        data() {
                return {
                        username: "",
                        password: "",
                        error: ""
                };
        },
        computed: {
                isUnlocked(): boolean {
                        return store.state.settings.adminUnlocked;
                }
        },
        methods: {
                unlock() {
                        if (this.username === ADMIN_USERNAME && this.password === ADMIN_PASSWORD) {
                                store.commit("settings/update", { hiddenMenuItems: [], adminUnlocked: true });
                                this.error = "";
                        } else {
                                this.error = this.$t("settings.adminAccess.invalidCredentials") as string;
                        }
                },
                lock() {
                        store.commit("settings/update", { hiddenMenuItems: [...DefaultHiddenMenuItems], adminUnlocked: false });
                        this.username = "";
                        this.password = "";
                        this.error = "";
                        this.$router.push("/");
                }
        }
});
</script>
