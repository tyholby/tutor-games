import type { Unit, Game, FlashCard } from '@/types'
// Import all flashcard categories
import { geographicTerms } from './flashcards/geographic-terms'
import { us_state_flags } from './flashcards/us-state-flags'
import { us_state_locations_nicknames } from './flashcards/us-state-locations-nicknames'
import { us_landmarks_regions } from './flashcards/us-landmarks-regions'
import { us_state_capitals } from './flashcards/us-state-capitals'

// World country flags by continent
import { world_country_flags_north_america } from './flashcards/world-country-flags-north-america'
import { world_country_flags_south_america } from './flashcards/world-country-flags-south-america'
import { world_country_flags_europe } from './flashcards/world-country-flags-europe'
import { world_country_flags_asia } from './flashcards/world-country-flags-asia'
import { world_country_flags_africa } from './flashcards/world-country-flags-africa'
import { world_country_flags_australia_oceania } from './flashcards/world-country-flags-australia-oceania'

// World country locations & languages by continent
import { world_country_locations_languages_north_america } from './flashcards/world-country-locations-languages-north-america'
import { world_country_locations_languages_south_america } from './flashcards/world-country-locations-languages-south-america'
import { world_country_locations_languages_europe } from './flashcards/world-country-locations-languages-europe'
import { world_country_locations_languages_asia } from './flashcards/world-country-locations-languages-asia'
import { world_country_locations_languages_africa } from './flashcards/world-country-locations-languages-africa'
import { world_country_locations_languages_australia_oceania } from './flashcards/world-country-locations-languages-australia-oceania'

// World cities & landmarks by continent
import { world_cities_landmarks_north_america } from './flashcards/world-cities-landmarks-north-america'
import { world_cities_landmarks_south_america } from './flashcards/world-cities-landmarks-south-america'
import { world_cities_landmarks_europe } from './flashcards/world-cities-landmarks-europe'
import { world_cities_landmarks_asia } from './flashcards/world-cities-landmarks-asia'
import { world_cities_landmarks_africa } from './flashcards/world-cities-landmarks-africa'
import { world_cities_landmarks_australia_oceania } from './flashcards/world-cities-landmarks-australia-oceania'

// World country capitals by continent
import { world_country_capitals_north_america } from './flashcards/world-country-capitals-north-america'
import { world_country_capitals_south_america } from './flashcards/world-country-capitals-south-america'
import { world_country_capitals_europe } from './flashcards/world-country-capitals-europe'
import { world_country_capitals_asia } from './flashcards/world-country-capitals-asia'
import { world_country_capitals_africa } from './flashcards/world-country-capitals-africa'
import { world_country_capitals_australia_oceania } from './flashcards/world-country-capitals-australia-oceania'

export const GAME_KEYS = {
	AI_TUTOR: 'ai-tutor',
	MEMORY_CARD_GAME: 'memory-card-game',
	BOWL_PRACTICE: 'bowl-practice',
	FLASH_CARDS: 'flash-cards',
}

export const games: Game[] = [
	// {
	// 	key: GAME_KEYS.AI_TUTOR,
	// 	title: 'AI Tutor',
	// 	description: 'Get hints from an AI tutor as you study the material',
	// 	icon: 'mdi-school',
	// 	isMultipleUnits: false,
	// },
	// {
	// 	key: GAME_KEYS.MEMORY_CARD_GAME,
	// 	title: 'Memory Card Game',
	// 	description: 'Match capitals, features, definitions, etc. in this fun memory challenge',
	// 	icon: 'mdi-head-snowflake',
	// 	isMultipleUnits: false,
	// },
	// {
	// 	key: GAME_KEYS.BOWL_PRACTICE,
	// 	title: 'Knowledge Bowl Practice',
	// 	description: 'Simulate a knowledge bowl, and practice topics that may come up in competitions',
	// 	icon: 'mdi-trophy',
	// 	isMultipleUnits: true,
	// },
	{
		key: GAME_KEYS.FLASH_CARDS,
		title: 'Study Guide Flash Cards',
		description: 'Study geography terms, flags, map study, and landmarks with interactive flash cards',
		icon: 'mdi-cards',
		isMultipleUnits: true,
	},
]

