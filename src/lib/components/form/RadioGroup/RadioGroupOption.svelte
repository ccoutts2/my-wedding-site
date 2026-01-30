<script lang="ts">
	let {
		group = $bindable(),
		id,
		label,
		name,
		value,
		checked,
		required = false
	}: {
		group: string | undefined;
		id: string;
		name: string;
		label: string;
		value: string;
		checked?: boolean;
		required?: boolean;
	} = $props();
</script>

<label for={id} class="Option__label">
	{label}
	<input class="Option__input" type="radio" {name} {id} bind:group {value} {checked} {required} />
</label>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Option {
		&__input {
			cursor: pointer;
			height: 100%;
			left: 0;
			opacity: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}

		&__label {
			background-color: variables.$color--default--input--background;
			border-left: 1px solid variables.$color--input--border;
			color: variables.$color--foreground;
			display: flex;
			flex-grow: 1;
			font-size: 0.875rem;
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
				background-color: variables.$color--option--selected;
				color: variables.$color--option--selected-text;
				font-weight: 600;
			}

			&:hover:not(:has(:checked)) {
				background-color: variables.$color--option--hover;
			}

			&:has(:focus-visible) {
				outline: 2px solid variables.$color--input--border-focus;
				outline-offset: -2px;
				z-index: 1;
			}
		}
	}
</style>
