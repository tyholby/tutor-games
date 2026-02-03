import { defineStore } from 'pinia'
import _mapKeys from 'lodash/mapKeys'
import type { Unit, Game } from '@/types'
import { units, games } from '@/database/data'

export interface State {
	units: Unit[]
	unitsMap: Record<string, Unit>
	games: Game[]
	gamesMap: Record<string, Game>
	selectedGameKey: string | null
	selectedUnitKeys: string[]
}

export const useUnitsStore = defineStore('units', {
	state: () => ({
		units: units as Unit[],
		unitsMap: _mapKeys(units, 'key') as Record<string, Unit>,
		games: games as Game[],
		gamesMap: _mapKeys(games, 'key') as Record<string, Game>,
		selectedGameKey: null as string | null,
		selectedUnitKeys: [] as string[],
	}),
	getters: {
		selectedUnits: (state) => {
			return state.selectedUnitKeys
				.filter((key: string) => state.unitsMap[key])
				.map((key: string) => state.unitsMap[key])
		},
		selectedGame: (state) => {
			return state.selectedGameKey ? state.gamesMap[state.selectedGameKey] : null
		},
		availableUnits: (state) => {
			if (!state.selectedGameKey) return state.units
			return state.units.filter(unit => unit.gameKeys.includes(state.selectedGameKey!))
		},
	},
	actions: {
		setSelectedGameKey(key: string | null) {
			this.selectedGameKey = key
		},
		setSelectedUnitKeys(keys: string[]) {
			this.selectedUnitKeys = keys || []
		},
	},
})
