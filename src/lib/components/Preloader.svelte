<script lang="ts">
	import { getPreloaderState } from '$lib/contexts/preloader.state.svelte';
	import { onMount } from 'svelte';

	let preloaderContainer: HTMLDivElement;

	let counterValue = $state({ value: 0 });

	const timelineState = getPreloaderState();
	onMount(() => {
		if (timelineState.isInitialLoad && timelineState.tl) {
			timelineState.tl

				.to(counterValue, {
					value: 100,
					duration: 5,
					ease: 'power2.out'
				})
				.to(
					preloaderContainer,
					{
						clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
						duration: 1,
						ease: 'power2.inOut'
					},
					'+=0.75'
				)
				.add('header', '+=0.25');
		}

		return () => {
			timelineState.tl?.kill();
		};
	});

	let preloaderPlayed: string | null = $state(null);

	$effect(() => {
		if (typeof window !== 'undefined') {
			preloaderPlayed = window.sessionStorage.getItem('preloader');
		}
	});
</script>

<div class="Preloader {preloaderPlayed ? 'hide' : ''}" bind:this={preloaderContainer}>
	<span class="visually-hidden">Pre loader container.</span>

	<span class="Preloader__counter">{Math.floor(counterValue.value)}</span>
</div>

<style lang="scss">
	.Preloader {
		background-color: #181818;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		color: #fff;
		height: 100vh;
		opacity: 1;
		position: absolute;
		visibility: visible;
		width: 100%;
		will-change: clip-path;
		z-index: 99;

		&.hide {
			opacity: 0;
			visibility: hidden;
			display: none;
		}

		&__counter {
			position: absolute;
			bottom: 2rem;
			right: 2rem;
			font-size: 3rem;
		}
	}
</style>
