<script lang="ts">
	let { user }: { user: any } = $props();
</script>

{#if user.isAccepted}
	<article class="UserResponseCard">
		<p>Your responses:</p>
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
		gap: 0.5rem;

		li {
			list-style: none;
			text-transform: capitalize;
		}
	}
</style>
