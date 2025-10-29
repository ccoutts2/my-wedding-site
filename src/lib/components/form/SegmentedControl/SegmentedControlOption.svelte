<script lang="ts">
	let {
		group = $bindable(),
		id,
		label,
		value
	}: { group: string; id: string; label: string; value: string } = $props();
</script>

<label for={id} class="Option__label">
	{label}
	<input type="radio" {value} {id} bind:group class="Option__input" />
</label>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Option {
		&__input {
			// Hide radio and position over label
			cursor: pointer;
			height: 100%;
			left: 0;
			opacity: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}

		&__label {
			background-color: white;
			border-left: 1px solid rgba(variables.$color--guest--text, 0.3);
			display: flex;
			flex-grow: 1;
			justify-content: center;
			padding: 0.5rem 1rem;
			position: relative;
			transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
			user-select: none;

			&:first-of-type {
				border-left: none;
			}

			&:has(:checked),
			&:hover {
				background-color: variables.$color--guest--text;
				border-color: variables.$color--guest--text;
				color: white;
			}

			&:has(:focus-visible) {
				background-color: variables.$color--guest--text;
			}
		}
	}
</style>
