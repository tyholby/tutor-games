<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// @ts-ignore - lodash import type issue
import _shuffle from 'lodash/shuffle'
import type { FlashCard } from '@/types'
import { getFlashCardsForUnitKeys } from '@/database/data'

interface CardWithId extends FlashCard {
	id: string
}

const props = defineProps<{
	unitKeys: string[]
}>()

const emit = defineEmits<{
	complete: []
}>()

const cards = ref<CardWithId[]>([])
const queue = ref<CardWithId[]>([])
const doneCards = ref<Set<string>>(new Set())
const missedCards = ref<Set<string>>(new Set()) // Track cards that have been missed at least once
const currentCard = ref<CardWithId | null>(null)
const isFlipped = ref(false)
const isCompleting = ref(false)
const showAnswersList = ref(true)

// History for undo functionality
interface ActionHistory {
	type: 'right' | 'wrong'
	card: CardWithId
	queueBefore: CardWithId[]
	doneCardsBefore: Set<string>
	missedCardsBefore: Set<string>
}

const actionHistory = ref<ActionHistory[]>([])

// Initialize cards from unit keys
onMounted(() => {
	const flashCards = getFlashCardsForUnitKeys(props.unitKeys)
	
	// Add unique IDs to cards
	const cardsWithIds: CardWithId[] = flashCards.map((card, index) => ({
		...card,
		id: `${card.category}-${index}-${Date.now()}-${Math.random()}`,
	}))
	
	// Shuffle initially
	cards.value = cardsWithIds
	queue.value = _shuffle([...cardsWithIds])
	
	// Start with first card
	if (queue.value.length > 0) {
		currentCard.value = queue.value[0]
	}
})

const progress = computed(() => {
	if (cards.value.length === 0) return 0
	return Math.round((doneCards.value.size / cards.value.length) * 100)
})

const remainingCount = computed(() => {
	return queue.value.length
})

// Extract text from HTML (simple version - just removes tags)
const stripHtml = (html: string): string => {
	const tmp = document.createElement('DIV')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

// Get all answers sorted alphabetically
const allAnswers = computed(() => {
	return [...cards.value]
		.map(card => ({
			id: card.id,
			answerText: stripHtml(card.answerTitleHtml),
			answerHtml: card.answerTitleHtml,
			isDone: doneCards.value.has(card.id),
		}))
		.sort((a, b) => a.answerText.localeCompare(b.answerText))
})

const toggleAnswersList = () => {
	showAnswersList.value = !showAnswersList.value
}

const handleFlip = () => {
	isFlipped.value = !isFlipped.value
}

const handleWrong = () => {
	if (!currentCard.value) return
	
	const card = currentCard.value
	isFlipped.value = false
	
	// Save state for undo
	const queueBefore = [...queue.value]
	const doneCardsBefore = new Set(doneCards.value)
	const missedCardsBefore = new Set(missedCards.value)
	actionHistory.value.push({
		type: 'wrong',
		card,
		queueBefore,
		doneCardsBefore,
		missedCardsBefore,
	})
	
	// Wait for flip animation to complete before changing card
	setTimeout(() => {
		// Mark card as missed
		missedCards.value.add(card.id)
		
		// Remove from current position in queue
		const remainingCards = queue.value.filter(c => c.id !== card.id)
		
		// Separate cards into: not missed vs missed
		const notMissedCards = remainingCards.filter(c => !missedCards.value.has(c.id))
		const missedCardsList = remainingCards.filter(c => missedCards.value.has(c.id))
		
		// Add the current wrong card to missed cards and shuffle them together
		const allMissedCards = [...missedCardsList, card]
		const shuffledMissed = _shuffle(allMissedCards)
		
		// Put not-missed cards first, then shuffled missed cards at the end
		queue.value = [...notMissedCards, ...shuffledMissed]
		
		// Move to next card
		if (queue.value.length > 0) {
			currentCard.value = queue.value[0]
		}
	}, 200) // Wait for flip animation
}

const handleRight = () => {
	if (!currentCard.value) return
	
	const card = currentCard.value
	isFlipped.value = false
	
	// Save state for undo
	const queueBefore = [...queue.value]
	const doneCardsBefore = new Set(doneCards.value)
	const missedCardsBefore = new Set(missedCards.value)
	actionHistory.value.push({
		type: 'right',
		card,
		queueBefore,
		doneCardsBefore,
		missedCardsBefore,
	})
	
	// Wait for flip animation to complete before changing card
	setTimeout(() => {
		doneCards.value.add(card.id)
		
		// Remove from queue
		queue.value = queue.value.filter(c => c.id !== card.id)
		
		// Check if all done
		if (queue.value.length === 0) {
			isCompleting.value = true
			setTimeout(() => {
				emit('complete')
			}, 8000)
			return
		}
		
		// Move to next card
		currentCard.value = queue.value[0]
	}, 200) // Wait for flip animation
}

const handleUndo = () => {
	if (actionHistory.value.length === 0) return
	
	const lastAction = actionHistory.value.pop()!
	
	// Restore previous state
	queue.value = lastAction.queueBefore
	doneCards.value = new Set(lastAction.doneCardsBefore)
	missedCards.value = new Set(lastAction.missedCardsBefore)
	
	// Set current card to the one that was just undone
	currentCard.value = lastAction.card
	isFlipped.value = false
	
	// If we were completing, cancel that
	if (isCompleting.value) {
		isCompleting.value = false
	}
}

const canUndo = computed(() => actionHistory.value.length > 0 && !isCompleting.value)

const getMediaUrl = (path: string | null): string | null => {
	if (!path) return null
	
	// If it's already a full URL, return as is
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}
	
	// Get the base URL from Vite (includes /tutor-games/ in production)
	const baseUrl = import.meta.env.BASE_URL
	
	// Remove leading slash if present, then add base URL
	const cleanPath = path.startsWith('/') ? path.slice(1) : path
	return `${baseUrl}${cleanPath}`
}
</script>

