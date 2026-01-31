<script lang="ts">
	let { searchTerm, handleInput } = $props();
</script>

<search class="Field">
	<form data-sveltekit-keepfocus data-sveltekit-noscroll>
		<label class="Field__label" for="q">
			Search for guests
			<input
				class="Field__input"
				type="search"
				name="q"
				id="q"
				bind:value={searchTerm}
				oninput={handleInput}
			/>
		</label>
	</form>
</search>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Field {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-block: 0.5rem;
		position: relative;
		width: 100%;

		&__label {
			color: grey;
			font-size: 0.825rem;
			text-transform: capitalize;
			width: 100%;
		}

		&__input {
			background-color: variables.$color--default--input--background;
			border: 1px solid variables.$color--input--border;
			border-radius: 0.25rem;
			color: variables.$color--foreground;
			flex-shrink: 1;
			font-size: Max(16px, 1em);
			margin-top: 0.25rem;
			padding: 0.5rem;
			transition: 180ms box-shadow ease-in-out;
			width: 100%;

			&:focus {
				border-color: variables.$color--input--border-focus;
				box-shadow: 0 0 0 2px rgba(variables.$color--foreground, 0.1);
				outline: none;
			}
		}
	}
</style>
