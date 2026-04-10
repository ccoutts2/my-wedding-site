<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Section from '$lib/components/Section.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
</script>

<svelte:head>
	<title>Aly and Chris | Q &amp; A</title>
	<meta
		name="description"
		content="Find answers to questions about Aly and Chris's wedding celebration."
	/>
</svelte:head>

<PageLayout title="Q & A" pageLayout="centered">
	<Section state="centered">
		<div class="QandAContainer">
			<Subtitle as="h2">When is the deadline to RSVP</Subtitle>
			<p>Please RSVP by 27th November</p>
		</div>
		<div class="QandAContainer">
			<Subtitle as="h2">Are kids welcome?</Subtitle>
			<p>
				As much as we would love to include your little ones, we unfortunately are only able to
				accommodate nursing babies. Please reach out to us if this would apply to you :)
			</p>
		</div>
		<div class="QandAContainer">
			<Subtitle as="h2">Where should I park?</Subtitle>
			<p>
				Parking is a nuisance around Edinburgh and unfortunately not free. The Hoxton recommends
				parking at Q-Park on W Approach Rd, which is about 10 mins walk away from the hotel.
			</p>
		</div>
		<div class="QandAContainer">
			<Subtitle as="h2">What should I wear?</Subtitle>
			<p>Please see our Schedule for the dress code!</p>
		</div>
		<div class="QandAContainer">
			<Subtitle as="h2">Can we take pictures/videos during the wedding?</Subtitle>
			<p>
				Yes! We would love for you to take photos and share them with us! However, we would kindly
				request that you refrain from taking photos during the ceremony.
			</p>
		</div>
	</Section>
</PageLayout>

<style lang="scss">
	.QandAContainer {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;

		p {
			color: black;
		}
	}
</style>
