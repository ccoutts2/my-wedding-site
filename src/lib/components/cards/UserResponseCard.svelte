<script lang="ts">
	import { GuestType } from "../../../generated/prisma/enums";

	let { person, footer = false }: { person: any, footer?: boolean } = $props();
</script>

<article class="UserResponseCard">
	{#if person.isAccepted}
		<h4>Answered:</h4>
		<ul>
			{#if footer}
				<li>Coming: {person.isAccepted ? 'Yes' : 'No' }</li>
			{/if}
			{#if person.type === GuestType.DAY}
				<li>Diet: {person.diet ? person.diet.toLowerCase() : 'Not specified'}</li>
				<li>Allergies: {person.hasAllergies ? 'Yes' : 'No'}</li>
			{/if}
		</ul>
	{:else}
		<h4>Changed your mind?</h4>
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
