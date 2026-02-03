<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUnitsStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { Unit } from '@/types'

const router = useRouter()
const unitsStore = useUnitsStore()
const { selectedUnitKeys } = storeToRefs(unitsStore)

const units = computed(() => unitsStore.availableUnits)
const selectedGame = computed(() => unitsStore.selectedGame)
const isMultipleUnits = computed(() => !!selectedGame.value?.isMultipleUnits)

onMounted(() => {
	if (!unitsStore.selectedGameKey) {
		router.push({ name: 'Home' })
	}
})

const availableUnits = computed(() => units.value.filter((u: Unit) => !u.comingSoon))

const toggleSelectAll = () => {
	const availableKeys = availableUnits.value.map((u: Unit) => u.key)
	if (selectedUnitKeys.value.length === availableKeys.length) {
		unitsStore.setSelectedUnitKeys([])
	} else {
		unitsStore.setSelectedUnitKeys([...availableKeys])
	}
}

const selectSingleUnit = (unitKey: string) => {
	const unit = units.value.find((u: Unit) => u.key === unitKey)
	if (unit && !unit.comingSoon) {
		unitsStore.setSelectedUnitKeys([unitKey])
		// Automatically advance to game for single-select mode
		goToGames()
	}
}

const allSelected = computed(() => {
	const availableKeys = availableUnits.value.map((u: Unit) => u.key)
	return availableKeys.length > 0 && availableKeys.every(key => selectedUnitKeys.value.includes(key))
})

const someSelected = computed(() => {
	const availableKeys = availableUnits.value.map((u: Unit) => u.key)
	const selectedAvailable = availableKeys.filter(key => selectedUnitKeys.value.includes(key))
	return selectedAvailable.length > 0 && selectedAvailable.length < availableKeys.length
})

const canStudy = computed(() => selectedUnitKeys.value.length > 0)

// Group units by header
const groupedUnits = computed(() => {
	const groups: Record<string, Unit[]> = {}
	const noHeader: Unit[] = []
	
	units.value.forEach((unit: Unit) => {
		if (unit.header) {
			if (!groups[unit.header]) {
				groups[unit.header] = []
			}
			groups[unit.header].push(unit)
		} else {
			noHeader.push(unit)
		}
	})
	
	// Convert to array for easier iteration
	const headerGroups = Object.entries(groups).map(([header, headerUnits]) => ({
		header,
		units: headerUnits,
	}))
	
	return { headerGroups, noHeader }
})

const goBack = () => {
	router.push({ name: 'Home' })
}

const goToGames = () => {
	router.push({ name: 'Games' })
}
</script>

<template>
	<v-container fluid class="fill-height gradient-bg pa-0">
		<v-row justify="center" align="center" class="fill-height ma-0">
			<v-col cols="12" sm="10" md="8" lg="6" xl="5">
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
							What do you want to study?
						</v-card-title>
					</div>

					<v-card-text class="px-4 px-sm-8 pb-6 pt-4">
						<v-checkbox
							v-if="isMultipleUnits && availableUnits.length > 0"
							:model-value="allSelected"
							:indeterminate="someSelected"
							@click="toggleSelectAll"
							color="primary"
							:label="allSelected ? 'Deselect all' : 'Select all'"
							hide-details
							density="comfortable"
							class="select-all-checkbox mb-6"
						/>

						<v-divider v-if="isMultipleUnits" class="mb-6" />

						<div class="units-list">
							<!-- Units with headers -->
							<template v-for="(group, index) in groupedUnits.headerGroups" :key="group.header">
								<div class="unit-header" :class="{ 'mt-0': index === 0 }">
									<span>{{ group.header }}</span>
								</div>
								<div v-if="isMultipleUnits" class="mb-2">
									<v-list class="py-0 bg-transparent">
										<v-list-item
											v-for="unit in group.units"
											:key="unit.key"
											class="px-0 mb-3"
										>
											<template #default>
												<v-checkbox
													v-model="selectedUnitKeys"
													:value="unit.key"
													:label="unit.comingSoon ? `${unit.label} - Coming Soon` : unit.label"
													:disabled="!!unit.comingSoon"
													color="primary"
													hide-details
													density="comfortable"
													class="unit-checkbox"
												/>
											</template>
										</v-list-item>
									</v-list>
								</div>
								<div v-else class="mb-2">
									<v-btn
										v-for="unit in group.units"
										:key="unit.key"
										block
										size="large"
										color="primary"
										:disabled="!!unit.comingSoon"
										variant="outlined"
										class="unit-button mb-3 text-left justify-start"
										@click="selectSingleUnit(unit.key)"
									>
										<span class="text-body-1">{{ unit.comingSoon ? `${unit.label} - Coming Soon` : unit.label }}</span>
									</v-btn>
								</div>
							</template>
							
							<!-- Units without headers -->
							<template v-if="groupedUnits.noHeader.length > 0">
								<div v-if="isMultipleUnits">
									<v-list class="py-0 bg-transparent">
										<v-list-item
											v-for="unit in groupedUnits.noHeader"
											:key="unit.key"
											class="px-0 mb-3"
										>
											<template #default>
												<v-checkbox
													v-model="selectedUnitKeys"
													:value="unit.key"
													:label="unit.comingSoon ? `${unit.label} - Coming Soon` : unit.label"
													:disabled="!!unit.comingSoon"
													color="primary"
													hide-details
													density="comfortable"
													class="unit-checkbox"
												/>
											</template>
										</v-list-item>
									</v-list>
								</div>
								<div v-else>
									<v-btn
										v-for="unit in groupedUnits.noHeader"
										:key="unit.key"
										block
										size="large"
										color="primary"
										:disabled="!!unit.comingSoon"
										variant="outlined"
										class="unit-button mb-3 text-left justify-start"
										@click="selectSingleUnit(unit.key)"
									>
										<span class="text-body-1">{{ unit.comingSoon ? `${unit.label} - Coming Soon` : unit.label }}</span>
									</v-btn>
								</div>
							</template>
						</div>
					</v-card-text>

					<v-card-actions v-if="isMultipleUnits" class="pa-4 pa-sm-8 pt-0 mb-12">
						<v-btn
							block
							size="x-large"
							color="primary"
							:disabled="!canStudy"
							@click="goToGames"
							elevation="4"
							rounded="lg"
							class="text-h6 font-weight-bold"
							variant="flat"
						>
							Start Game
						</v-btn>
					</v-card-actions>
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

.unit-checkbox :deep(.v-label),
.select-all-checkbox :deep(.v-label) {
	font-size: 1.125rem;
	font-weight: 500;
	opacity: 1;
}

.unit-checkbox :deep(.v-selection-control__input),
.select-all-checkbox :deep(.v-selection-control__input) {
	transform: scale(1.4);
}

.unit-button {
	text-transform: none;
	height: auto;
	min-height: 48px;
	padding: 12px 16px;
	font-weight: 500;
}

.v-card {
	backdrop-filter: blur(10px);
}

.unit-header {
	padding-top: 16px;
	padding-bottom: 8px;
	margin-bottom: 8px;
}

.unit-header span {
	font-size: 0.875rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: rgba(var(--v-theme-on-surface), 0.6);
	font-weight: 600;
}
</style>
