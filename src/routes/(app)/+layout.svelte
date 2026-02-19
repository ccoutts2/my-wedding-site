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
	import Preloader from '$lib/components/Preloader.svelte';

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
<Preloader />
<Header {data} {url} />

{@render children?.()}
<Overlay />
