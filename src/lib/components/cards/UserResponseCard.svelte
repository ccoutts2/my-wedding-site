<script lang="ts">
	let { person }: { person: any } = $props();
</script>

<article class="UserResponseCard">
	{#if person.isAccepted}
		<h4>Answered:</h4>
		<ul>
			<li>Diet: {person.diet ? person.diet.toLowerCase() : 'Not specified'}</li>
			<li>Allergies: {person.hasAllergies ? 'Yes' : 'No'}</li>
			<li>Music Choice: {person.musicSelection || 'Not specified'}</li>
		</ul>
	{:else}
		<p>Changed your mind?</p>
		<a href="/rsvp">RSVP</a>
	{/if}
</article>

<style lang="scss">
	.UserResponseCard {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		li {
			list-style: none;
			text-transform: capitalize;
			margin-block: 0.25rem;
		}
	}
</style>