export const units: Unit[] = [
	// {
	// 	key: 'geography-terms',
	// 	label: 'Geography Terms',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	// {
	// 	key: 'the-globe',
	// 	label: 'The Globe',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	// {
	// 	key: 'canada',
	// 	label: 'Canada',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	// {
	// 	key: 'canada-features',
	// 	label: 'Canada Features',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	// {
	// 	key: 'usa',
	// 	label: 'USA',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	// {
	// 	key: 'usa-features',
	// 	label: 'USA Features',
	// 	gameKeys: [
	// 		GAME_KEYS.BOWL_PRACTICE,
	// 	],
	// },
	{
		key: 'flash-cards-geographic-terms',
		label: 'Geographic Terms',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'General',
	},
	{
		key: 'flash-cards-us-state-flags',
		label: 'US State Flags',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'United States',
	},
	{
		key: 'flash-cards-us-state-locations-nicknames',
		label: 'US State Map Study & Nicknames',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'United States',
	},
	{
		key: 'flash-cards-us-landmarks-regions',
		label: 'US Landmarks & Regions',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'United States',
	},
	{
		key: 'flash-cards-us-state-capitals',
		label: 'US State Capitals',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'United States',
	},
	// World Country Flags by Continent
	{
		key: 'flash-cards-world-country-flags-north-america',
		label: 'World Country Flags - North America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	{
		key: 'flash-cards-world-country-flags-south-america',
		label: 'World Country Flags - South America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	{
		key: 'flash-cards-world-country-flags-europe',
		label: 'World Country Flags - Europe',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	{
		key: 'flash-cards-world-country-flags-asia',
		label: 'World Country Flags - Asia',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	{
		key: 'flash-cards-world-country-flags-africa',
		label: 'World Country Flags - Africa',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	{
		key: 'flash-cards-world-country-flags-australia-oceania',
		label: 'World Country Flags - Australia (Oceania)',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Flags',
	},
	// World Country Map Study & Languages by Continent
	{
		key: 'flash-cards-world-country-locations-languages-north-america',
		label: 'World Country Map Study & Languages - North America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	{
		key: 'flash-cards-world-country-locations-languages-south-america',
		label: 'World Country Map Study & Languages - South America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	{
		key: 'flash-cards-world-country-locations-languages-europe',
		label: 'World Country Map Study & Languages - Europe',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	{
		key: 'flash-cards-world-country-locations-languages-asia',
		label: 'World Country Map Study & Languages - Asia',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	{
		key: 'flash-cards-world-country-locations-languages-africa',
		label: 'World Country Map Study & Languages - Africa',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	{
		key: 'flash-cards-world-country-locations-languages-australia-oceania',
		label: 'World Country Map Study & Languages - Australia (Oceania)',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Map Study & Languages',
	},
	// World Cities & Landmarks by Continent
	{
		key: 'flash-cards-world-cities-landmarks-north-america',
		label: 'World Cities & Landmarks - North America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	{
		key: 'flash-cards-world-cities-landmarks-south-america',
		label: 'World Cities & Landmarks - South America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	{
		key: 'flash-cards-world-cities-landmarks-europe',
		label: 'World Cities & Landmarks - Europe',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	{
		key: 'flash-cards-world-cities-landmarks-asia',
		label: 'World Cities & Landmarks - Asia',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	{
		key: 'flash-cards-world-cities-landmarks-africa',
		label: 'World Cities & Landmarks - Africa',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	{
		key: 'flash-cards-world-cities-landmarks-australia-oceania',
		label: 'World Cities & Landmarks - Australia (Oceania)',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		comingSoon: true,
		header: 'World Cities & Landmarks',
	},
	// World Country Capitals by Continent
	{
		key: 'flash-cards-world-country-capitals-north-america',
		label: 'World Country Capitals - North America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
	{
		key: 'flash-cards-world-country-capitals-south-america',
		label: 'World Country Capitals - South America',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
	{
		key: 'flash-cards-world-country-capitals-europe',
		label: 'World Country Capitals - Europe',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
	{
		key: 'flash-cards-world-country-capitals-asia',
		label: 'World Country Capitals - Asia',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
	{
		key: 'flash-cards-world-country-capitals-africa',
		label: 'World Country Capitals - Africa',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
	{
		key: 'flash-cards-world-country-capitals-australia-oceania',
		label: 'World Country Capitals - Australia (Oceania)',
		gameKeys: [GAME_KEYS.FLASH_CARDS],
		header: 'World Country Capitals',
	},
]

// Helper mapping for country names to ISO codes (for world flags)
const countryNameToIso: Record<string, string> = {
	Afghanistan: 'af',
	Albania: 'al',
	Algeria: 'dz',
	Angola: 'ao',
	Argentina: 'ar',
	Armenia: 'am',
	Australia: 'au',
	Austria: 'at',
	Bangladesh: 'bd',
	Belgium: 'be',
	Belize: 'bz',
	Bolivia: 'bo',
	'Bosnia and Herzegovina': 'ba',
	Botswana: 'bw',
	Brazil: 'br',
	Bulgaria: 'bg',
	Burma: 'mm',
	Burundi: 'bi',
	Cambodia: 'kh',
	Canada: 'ca',
	'Central African Republic': 'cf',
	Chad: 'td',
	Chile: 'cl',
	China: 'cn',
	Colombia: 'co',
	'Costa Rica': 'cr',
	Croatia: 'hr',
	Cuba: 'cu',
	'Czech Republic': 'cz',
	'Democratic Republic of the Congo': 'cd',
	Denmark: 'dk',
	'Dominican Republic': 'do',
	Ecuador: 'ec',
	Egypt: 'eg',
	'El Salvador': 'sv',
	Estonia: 'ee',
	Ethiopia: 'et',
	Fiji: 'fj',
	Finland: 'fi',
	France: 'fr',
	Georgia: 'ge',
	Germany: 'de',
	Ghana: 'gh',
	Greece: 'gr',
	Grenada: 'gd',
	Guatemala: 'gt',
	Guinea: 'gn',
	Guyana: 'gy',
	Haiti: 'ht',
	Honduras: 'hn',
	Hungary: 'hu',
	Iceland: 'is',
	India: 'in',
	Indonesia: 'id',
	Iran: 'ir',
	Iraq: 'iq',
	Ireland: 'ie',
	Israel: 'il',
	Italy: 'it',
	Jamaica: 'jm',
	Japan: 'jp',
	Jordan: 'jo',
	Kenya: 'ke',
	Kuwait: 'kw',
	Kyrgyzstan: 'kg',
	Laos: 'la',
	Latvia: 'lv',
	Lebanon: 'lb',
	Liberia: 'lr',
	Libya: 'ly',
	Liechtenstein: 'li',
	Lithuania: 'lt',
	Luxembourg: 'lu',
	Macedonia: 'mk',
	Madagascar: 'mg',
	Malaysia: 'my',
	Mali: 'ml',
	Malta: 'mt',
	Mexico: 'mx',
	Moldova: 'md',
	Monaco: 'mc',
	Mongolia: 'mn',
	Montenegro: 'me',
	Morocco: 'ma',
	Mozambique: 'mz',
	Myanmar: 'mm',
	Nepal: 'np',
	Netherlands: 'nl',
	'New Zealand': 'nz',
	Nicaragua: 'ni',
	Niger: 'ne',
	Nigeria: 'ng',
	'North Korea': 'kp',
	Norway: 'no',
	Oman: 'om',
	Pakistan: 'pk',
	Palestine: 'ps',
	Panama: 'pa',
	'Papua New Guinea': 'pg',
	Paraguay: 'py',
	Peru: 'pe',
	Philippines: 'ph',
	Poland: 'pl',
	Portugal: 'pt',
	Qatar: 'qa',
	'Republic of the Congo': 'cg',
	Romania: 'ro',
	Russia: 'ru',
	Rwanda: 'rw',
	Samoa: 'ws',
	'Saudi Arabia': 'sa',
	Serbia: 'rs',
	Singapore: 'sg',
	Slovakia: 'sk',
	Slovenia: 'si',
	Somalia: 'so',
	'South Africa': 'za',
	'South Korea': 'kr',
	Spain: 'es',
	'Sri Lanka': 'lk',
	Sudan: 'sd',
	Suriname: 'sr',
	Swaziland: 'sz',
	Sweden: 'se',
	Switzerland: 'ch',
	Syria: 'sy',
	Tajikistan: 'tj',
	Tanzania: 'tz',
	Thailand: 'th',
	Tonga: 'to',
	'Trinidad and Tobago': 'tt',
	Tunisia: 'tn',
	Turkey: 'tr',
	Turkmenistan: 'tm',
	Uganda: 'ug',
	Ukraine: 'ua',
	'United Arab Emirates': 'ae',
	'United Kingdom': 'gb',
	'United States': 'us',
	Uruguay: 'uy',
	Uzbekistan: 'uz',
	Vanuatu: 'vu',
	'Vatican City': 'va',
	Venezuela: 've',
	Vietnam: 'vn',
	Yemen: 'ye',
	Zambia: 'zm',
	Zimbabwe: 'zw',
}

// Concatenate all flashcards
export const studyGuideFlashCards: FlashCard[] = [
	...geographicTerms,
	...us_state_flags,
	...us_state_locations_nicknames,
	...us_landmarks_regions,
	...us_state_capitals,
	// World country flags by continent
	...world_country_flags_north_america,
	...world_country_flags_south_america,
	...world_country_flags_europe,
	...world_country_flags_asia,
	...world_country_flags_africa,
	...world_country_flags_australia_oceania,
	// World country Map Study & languages by continent
	...world_country_locations_languages_north_america,
	...world_country_locations_languages_south_america,
	...world_country_locations_languages_europe,
	...world_country_locations_languages_asia,
	...world_country_locations_languages_africa,
	...world_country_locations_languages_australia_oceania,
	// World cities & landmarks by continent
	...world_cities_landmarks_north_america,
	...world_cities_landmarks_south_america,
	...world_cities_landmarks_europe,
	...world_cities_landmarks_asia,
	...world_cities_landmarks_africa,
	...world_cities_landmarks_australia_oceania,
	// World country capitals by continent
	...world_country_capitals_north_america,
	...world_country_capitals_south_america,
	...world_country_capitals_europe,
	...world_country_capitals_asia,
	...world_country_capitals_africa,
	...world_country_capitals_australia_oceania,
]

export const FLASH_CARDS_UNIT_KEY_PREFIX = 'flash-cards-'

export function getFlashCardCategoryForUnitKey(unitKey: string): string | null {
	if (!unitKey.startsWith(FLASH_CARDS_UNIT_KEY_PREFIX)) return null
	return unitKey.slice(FLASH_CARDS_UNIT_KEY_PREFIX.length) || null
}

export function getFlashCardsForUnitKey(unitKey: string): FlashCard[] {
	const category = getFlashCardCategoryForUnitKey(unitKey)
	if (!category) return []
	return studyGuideFlashCards.filter(card => card.category === category)
}

export function getFlashCardsForUnitKeys(unitKeys: string[]): FlashCard[] {
	const categories = new Set(
		(unitKeys || [])
			.map(getFlashCardCategoryForUnitKey)
			.filter((c): c is string => !!c),
	)

	if (categories.size === 0) return []
	return studyGuideFlashCards.filter(card => categories.has(card.category))
}
