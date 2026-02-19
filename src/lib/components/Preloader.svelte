<script lang="ts">
	import { setPreloaderState } from '$lib/contexts/preloader.state.svelte';
	import { onMount } from 'svelte';

	let preloaderContainer: HTMLDivElement;

	const timelineState = setPreloaderState();
	onMount(() => {
		timelineState.tl.to(preloaderContainer, {
			top: '-100vh',
			duration: 1,
			delay: 3,
			ease: 'power2.inOut'
		});
	});

	let preloaderPlayed: string | null = $state(null);

	$effect(() => {
		if (typeof window !== 'undefined') {
			preloaderPlayed = window.sessionStorage.getItem('preloader');
		}
	});
</script>

<div class="Preloader {preloaderPlayed ? 'hide' : ''}" bind:this={preloaderContainer}></div>

<style lang="scss">
	.Preloader {
		padding: 30px;
		background-color: #181818;
		color: #fff;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		opacity: 1;
		visibility: visible;

		&.hide {
			opacity: 0;
			visibility: hidden;
			display: none;
		}
	}
</style>
