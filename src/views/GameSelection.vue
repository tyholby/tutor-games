<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUnitsStore } from '@/store'
import GameCard from '@/components/GameCard.vue'

const router = useRouter()
const store = useUnitsStore()

const games = computed(() => store.games)

const selectGame = (gameKey: string) => {
	store.setSelectedGameKey(gameKey)
	router.push({ name: 'UnitSelection' })
}
</script>

<template>
	<v-container fluid class="fill-height gradient-bg pa-0">
		<v-row justify="center" align="center" class="fill-height ma-0">
			<v-col cols="12" sm="10" md="8" lg="6" xl="5">
			    <v-card elevation="24" rounded="xl" class="mx-4">
					<v-card-title class="text-h5 text-sm-h4 text-center pa-6 pa-sm-8 pb-4 text-wrap">
						Which game do you want to play?
					</v-card-title>
					
					<v-card-text class="px-4 px-sm-8 pb-6">
						<game-card
							v-for="game in games"
							:key="game.key"
							:icon="game.icon"
							:title="game.title"
							:description="game.description"
							@click="selectGame(game.key)"
							class="mb-4"
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

