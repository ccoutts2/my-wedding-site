<script lang="ts">
	import { assetsConfig } from '$lib/config/assets';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import GridItem from '$lib/components/ui/GridItem.svelte';
	import gsap from 'gsap';

	let container: HTMLElement;
	let title: HTMLHeadElement;
	let tl: GSAPTimeline;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.set(title, { top: '20%' });

		tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: container,
					start: 'top 10%',
					end: 'bottom top',
					scrub: 4
				}
			})
			.to(title, {
				top: '65%'
			});

		return () => {
			tl.kill();
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	});
</script>

<svelte:head>
	<title>Aly and Chris | Gallery</title>
	<meta
		name="description"
		content="This is the pictures page displaying information a collection of pictures of Aly and Chris."
	/>
</svelte:head>

<main class="Gallery" bind:this={container}>
	<h1>Our Gallery</h1>
	<section class="Gallery__images">
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
				src={assetsConfig[12].src}
				alt={assetsConfig[12].alt}
				width={assetsConfig[12].width}
				height={assetsConfig[12].height}
				col={7}
				span={5}
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
				src={assetsConfig[21].src}
				alt={assetsConfig[21].alt}
				width={assetsConfig[21].width}
				height={assetsConfig[21].height}
				col={8}
				span={5}
			/>
		</div>
		<div class="Grid">
			<GridItem
				src={assetsConfig[10].src}
				alt={assetsConfig[10].alt}
				width={assetsConfig[10].width}
				height={assetsConfig[10].height}
				col={10}
				span={3}
			/>
			<GridItem
				src={assetsConfig[20].src}
				alt={assetsConfig[20].alt}
				width={assetsConfig[20].width}
				height={assetsConfig[20].height}
				col={3}
				span={4}
			/>
			<GridItem
				src={assetsConfig[8].src}
				alt={assetsConfig[8].alt}
				width={assetsConfig[8].width}
				height={assetsConfig[8].height}
				col={6}
				span={4}
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
		<div class="Grid">
			<GridItem
				src={assetsConfig[13].src}
				alt={assetsConfig[13].alt}
				width={assetsConfig[13].width}
				height={assetsConfig[13].height}
				col={1}
				span={5}
			/>
			<GridItem
				src={assetsConfig[14].src}
				alt={assetsConfig[14].alt}
				width={assetsConfig[14].width}
				height={assetsConfig[14].height}
				col={9}
				span={3}
			/>
			<GridItem
				src={assetsConfig[15].src}
				alt={assetsConfig[15].alt}
				width={assetsConfig[15].width}
				height={assetsConfig[15].height}
				col={2}
				span={4}
			/>
			<GridItem
				src={assetsConfig[19].src}
				alt={assetsConfig[19].alt}
				width={assetsConfig[19].width}
				height={assetsConfig[19].height}
				col={9}
				span={11}
			/>
		</div>
		<div class="Grid">
			<GridItem
				src={assetsConfig[22].src}
				alt={assetsConfig[22].alt}
				width={assetsConfig[22].width}
				height={assetsConfig[22].height}
				col={1}
				span={5}
			/>
			<GridItem
				src={assetsConfig[23].src}
				alt={assetsConfig[23].alt}
				width={assetsConfig[23].width}
				height={assetsConfig[23].height}
				col={8}
				span={4}
			/>
			<GridItem
				src={assetsConfig[25].src}
				alt={assetsConfig[25].alt}
				width={assetsConfig[25].width}
				height={assetsConfig[25].height}
				col={1}
				span={4}
			/>
			<GridItem
				src={assetsConfig[28].src}
				alt={assetsConfig[28].alt}
				width={assetsConfig[28].width}
				height={assetsConfig[28].height}
				col={9}
				span={11}
			/>
			<GridItem
				src={assetsConfig[29].src}
				alt={assetsConfig[29].alt}
				width={assetsConfig[29].width}
				height={assetsConfig[29].height}
				col={2}
				span={4}
			/>
		</div>
	</section>
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Gallery {
		position: relative;

		h1 {
			padding-left: 1rem;
		}

		&__images {
			h2 {
				display: none;

				@include breakpoints.tablet {
					display: block;
					font-size: clamp(1.15rem, 2.5vw, 3rem);
					left: 50%;
					position: fixed;
					text-transform: uppercase;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
		.Grid {
			display: grid;
			margin-top: 5rem;
			grid-template-columns: repeat(12, 1fr);
			gap: 0.5rem;
			padding: 1rem 1rem 3rem;
			width: 100%;
		}
	}
</style>
