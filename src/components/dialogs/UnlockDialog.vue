<template>
        <v-dialog :value="value" max-width="400" @input="$emit('input', $event)">
                <v-card>
                        <v-card-title>
                                Unlock Interface
                        </v-card-title>
                        <v-card-text>
                                <v-text-field
                                        v-model="pin"
                                        autofocus
                                        label="Enter 6-digit PIN"
                                        type="password"
                                        counter="6"
                                        maxlength="6"
                                        :error-messages="error"
                                        @keyup.enter="submit"
                                />
                        </v-card-text>
                        <v-card-actions>
                                <v-spacer />
                                <v-btn text @click="close">Close</v-btn>
                                <v-btn color="primary" @click="submit">Unlock</v-btn>
                        </v-card-actions>
                </v-card>
        </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

const PIN_CODE = "123456";

export default Vue.extend({
        props: {
                value: { type: Boolean, default: false }
        },
        data() {
                return {
                        pin: "",
                        error: ""
                };
        },
        methods: {
                close(): void {
                        this.$emit("input", false);
                        this.pin = "";
                        this.error = "";
                },
                submit(): void {
                        if (this.pin === PIN_CODE) {
                                this.$emit("unlocked");
                                this.close();
                        } else {
                                this.error = "Invalid PIN";
                        }
                }
        }
});
</script>
