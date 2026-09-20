<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
	import TextColumn from '$lib/components/TextColumn.svelte';
	import GridItem from '$lib/components/ui/GridItem.svelte';
	import { assetsConfig } from '$lib/config/assets';
	import { onMount } from 'svelte';
	import { getPreloaderState } from '$lib/contexts/preloader.state.svelte';
	import type { PageProps } from './$types';
	import { formatDistanceToNowStrict } from 'date-fns';
	import { GuestType } from '@prisma/client';

	let hero: HTMLElement;
	const timelineState = getPreloaderState();

	let { data }: PageProps = $props();

	const user = data.user;

	onMount(() => {
		if (timelineState.isInitialLoad && timelineState.tl) {
			hero.style.willChange = 'transform, clip-path';
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
						hero.style.willChange = 'auto';
						document.body.style.overflow = 'auto';
						document.body.style.height = '';
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
		<span class="Home__date"
			>{formatDistanceToNowStrict(new Date(2027, 2, 27), {
				unit: 'day',
				roundingMethod: 'ceil'
			})} to go</span
		>
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
			{#if !user || user.type === GuestType.DAY}
				<p>
					We can't wait to welcome you to our favourite city, Edinburgh. The ceremony, dinner and
					evening party will all take place at the Hoxton Hotel on <strong
						><time datetime="2027-03-27T15:00">Saturday March 27th 2027</time></strong
					>.
				</p>
			{:else}
				<p>
					We can't wait to celebrate our wedding party with you from
					<strong>7.30pm <time datetime="2027-03-27T19:30">Saturday March 27th 2027</time></strong> at the Hoxton Hotel.
				</p>
			{/if}
			<p>
				If you wish, please join us in the hotel lobby bar on Friday 26th March for a little evening
				get together (nothing wild!). Please check back for timings.
			</p>

			<p>
				5-21 Grosvenor St <br />
				Edinburgh <br />
				EH12 5EF
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
				The Hoxton is in the city’s West End, a 3 minute walk from Haymarket train station or a 5
				minute train/tram Westbound from Edinburgh Waverley. The Haymarket tram stop around the
				corner offers a 25 minute direct tram to Edinburgh airport main terminal.
			</p>
			<p>
				For anyone wishing to stay right in the heart of the action with us, the hotel features
				comfortable and stylish rooms (some a little cosy!), bar and lobby, Italian restaurant, and
				even a small cinema!
			</p>
			<p>
				It is in the city centre and being a restored listed building, some may find that they would
				like more space and peace and wish to stay elsewhere. Edinburgh is not short on
				accommodation, however our wedding falls on Easter bank holiday so we recommend booking
				soon.
			</p>
		</TextColumn>
	</Section>
	<Section state="left-aligned">
		<Subtitle as="h2">Registry</Subtitle>
		<TextColumn>
			<p>Aly says your presence is the greatest gift...</p>
			<p>But if you'd like to contribute towards our honeymoon, we'd be super grateful!</p>
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
			flex-direction: column;
			justify-content: center;
			padding-bottom: min(180rem, 15vh);
			padding-inline: 1rem;
			padding-top: min(450rem, 25vh);

			h1 {
				font-size: clamp(1.25rem, 2.5vw, 4rem);
			}
		}

		&__date {
			font-size: clamp(1.125rem, 2.5vw, 1.5rem);
			padding-top: 2rem;
		}

		&__hero {
			align-items: center;
			display: flex;
			justify-content: center;
			width: 100%;
		}

		&__heroImgContainer {
			aspect-ratio: 1.333333333333;
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
			position: relative;
			width: 100%;

			@include breakpoints.laptop {
				width: 50vw;
			}
		}

		img {
			height: 100%;
			object-fit: cover;
			position: absolute;
			transform-origin: top center;
			width: 100%;
		}
	}
</style>
