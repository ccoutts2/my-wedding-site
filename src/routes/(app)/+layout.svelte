<script lang="ts">
	import '$lib/styles/globals.css';
	import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/navigation/Header.svelte';
	import { setContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';
	import Overlay from '$lib/components/Overlay.svelte';
	import { page } from '$app/state';

	import Toaster from '$lib/components/ui/toast/Toaster.svelte';
	import { setToastState } from '$lib/contexts/toast-state.svelte.js';

	onNavigate((navigation) => {
		if (document.startViewTransition && navigation.from?.route.id !== navigation.to?.route.id) {
			return new Promise((resolve) => {
				document.startViewTransition &&
					document.startViewTransition(async () => {
						resolve();
						await navigation.complete;
					});
			});
		}
	});

	const overlayState = $state<OverlayProps>({
		isMenuOpen: false
	});

	setContext('overlay-ctx', overlayState);
	setToastState();

	let { children, data } = $props();

	const url = $derived(page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<Header {data} {url} />
{@render children?.()}
<Overlay />

<style>
	@keyframes move-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}

		to {
			opacity: 0.4;
			transform: translateY(-35%);
		}
	}

	@keyframes move-in {
		from {
			clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
		}

		to {
			clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
		}
	}

	::view-transition-old(root) {
		animation: 1s cubic-bezier(0.87, 0, 0.13, 1) both move-out;
	}

	::view-transition-new(root) {
		animation: 1s cubic-bezier(0.87, 0, 0.13, 1) both move-in;
	}
</style>
