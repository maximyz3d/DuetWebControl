<template>
        <div>
                <v-card outlined>
                        <v-card-title>
                                BtnCmd
                        </v-card-title>
                        <v-card-text>
                                <p class="mb-4">Enter the unlock code to access the full interface.</p>
                                <v-btn color="primary" @click="$emit('request-unlock')" class="mr-2">
                                        <v-icon left>mdi-lock-open-variant</v-icon>
                                        Unlock
                                </v-btn>
                        </v-card-text>
                </v-card>
        </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
});
</script>
