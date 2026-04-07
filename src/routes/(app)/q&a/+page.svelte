<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Subtitle from '$lib/components/Subtitle.svelte';
</script>

<PageLayout title="Q & A">
	<section class="QandAContainer">
		<Subtitle as="h2">When is the deadline to RSVP</Subtitle>
		<p>Please RSVP by 27th November</p>
	</section>
	<section class="QandAContainer">
		<Subtitle as="h2">Are kids welcome?</Subtitle>
		<p>
			As much as we would love to include your little ones, we unfortunately are only able to
			accommodate nursing babies. Please reach out to us if this would apply to you :)
		</p>
	</section>
	<section class="QandAContainer">
		<Subtitle as="h2">Where should I park?</Subtitle>
		<p>
			Parking is a nuisance around Edinburgh and unfortunately not free. The Hoxton recommends
			parking at Q-Park on W Approach Rd, which is about 10 mins walk away from the hotel.
		</p>
	</section>
	<section class="QandAContainer">
		<Subtitle as="h2">What should I wear?</Subtitle>
		<p>Please see our Schedule for the dress code!</p>
	</section>
	<section class="QandAContainer">
		<Subtitle as="h2"
			>Is it okay to take pictures with our phones and cameras during the wedding?</Subtitle
		>
		<p>
			Yes! We would love for you to take photos and share them with us! However, we would kindly
			request that you refrain from taking photos during the ceremony.
		</p>
	</section>
</PageLayout>

<style lang="scss">
	.QandAContainer {
		display: flex;
		flex-direction: column;
		margin-block: 1rem;

		h2 {
			margin-bottom: 1rem;
		}

		p {
			color: black;
		}
	}
</style>
