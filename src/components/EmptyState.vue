<script setup lang="ts">
defineProps<{
	icon: string
	title: string
	message: string
}>()
</script>

<template>
<v-sheet class="pa-8 pa-sm-12 text-center" rounded="lg">
	<v-icon size="80" color="primary" class="mb-4">
		{{ icon }}
	</v-icon>
	<div class="text-h5 mb-3 font-weight-medium">
		{{ title }}
	</div>
	<div class="text-body-1 text-medium-emphasis">
		{{ message }}
	</div>
</v-sheet>
</template>

