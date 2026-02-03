<script setup lang="ts">
defineProps<{
	icon: string
	title: string
	description: string
}>()

defineEmits<{
	click: []
}>()
</script>

<template>
<v-card
	class="game-card"
	elevation="4"
	rounded="lg"
	hover
	@click="$emit('click')"
>
	<v-card-text class="pa-6">
		<div class="d-flex align-center">
			<v-avatar size="64" color="primary" class="mr-4">
				<v-icon size="40" color="white">{{ icon }}</v-icon>
			</v-avatar>
			<div class="flex-grow-1">
				<div class="text-h6 font-weight-bold mb-1">
					{{ title }}
				</div>
				<div class="text-body-2 text-medium-emphasis">
					{{ description }}
				</div>
			</div>
			<v-icon color="primary" size="24">
				mdi-chevron-right
			</v-icon>
		</div>
	</v-card-text>
</v-card>
</template>

<style scoped>
.game-card {
	cursor: pointer;
	transition: all 0.3s ease;
}

.game-card:hover {
	transform: translateY(-2px);
}
</style>

