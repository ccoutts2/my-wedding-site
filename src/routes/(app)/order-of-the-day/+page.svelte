<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
	import { GuestType } from '../../../generated/prisma/enums';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const isDayGuest = data.user?.type === GuestType.DAY;
</script>

<svelte:head>
	<title>Aly and Chris | Order Of The Day</title>
	<meta
		name="description"
		content="This page details the days of the wedding celebration and timings of events for each day."
	/>
</svelte:head>

<PageLayout title="Order of Events">
	<Section state="right-aligned">
		<h2>What to look forward to!</h2>
		<article class="Schedule">
			<Subtitle as="h3">Friday, 26th March</Subtitle>
			<div class="Schedule__information">
				<p>Get together at the The Hoxton lobby bar.</p>
				<p>Please check back for timings.</p>
			</div>
		</article>
		<article class="Schedule">
			<Subtitle as="h3">Saturday, 27th March</Subtitle>
			{#if isDayGuest}
				<section class="Schedule__information">
					<h3>Guest Arrival</h3>
					<p class="Schedule__time"><time datetime="13:30">1.30pm</time></p>
				</section>
				<section class="Schedule__information">
					<h3>We Do</h3>
					<p class="Schedule__time"><time datetime="14:00">2pm</time></p>
				</section>
				<section class="Schedule__information">
					<h3>We Drink</h3>
					<p class="Schedule__time"><time datetime="14:30">2.30pm</time></p>
				</section>
				<section class="Schedule__information">
					<h3>We Eat</h3>
					<p class="Schedule__time"><time datetime="17:00">5pm</time></p>
				</section>
			{/if}
			<section class="Schedule__information">
				<h3>We Party</h3>
				<p class="Schedule__time"><time datetime="20:00">8pm</time></p>
			</section>
			<section class="Schedule__information">
				<h3>Carriages</h3>
				<p class="Schedule__time"><time datetime="24:00">12am</time></p>
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
