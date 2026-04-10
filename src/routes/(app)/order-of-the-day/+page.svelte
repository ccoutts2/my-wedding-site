<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
</script>

<svelte:head>
	<title>Aly and Chris | Order Of The Day</title>
	<meta
		name="description"
		content="This page details the days of the wedding celebration and timings of events for each day."
	/>
</svelte:head>

<PageLayout title="Order of the Day">
	<Section state="right-aligned">
		<h2>What to look forward to!</h2>
		<article class="Schedule">
			<Subtitle as="h3">Friday</Subtitle>
			<div class="Schedule__information">
				<p>
					We have organised an evening for people to get together the night before the aye do's.
					Please come along to Indigo Yard and join us for food and drinks.
				</p>
				<dl>
					<dt>When</dt>
					<dd><time datetime="2027-03-07">26th March</time></dd>
					<dt>Time</dt>
					<dd><time datetime="18:00">6pm</time></dd>
				</dl>
			</div>
		</article>
		<article class="Schedule">
			<Subtitle as="h3">Saturday</Subtitle>
			<section class="Schedule__information">
				<h3>Guest Arrival</h3>
				<p class="Schedule__time"><time datetime="12:30">12.30pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Ceremony</h3>
				<p class="Schedule__time"><time datetime="13:00">1pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Reception and Canapés</h3>
				<p class="Schedule__time"><time datetime="13:00">1.45pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Call to Dinner and Speeches</h3>
				<p class="Schedule__time"><time datetime="16:00">4pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Dinner Service</h3>
				<p class="Schedule__time"><time datetime="16:45">4.45pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Evening Guest Arrival</h3>
				<p class="Schedule__time"><time datetime="19:00">7pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Dancing!</h3>
				<p class="Schedule__time"><time datetime="19:00">7.15pm</time></p>
			</section>
		</article>
	</Section>
</PageLayout>

<style lang="scss">
	.Schedule {
		display: flex;
		flex-direction: column;
		padding-block: 1rem;

		&__information {
			padding-top: 1rem;

			h3 {
				font-style: italic;
				font-weight: 500;
				font-size: 1.5rem;
			}
		}

		&__time {
			font-size: 1.25rem;
			padding-block: 1rem;
			position: relative;

			&::after {
				content: '';
				bottom: 0.5rem;
				left: 0;
				background-color: black;
				height: 1px;
				position: absolute;
				width: 100%;
			}
		}
	}
</style>
