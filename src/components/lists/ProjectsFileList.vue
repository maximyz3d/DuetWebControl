<template>
	<div class="component">
		<v-toolbar>
			<!-- Custom breadcrumbs: Projects (bold) > MyProject > Gcode -->
			<div class="d-flex align-center">
				<!-- Projects: bold AND clickable to go back to root -->
				<a href="#"
				   class="font-weight-bold text--primary"
				   @click.prevent="goToRoot">
					Projects
				</a>

				<span v-for="(seg, index) in pathSegments"
					  :key="index"
					  class="d-flex align-center">
					<span>&nbsp;&gt;&nbsp;</span>
					<a href="#"
					   @click.prevent="goToSegment(index)"
					   class="text--primary">
						{{ seg }}
					</a>
				</span>
			</div>


			<v-spacer />

			<!-- New File -->
			<v-btn class="hidden-sm-and-down mr-3"
				   :disabled="uiFrozen"
				   :elevation="1"
				   @click="showNewFile = true">
				<v-icon class="mr-1">mdi-file-plus</v-icon>
				{{ $t("button.newFile.caption") }}
			</v-btn>

			<!-- New Directory -->
			<v-btn class="hidden-sm-and-down mr-3"
				   :disabled="uiFrozen"
				   :elevation="1"
				   @click="showNewDirectory = true">
				<v-icon class="mr-1">mdi-folder-plus</v-icon>
				{{ $t("button.newDirectory.caption") }}
			</v-btn>

			<!-- New Project -->
			<v-btn class="hidden-sm-and-down mr-3"
				   color="secondary"
				   :disabled="uiFrozen"
				   :elevation="1"
				   @click="showNewProject = true">
				<v-icon class="mr-1">mdi-folder-multiple-plus</v-icon>
				New Project
			</v-btn>

			<!-- Refresh -->
			<v-btn class="hidden-sm-and-down mr-3"
				   color="info"
				   :loading="loading"
				   :disabled="uiFrozen"
				   :elevation="1"
				   @click="refresh">
				<v-icon class="mr-1">mdi-refresh</v-icon>
				{{ $t("button.refresh.caption") }}
			</v-btn>

			<!-- Upload (label from button.upload.projects.* in en.json) -->
			<upload-btn class="hidden-sm-and-down"
						:elevation="1"
						:directory="directory"
						target="projects"
						color="primary" />
		</v-toolbar>

		<base-file-list ref="filelist"
						v-model="selection"
						:directory.sync="directory"
						:loading.sync="loading"
						sort-table="sys"
						:noFilesText="noFilesText" />

		<!-- Mobile speed-dial actions -->
		<v-speed-dial v-model="fab"
					  bottom
					  right
					  fixed
					  direction="top"
					  transition="scale-transition"
					  class="hidden-md-and-up">
			<template #activator>
				<v-btn v-model="fab" dark color="primary" fab>
					<v-icon v-if="fab">mdi-close</v-icon>
					<v-icon v-else>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-btn fab :disabled="uiFrozen" @click="showNewFile = true">
				<v-icon>mdi-file-plus</v-icon>
			</v-btn>

			<v-btn fab :disabled="uiFrozen" @click="showNewDirectory = true">
				<v-icon>mdi-folder-plus</v-icon>
			</v-btn>

			<v-btn fab :disabled="uiFrozen" color="secondary" @click="showNewProject = true">
				<v-icon>mdi-folder-multiple-plus</v-icon>
			</v-btn>

			<v-btn fab color="info" :loading="loading" :disabled="uiFrozen" @click="refresh">
				<v-icon>mdi-refresh</v-icon>
			</v-btn>

			<upload-btn fab
						dark
						:directory="directory"
						target="projects"
						color="primary">
				<v-icon>mdi-cloud-upload</v-icon>
			</upload-btn>
		</v-speed-dial>

		<!-- Existing dialogs -->
		<new-directory-dialog :shown.sync="showNewDirectory" :directory="directory" />
		<new-file-dialog :shown.sync="showNewFile" :directory="directory" />

		<!-- New Project dialog -->
		<v-dialog v-model="showNewProject" max-width="400">
			<v-card>
				<v-card-title>New Project</v-card-title>
				<v-card-text>
					<v-text-field v-model="newProjectName"
								  label="Project name"
								  autofocus
								  clearable />
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="cancelNewProject">
						Cancel
					</v-btn>
					<v-btn color="primary" text @click="confirmNewProject">
						Create
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	import store from "@/store";
	import { BaseFileListItem } from "./BaseFileList.vue";

	export default Vue.extend({
		computed: {
			uiFrozen(): boolean {
				return store.getters["uiFrozen"];
			},
			selectedMachine(): string {
				return store.state.selectedMachine;
			},
			noFilesText(): string {
				return this.$t("list.baseFileList.noFiles") as string;
			},
			// segments after "0:/projects/"
			pathSegments(): string[] {
				const root = "0:/projects/";
				let dir = this.directory || root;

				if (!dir.startsWith(root)) {
					return [];
				}

				const remainder = dir.slice(root.length);
				const parts = remainder.split("/").filter(p => p.length > 0);
				return parts;
			}
		},
		data() {
			return {
				directory: "0:/projects/",
				loading: false,
				selection: new Array<BaseFileListItem>(),
				showNewDirectory: false,
				showNewFile: false,
				showNewProject: false,
				newProjectName: "",
				fab: false
			};
		},
		methods: {
			refresh() {
				(this.$refs.filelist as any).refresh();
			},
			normalizeDirectory() {
				const root = "0:/projects/";
				if (!this.directory || this.directory === "0:" || this.directory === "0") {
					this.directory = root;
				}
			},
            goToRoot() {
                const root = "0:/projects/";
                this.directory = root;
                this.refresh();
            },
			// click crumb: index 0 => first folder after Projects, etc.
			goToSegment(index: number) {
				const root = "0:/projects/";
				const parts = this.pathSegments.slice(0, index + 1);
				const newDir = root + parts.join("/") + "/";

				this.directory = newDir;
				this.refresh();
			},
			cancelNewProject() {
				this.showNewProject = false;
				this.newProjectName = "";
			},
			confirmNewProject() {
				const name = this.newProjectName.trim();
				if (!name) {
					return;
				}

				// Call the Duet macro to create the full project tree
				const gcode = `M98 P"0:/sys/project_create.g" S"${name}"`;
				store.dispatch("machine/sendCode", gcode);

				this.showNewProject = false;
				this.newProjectName = "";

				// Give firmware a moment, then refresh
				setTimeout(() => this.refresh(), 500);
			}
		},
		mounted() {
			this.directory = "0:/projects/";
			this.refresh();
		},
		watch: {
			selectedMachine() {
				this.directory = "0:/projects/";
				this.refresh();
			},
			directory() {
				this.$nextTick(() => this.normalizeDirectory());
			}
		}
	});
</script>
