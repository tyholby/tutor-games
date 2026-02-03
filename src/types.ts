export interface Unit {
	key: string
	label: string
	gameKeys: string[]
	comingSoon?: boolean
	header?: string
}

export interface Game {
	key: string
	title: string
	description: string
	icon: string
	isMultipleUnits: boolean
}

export interface CensorBlock {
	top: string // CSS percentage or pixel value
	left: string // CSS percentage or pixel value
	width: string // CSS percentage or pixel value
	height: string // CSS percentage or pixel value
}

export interface FlashCard {
	questionTitleHtml: string
	questionDescriptionHtml: string | null
	answerTitleHtml: string
	answerDescriptionHtml: string | null
	pathToMedia: string | null // Media always on question side only
	category: string
	censorBlocks?: CensorBlock[] // Optional overlay blocks to hide text on flags
}

