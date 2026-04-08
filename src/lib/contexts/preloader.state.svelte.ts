import { getContext, setContext } from 'svelte';
import gsap from 'gsap';

export class PreloaderState {
	tl = $state<gsap.core.Timeline | null>(null);
	isInitialLoad: boolean = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.isInitialLoad = !window.sessionStorage.getItem('preloader');
			this.tl = gsap.timeline();
		}
	}

	play() {
		this.tl?.play();
	}

	reverse() {
		this.tl?.reverse();
	}
}

const PRELOADER_KEY = Symbol('PRELOADER');

export function setPreloaderState() {
	return setContext(PRELOADER_KEY, new PreloaderState());
}

export function getPreloaderState() {
	return getContext<ReturnType<typeof setPreloaderState>>(PRELOADER_KEY);
}
