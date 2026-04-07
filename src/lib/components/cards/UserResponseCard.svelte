<script lang="ts">
	let { person }: { person: any } = $props();
</script>

<article class="UserResponseCard">
	<h4>Answered:</h4>
	<ul>
		<li>Diet: {person.diet.toLowerCase()}</li>
		<li>Allergies: {person.hasAllergies ? 'Yes' : 'No'}</li>
		<li>Music Choice: {person.musicSelection}</li>
	</ul>
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
