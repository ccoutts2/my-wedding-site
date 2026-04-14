<script lang="ts">
	import '$lib/styles/globals.css';
	import { getContext, setContext } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { setPreloaderState } from '$lib/contexts/preloader.state.svelte.js';
	import { setToastState } from '$lib/contexts/toast-state.svelte.js';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import Toaster from '$lib/components/ui/toast/Toaster.svelte';
	import type { OverlayProps } from '$lib/types';

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
	setPreloaderState();

	let { children, data } = $props();

	const url = $derived(data.page);
	const adminUser = $derived(data.adminUser);

	$effect(() => {
		if (overlayState.isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<Preloader />
<Header {adminUser} {url} />

<div inert={overlayState.isMenuOpen}>
	{@render children?.()}

	<Footer {data} />
</div>
<Overlay {data} />
