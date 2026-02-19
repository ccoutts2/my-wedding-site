import { getContext, setContext } from 'svelte';
import gsap from 'gsap';

export class PreloaderState {
	tl = $state<GSAPTimeline>(gsap.timeline());
	isInitialLoad: boolean = $state(false);

	constructor() {
		if (typeof window !== 'undefined') {
			this.isInitialLoad = !window.sessionStorage.getItem('preloader');
		}
	}

	play() {
		this.tl.play();
	}

	reverse() {
		this.tl.reverse();
	}
}

const PRELOADER_KEY = Symbol('PRELOADER');

export function setPreloaderState() {
	return setContext(PRELOADER_KEY, new PreloaderState());
}

export function getPreloaderState() {
	return getContext<ReturnType<typeof setPreloaderState>>(PRELOADER_KEY);
}
