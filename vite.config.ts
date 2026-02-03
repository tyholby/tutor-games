import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// Plugin to copy SVG flags to public directory
function copySvgFlags() {
	return {
		name: 'copy-svg-flags',
		buildStart() {
			const srcDir = join(process.cwd(), 'node_modules/svg-country-flags/svg')
			const destDir = join(process.cwd(), 'public/node_modules/svg-country-flags/svg')
			
			try {
				// Create destination directory
				mkdirSync(destDir, { recursive: true })
				
				// Copy all SVG files
				const files = readdirSync(srcDir)
				files.forEach(file => {
					if (file.endsWith('.svg')) {
						const srcPath = join(srcDir, file)
						const destPath = join(destDir, file)
						copyFileSync(srcPath, destPath)
					}
				})
			} catch (error) {
				console.warn('Could not copy SVG flags:', error)
			}
		},
	}
}

// Plugin to copy index.html to 404.html for GitHub Pages SPA support
function copy404Html() {
	return {
		name: 'copy-404-html',
		writeBundle() {
			const distDir = join(process.cwd(), 'dist')
			const indexPath = join(distDir, 'index.html')
			const notFoundPath = join(distDir, '404.html')
			
			try {
				copyFileSync(indexPath, notFoundPath)
			} catch (error) {
				console.warn('Could not copy index.html to 404.html:', error)
			}
		},
	}
}

// https://vite.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/tutor-games/' : '/',
	plugins: [
		vue(),
		vueDevTools(),
		vuetify({ autoImport: true }),
		copySvgFlags(),
		copy404Html(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
