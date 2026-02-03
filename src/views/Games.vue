<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUnitsStore } from '@/store'
import { GAME_KEYS } from '@/database/data'
import EmptyState from '@/components/EmptyState.vue'
import FlashCardsGame from '@/components/FlashCardsGame.vue'

const router = useRouter()
const unitsStore = useUnitsStore()

const selectedGame = computed(() => unitsStore.selectedGame)
const selectedUnits = computed(() => unitsStore.selectedUnits)
const isFlashCards = computed(() => unitsStore.selectedGameKey === GAME_KEYS.FLASH_CARDS)

onMounted(() => {
	if (unitsStore.selectedUnitKeys.length === 0 || !unitsStore.selectedGameKey) {
		router.push({ name: 'Home' })
	}
})

const goBack = () => {
	router.push({ name: 'UnitSelection' })
}

const handleGameComplete = () => {
	// Could navigate back or show a completion message
	// For now, just go back to unit selection
	router.push({ name: 'UnitSelection' })
}
</script>

<template>
<v-container fluid class="fill-height gradient-bg pa-0">
	<v-row justify="center" align="center" class="fill-height ma-0">
		<v-col cols="12" sm="11" md="10" lg="9" xl="8">
			<v-card elevation="24" rounded="xl" class="mx-4">
				<div class="d-flex align-center pa-4 pa-sm-6 pb-0">
					<v-btn
						icon
						@click="goBack"
						variant="text"
						size="large"
					>
						<v-icon>mdi-arrow-left</v-icon>
					</v-btn>
					<v-card-title class="text-h5 text-sm-h4 text-center flex-grow-1 pa-0 pr-12">
						{{ selectedGame?.title || 'Game' }}
					</v-card-title>
				</div>

				<v-card-text class="px-4 px-sm-8 pb-6 pt-4">
					<flash-cards-game
						v-if="isFlashCards"
						:unit-keys="unitsStore.selectedUnitKeys"
						@complete="handleGameComplete"
					/>
					<empty-state
						v-else
						:icon="selectedGame?.icon || 'mdi-gamepad-variant'"
						:title="`${selectedGame?.title || 'Game'} - Coming Soon!`"
						message="The game interface will appear here"
					/>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<style scoped>
.gradient-bg {
	background: linear-gradient(135deg, #1976D2 0%, #1565C0 50%, #0D47A1 100%);
	min-height: 100vh;
}

.v-card {
	backdrop-filter: blur(10px);
}
</style>

