<template>
	<v-card outlined>
		<v-card-title>
			{{ $t("panel.settingsHideMenuItems.caption") }}
		</v-card-title>

		<v-card-text class="d-flex flex-column">
			<v-switch :label="$t('panel.settingsHideMenuItems.console')" class="mt-0 mb-3" hide-details
					  v-model="hideConsole" />
			<v-switch :label="$t('panel.settingsHideMenuItems.filamentFiles')" class="mt-0 mb-3" hide-details
					  v-model="hideFilamentFiles" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.macroFiles')" class="mt-0 mb-3" hide-details
                                          v-model="hideMacroFiles" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.systemFiles')" class="mt-0 mb-3" hide-details
                                          v-model="hideSystemFiles" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.machineSettings')" class="mt-0 mb-3" hide-details
                                          v-model="hideMachineSettings" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.pluginSettings')" class="mt-0 mb-3" hide-details
                                          v-model="hidePluginSettings" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.generalSettings')" class="mt-0 mb-3" hide-details
                                          v-model="hideGeneralSettings" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.dashboard')" class="mt-0 mb-3" hide-details
                                          v-model="hideDashboard" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.status')" class="mt-0 mb-3" hide-details
                                          v-model="hideStatus" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.jobStatus')" class="mt-0 mb-3" hide-details
                                          v-model="hideJobStatus" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.webcam')" class="mt-0 mb-3" hide-details
                                          v-model="hideWebcam" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.objectModel')" class="mt-0 mb-3" hide-details
                                          v-model="hideObjectModel" />
                        <v-switch :label="$t('panel.settingsHideMenuItems.inputShaping')" class="mt-0 mb-3" hide-details
                                          v-model="hideInputShaping" />
                </v-card-text>
        </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import store from "@/store";

function createHiddenComputed(path: string) {
        return {
                get(): boolean { return store.state.settings.hiddenMenuItems.includes(path); },
                set(value: boolean) {
                        const items = new Set(store.state.settings.hiddenMenuItems);
                        if (value) {
                                items.add(path);
                        } else {
                                items.delete(path);
                        }
                        store.commit("settings/update", { hiddenMenuItems: Array.from(items) });
                }
        };
}

export default Vue.extend({
        computed: {
                hideConsole: createHiddenComputed("/Console"),
                hideFilamentFiles: createHiddenComputed("/Files/Filaments"),
                hideMacroFiles: createHiddenComputed("/Files/Macros"),
                hideSystemFiles: createHiddenComputed("/Files/System"),
                hideMachineSettings: createHiddenComputed("/Settings/Machine"),
                hidePluginSettings: createHiddenComputed("/Settings/Plugins"),
                hideGeneralSettings: createHiddenComputed("/Settings/General"),
                hideDashboard: createHiddenComputed("/"),
                hideStatus: createHiddenComputed("/Status"),
                hideJobStatus: createHiddenComputed("/Job/Status"),
                hideWebcam: createHiddenComputed("/Job/Webcam"),
                hideObjectModel: createHiddenComputed("/Plugins/ObjectModel"),
                hideInputShaping: createHiddenComputed("/Plugins/InputShaping")
        }
});
</script>
