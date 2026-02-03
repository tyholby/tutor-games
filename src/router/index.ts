import { createRouter, createWebHistory } from 'vue-router'
import GameSelection from '@/views/GameSelection.vue'
import UnitSelection from '@/views/UnitSelection.vue'
import Games from '@/views/Games.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: GameSelection,
		},
		{
			path: '/units',
			name: 'UnitSelection',
			component: UnitSelection,
		},
		{
			path: '/games',
			name: 'Games',
			component: Games,
		},
	],
})

export default router
