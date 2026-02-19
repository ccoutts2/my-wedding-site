<script lang="ts">
	import GridItem from '$lib/components/ui/GridItem.svelte';
	import { assetsConfig } from '$lib/config/assets';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	let title: HTMLHeadElement;
	let tl: GSAPTimeline;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.set(title, { top: '15%' });

		tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: container,
					start: 'top 10%',
					end: 'bottom top',
					scrub: 2
				}
			})
			.to(title, {
				top: '100%'
			});
	});
</script>

<main bind:this={container}>
	<section class="Gallery">
		<h2 bind:this={title}>aly x chris</h2>
		<div class="Grid">
			<GridItem
				src={assetsConfig[0].src}
				alt={assetsConfig[0].alt}
				width={assetsConfig[0].width}
				height={assetsConfig[0].height}
				col={2}
				span={4}
			/>
			<GridItem
				src={assetsConfig[1].src}
				alt={assetsConfig[1].alt}
				width={assetsConfig[1].width}
				height={assetsConfig[1].height}
				col={8}
				span={3}
			/>

			<GridItem
				src={assetsConfig[2].src}
				alt={assetsConfig[2].alt}
				width={assetsConfig[2].width}
				height={assetsConfig[2].height}
				col={9}
				span={4}
			/>
		</div>
	</section>
	<section class="Gallery">
		<div class="Grid">
			<GridItem
				src={assetsConfig[4].src}
				alt={assetsConfig[4].alt}
				width={assetsConfig[4].width}
				height={assetsConfig[4].height}
				col={1}
				span={5}
			/>
			<GridItem
				src={assetsConfig[5].src}
				alt={assetsConfig[5].alt}
				width={assetsConfig[5].width}
				height={assetsConfig[5].height}
				col={8}
				span={4}
			/>
			<GridItem
				src={assetsConfig[3].src}
				alt={assetsConfig[3].alt}
				width={assetsConfig[3].width}
				height={assetsConfig[3].height}
				col={8}
				span={5}
			/>
		</div>
	</section>
	<section class="Gallery">
		<div class="Grid">
			<GridItem
				src={assetsConfig[6].src}
				alt={assetsConfig[6].alt}
				width={assetsConfig[6].width}
				height={assetsConfig[6].height}
				col={1}
				span={3}
			/>
			<GridItem
				src={assetsConfig[7].src}
				alt={assetsConfig[7].alt}
				width={assetsConfig[7].width}
				height={assetsConfig[7].height}
				col={3}
				span={4}
			/>
			<GridItem
				src={assetsConfig[8].src}
				alt={assetsConfig[8].alt}
				width={assetsConfig[8].width}
				height={assetsConfig[8].height}
				col={6}
				span={8}
			/>
			<GridItem
				src={assetsConfig[9].src}
				alt={assetsConfig[9].alt}
				width={assetsConfig[9].width}
				height={assetsConfig[9].height}
				col={9}
				span={11}
			/>
		</div>
	</section>
</main>

<style lang="scss">
	.Gallery {
		height: 200vh;
		position: relative;

		h2 {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: clamp(1.15rem, 2.5vw, 3rem);
			text-transform: uppercase;
		}
	}
	.Grid {
		display: grid;
		margin-top: 5rem;
		grid-template-columns: repeat(12, 1fr);
		gap: 0.5rem;
		padding-inline: 1rem;
		width: 100%;
		height: 200vh;
	}
</style>
