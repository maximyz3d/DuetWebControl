<template>
        <v-container fluid class="mt-3">
                <v-row justify="center">
                        <v-col cols="12" md="8">
                                <v-card outlined>
                                        <v-card-title>
                                                <v-icon left class="mr-2">mdi-gesture-tap-button</v-icon>
                                                {{ $t('control.btnCmd.caption') }}
                                        </v-card-title>
                                        <v-card-text>
                                                <p class="mb-4">{{ $t('control.btnCmd.description') }}</p>
                                                <v-btn color="primary" class="mr-2" :to="'/Files/Macros'">
                                                        <v-icon left>mdi-play-circle</v-icon>
                                                        {{ $t('control.btnCmd.openMacros') }}
                                                </v-btn>
                                                <v-btn color="secondary" class="mr-2" :to="'/Console'">
                                                        <v-icon left>mdi-code-braces</v-icon>
                                                        {{ $t('control.btnCmd.openConsole') }}
                                                </v-btn>
                                                <v-btn color="info" :to="'/Job/Status'">
                                                        <v-icon left>mdi-information-outline</v-icon>
                                                        {{ $t('control.btnCmd.viewStatus') }}
                                                </v-btn>
                                        </v-card-text>
                                </v-card>
                        </v-col>
                </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