<template>
	<div class="flash-cards-game">
		<div class="game-layout">
			<!-- Left Sidebar - Answers List -->
			<div class="answers-sidebar">
				<v-btn
					size="small"
					variant="elevated"
					color="primary"
					@click="toggleAnswersList"
					class="answers-toggle-btn mb-3"
					block
				>
					<v-icon class="mr-1">{{ showAnswersList ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
					{{ showAnswersList ? 'Hide' : 'Show' }} Answers
				</v-btn>
				<v-expand-transition>
					<v-sheet
						v-if="showAnswersList"
						class="answers-list pa-3"
						rounded="lg"
						elevation="2"
					>
						<div class="text-subtitle-2 font-weight-bold mb-3">
							All Answers ({{ doneCards.size }}/{{ cards.length }})
						</div>
						<div class="answers-grid">
							<div
								v-for="answer in allAnswers"
								:key="answer.id"
								class="answer-item"
								:class="{ 'answer-done': answer.isDone }"
							>
								<span v-html="answer.answerHtml"></span>
							</div>
						</div>
					</v-sheet>
				</v-expand-transition>
			</div>

			<!-- Main Content Area -->
			<div class="main-content">
				<!-- Progress Bar -->
				<div class="progress-section mb-6">
					<div class="d-flex justify-space-between align-center mb-2">
						<span class="text-body-2 font-weight-medium">Progress</span>
						<span class="text-body-2 font-weight-bold">{{ progress }}%</span>
					</div>
					<v-progress-linear
						:model-value="progress"
						color="success"
						height="12"
						rounded
						class="progress-bar"
					/>
					<div class="d-flex justify-space-between align-center mt-2">
						<div class="text-caption text-medium-emphasis no-select">
							{{ doneCards.size }} of {{ cards.length }} cards completed
							<span v-if="remainingCount > 0"> • {{ remainingCount }} remaining</span>
						</div>
						<v-btn
							v-if="canUndo"
							size="x-small"
							variant="text"
							@click="handleUndo"
						>
                            <v-icon size="12" class="mr-1">mdi-undo</v-icon>
							Undo
						</v-btn>
					</div>
				</div>

				<!-- Completion Screen -->
				<v-sheet
					v-if="isCompleting"
					class="completion-screen pa-8 pa-sm-12 text-center"
					rounded="xl"
					color="success"
				>
					<v-icon size="100" color="white" class="mb-4">
						mdi-check-circle
					</v-icon>
					<div class="text-h4 mb-3 font-weight-bold text-white">
						Great Job! 🎉
					</div>
					<div class="text-h6 text-white">
						You've completed all {{ cards.length }} flashcards!
					</div>
				</v-sheet>

				<!-- Card Display -->
				<div v-else-if="currentCard" class="card-container">
					<div
						class="flash-card"
						:class="{ 'is-flipped': isFlipped }"
						@click="handleFlip"
					>
						<div class="card-face card-front no-select">
							<div class="card-content">
								<div class="card-main-content">
									<div
										class="question-title mb-4"
										v-html="currentCard.questionTitleHtml"
									/>
									<div
										v-if="currentCard.questionDescriptionHtml"
										class="question-description mb-4"
										v-html="currentCard.questionDescriptionHtml"
									/>
									<div v-if="currentCard.pathToMedia" class="media-container">
										<div class="media-wrapper">
											<img
												v-if="getMediaUrl(currentCard.pathToMedia)"
												:src="getMediaUrl(currentCard.pathToMedia) || ''"
												:alt="currentCard.answerTitleHtml"
												class="media-image"
											/>
											<div
												v-for="(block, index) in currentCard.censorBlocks"
												:key="index"
												class="censor-block"
												:style="{
													top: block.top,
													left: block.left,
													width: block.width,
													height: block.height,
												}"
											/>
										</div>
									</div>
								</div>
								<div class="flip-hint">
									<v-icon size="24" class="mr-2">mdi-hand-pointing-right</v-icon>
									<span class="text-body-2">Click to flip</span>
								</div>
							</div>
						</div>
						<div class="card-face card-back no-select">
							<div class="card-content">
								<div class="card-main-content">
									<div
										class="answer-title mb-4"
										v-html="currentCard.answerTitleHtml"
									/>
									<div
										v-if="currentCard.answerDescriptionHtml"
										class="answer-description mb-6"
										v-html="currentCard.answerDescriptionHtml"
									/>
									<div class="action-buttons">
										<v-btn
											color="error"
											size="x-large"
											variant="elevated"
											class="mr-3 action-btn"
											@click.stop="handleWrong"
										>
											<v-icon start size="28">mdi-close</v-icon>
											<span class="text-h6">Got it Wrong</span>
										</v-btn>
										<v-btn
											color="success"
											size="x-large"
											variant="elevated"
											class="action-btn"
											@click.stop="handleRight"
										>
											<v-icon start size="28">mdi-check</v-icon>
											<span class="text-h6">Got it Right!</span>
										</v-btn>
									</div>
								</div>
								<div class="flip-hint">
									<v-icon size="24" class="mr-2">mdi-hand-pointing-right</v-icon>
									<span class="text-body-2">Click to flip</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Empty State -->
				<v-sheet v-else class="empty-state pa-8 text-center" rounded="xl">
					<v-icon size="80" color="primary" class="mb-4">
						mdi-cards-outline
					</v-icon>
					<div class="text-h6 mb-2">No flashcards found</div>
					<div class="text-body-2 text-medium-emphasis">
						Please select a unit with flashcards to study.
					</div>
				</v-sheet>
			</div>
		</div>
	</div>
</template>

<style scoped>
.flash-cards-game {
	width: 100%;
}

.game-layout {
	display: flex;
	gap: 24px;
	align-items: flex-start;
}

.answers-sidebar {
	flex: 0 0 280px;
	min-width: 280px;
	position: sticky;
	top: 20px;
}

.main-content {
	flex: 1;
	min-width: 0;
    width: 100%;
}

.progress-section {
	width: 100%;
}

.progress-bar {
	border-radius: 6px;
}

.card-container {
	perspective: 1000px;
	width: 100%;
	min-height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.flash-card {
	position: relative;
	width: 100%;
	max-width: 600px;
	height: 500px;
	transform-style: preserve-3d;
	transition: transform 0.3s;
	cursor: pointer;
}

.flash-card.is-flipped {
	transform: rotateY(180deg);
}

.card-face {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 16px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32px;
	overflow-y: auto;
}

.card-front {
	background: linear-gradient(135deg, #4c63d2 0%, #5a3d8a 100%);
	color: white;
}

.card-back {
	background: linear-gradient(135deg, #d870e8 0%, #d43a5a 100%);
	color: white;
	transform: rotateY(180deg);
}

.card-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
}

.card-main-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.question-title,
.answer-title {
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.4;
}

.question-description,
.answer-description {
	font-size: 1.125rem;
	line-height: 1.6;
	opacity: 0.95;
}

.media-container {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 24px 0;
}

.media-wrapper {
	position: relative;
	display: inline-block;
}

.media-image {
    width: 100vw;
	max-width: 100%;
	max-height: 300px;
	object-fit: contain;
	border-radius: 8px;
	display: block;
}

.censor-block {
	position: absolute;
	background: rgba(0, 0, 0, 0.97);
	border-radius: 4px;
	pointer-events: none;
}

.flip-hint {
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.8;
	padding-top: 16px;
	margin-top: auto;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.action-buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	flex-wrap: wrap;
}

.action-btn {
	min-height: 64px;
	min-width: 200px;
	padding: 16px 32px;
	font-weight: 600;
	letter-spacing: 0.5px;
}

.completion-screen {
	animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
	from {
		transform: scale(0.8);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}

.empty-state {
	background: rgba(255, 255, 255, 0.1);
}

.answers-toggle-btn {
	text-transform: none;
}

.answers-list {
	background: rgba(255, 255, 255, 0.95);
	max-height: calc(100vh - 200px);
	overflow-y: auto;
}

.answers-grid {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.answer-item {
	padding: 8px 12px;
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.05);
	transition: all 0.2s;
	font-size: 0.875rem;
	text-align: left;
}

.answer-item.answer-done {
	text-decoration: line-through;
	opacity: 0.6;
	color: #666;
	background: rgba(76, 175, 80, 0.1);
}

.answer-item:not(.answer-done) {
	font-weight: 500;
}


/* Responsive adjustments */
@media (max-width: 960px) {
	.game-layout {
		flex-direction: column;
	}
	
	.answers-sidebar {
		flex: 1;
		min-width: 100%;
		position: relative;
		top: 0;
		width: 100%;
	}
	
	.answers-list {
		max-height: 400px;
	}
}

@media (max-width: 600px) {
	.flash-card {
		height: 450px;
	}
	
	.card-face {
		padding: 24px;
	}
	
	.question-title,
	.answer-title {
		font-size: 1.25rem;
	}
	
	.question-description,
	.answer-description {
		font-size: 1rem;
	}
	
	.media-image {
		max-height: 200px;
	}
	
	.action-buttons {
		flex-direction: column;
	}
	
	.action-buttons .v-btn {
		width: 100%;
	}
}
</style>

