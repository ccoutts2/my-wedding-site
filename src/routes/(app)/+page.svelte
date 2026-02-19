<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
	import TextColumn from '$lib/components/TextColumn.svelte';
	import GridItem from '$lib/components/ui/GridItem.svelte';
	import { assetsConfig } from '$lib/config/assets';
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
	<figure class="Home__hero">
		<img
			src={assetsConfig[27].src}
			alt={assetsConfig[27].alt}
			width={assetsConfig[27].width}
			height={assetsConfig[27].height}
			fetchpriority="high"
		/>
	</figure>
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
					src={assetsConfig[21].src}
					alt={assetsConfig[21].alt}
					width={assetsConfig[21].width}
					height={assetsConfig[21].height}
					col={1}
					span={5}
				/>
				<GridItem
					src={assetsConfig[24].src}
					alt={assetsConfig[24].alt}
					width={assetsConfig[24].width}
					height={assetsConfig[24].height}
					col={6}
					span={8}
				/>
			</div>

			<p>Please <a href="/rsvp">RSVP</a>.</p>
		</TextColumn>
	</Section>
	<Section state="centered">
		<Subtitle as="h2">Travel and Stay</Subtitle>
		<TextColumn>
			<p>
				We would love for you to stay right in the heart of the action with us. The hotel is set
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
			aspect-ratio: 1.333333333333;
			position: relative;
			width: 100%;

			img {
				position: absolute;
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
</style>
