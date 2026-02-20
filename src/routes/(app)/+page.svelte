<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
	import TextColumn from '$lib/components/TextColumn.svelte';
	import GridItem from '$lib/components/ui/GridItem.svelte';
	import { assetsConfig } from '$lib/config/assets';
	import { onMount } from 'svelte';
	import { getPreloaderState } from '$lib/contexts/preloader.state.svelte';
	import type { PageProps } from './$types';

	let hero: HTMLElement;
	const timelineState = getPreloaderState();

	let { data }: PageProps = $props();

	const user = data.user;

	onMount(() => {
		if (timelineState.isInitialLoad) {
			timelineState.tl
				.from(
					hero,
					{
						clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
						duration: 1,
						ease: 'power1.inOut'
					},
					'hero'
				)
				.from(hero, {
					scale: 0.5,
					transformOrigin: 'top center',
					duration: 1.2,
					ease: 'power4.inOut',
					onComplete: () => {
						window.sessionStorage.setItem('preloader', 'true');
					}
				});

			return () => {
				timelineState.tl?.kill();
			};
		}
	});
</script>

<svelte:head>
	<title>Aly and Chris | Wedding</title>
	<meta
		name="description"
		content="This is the home page which displays information about the wedding of Aly and Chris with links to other pages."
	/>
</svelte:head>

<main class="Home">
	<header class="Home__header">
		<h1>
			Aly and Chris would love <span class="italic">you</span> to join them on their special day
		</h1>
	</header>
	<div class="Home__hero">
		<figure class="Home__heroImgContainer" bind:this={hero}>
			<img
				src={assetsConfig[6].src}
				alt={assetsConfig[6].alt}
				width={assetsConfig[6].width}
				height={assetsConfig[6].height}
				fetchpriority="high"
			/>
		</figure>
	</div>
	<Section state="right-aligned">
		<Subtitle as="h2">When & Where</Subtitle>
		<TextColumn>
			<p>
				We can't wait to welcome you to The Hoxton, Edinburgh. Nestled within a row of beautifully
				restored Georgian townhouses, the celebrations will take place in the heart of the city's
				historic West End.
			</p>
			<p>
				Located just a short stroll from Haymarket Station and the iconic Edinburgh Castle, the
				hotel offers the perfect backdrop for our "I dos." Please join us on the The celebrations
				will begin on
				<strong><time datetime="2027-03-27T15:00">Saturday, March 27th, 2027</time></strong>
				at 3:00 PM to celebrate with us.
			</p>
			<div class="Grid">
				<GridItem
					src={assetsConfig[16].src}
					alt={assetsConfig[16].alt}
					width={assetsConfig[16].width}
					height={assetsConfig[16].height}
					col={5}
					span={12}
				/>
			</div>

			{#if user && user.RSVP}
				<p>Thanks for your response, {user.givenName}</p>
				<p>
					If you need to edit your response, please do so by clicking <a href="/rsvp/{user.id}/edit"
						>edit your RSVP</a
					>.
				</p>
			{:else}
				<p>Please <a href="/rsvp">RSVP</a>.</p>
			{/if}
		</TextColumn>
	</Section>
	<Section state="centered">
		<Subtitle as="h2">Travel and Stay</Subtitle>
		<TextColumn>
			<p>
				For anyone wishing to stay right in the heart of the action with us... The hotel is set
				across 11 beautiful Georgian townhouses and features a buzzing lobby, an Italian restaurant
				(Patatino), and even a small cinema.
			</p>
			<p>
				We have secured a 10% discount for our wedding guests staying at the hotel. If you'd like to
				stay at The Hoxton, please reach out to us directly. We will send over a unique discount
				code for you to use when booking your room on the hotel website.
			</p>
			<p>
				The Hoxton is located in Edinburgh's West End, making it incredibly easy to reach whether
				you are traveling by train, plane, or tram.
			</p>
			<p>
				The hotel is just a 3-minute walk from Haymarket Station. If you arrive at Edinburgh
				Waverley, it's a quick 5-minute hop on any westbound train or tram.
			</p>
			<p>
				The Haymarket Tram Stop is just around the corner, offering a direct 20-minute link from
				Edinburgh Airport.
			</p>
		</TextColumn>
	</Section>
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 0.5rem;
		width: 100%;
	}

	.Home {
		margin: 0 auto;
		padding-block: 1rem;

		&__header {
			align-items: center;
			display: flex;
			justify-content: center;
			padding-bottom: min(180rem, 15vh);
			padding-inline: 1rem;
			padding-top: min(450rem, 25vh);

			h1 {
				font-size: clamp(1.25rem, 2.5vw, 4rem);
			}
		}

		&__hero {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		&__heroImgContainer {
			aspect-ratio: 1.333333333333;
			position: relative;
			width: 100%;
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);

			@include breakpoints.laptop {
				width: 50vw;
			}
		}

		img {
			position: absolute;
			height: 100%;
			width: 100%;
			object-fit: cover;
			transform-origin: top center;
		}
	}
</style>
