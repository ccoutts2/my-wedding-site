<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/navigation/Header.svelte';
	import { setContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';
	import Overlay from '$lib/components/Overlay.svelte';

	let { children, data } = $props();

	const overlayState = $state<OverlayProps>({
		isMenuOpen: false
	});

	setContext('overlay-ctx', overlayState);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header {data} />
{@render children?.()}

<Overlay />
