<script lang="ts">
	let { user }: { user: any } = $props();
</script>

{#if user.isAccepted}
	<article class="UserResponseCard">
		<h4>Your responses:</h4>
		<ul>
			<li>Diet: {user.diet.toLowerCase() ?? 'Not specified'}</li>
			<li>Allergies: {user.hasAllergies ? 'Yes' : 'No'}</li>
			<li>Music Choice: {user.musicSelection ?? 'Not specified'}</li>
		</ul>
	</article>
{:else}
	<p>Not too late to <a href="/rsvp">change your mind</a>.</p>
{/if}

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
