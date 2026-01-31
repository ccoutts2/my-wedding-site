<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		errors,
		children,
		name,
		legend
	}: { errors?: string[]; children: Snippet; name: string; legend: string } = $props();
</script>

<fieldset
	class="RadioGroup"
	role="radiogroup"
	aria-required="true"
	data-has-error={errors ? 'true' : undefined}
	aria-invalid={errors ? 'true' : undefined}
	aria-describedby={errors ? `${name}-error-message` : undefined}
>
	<legend class="RadioGroup__legend"> {legend} </legend>

	{#if errors}
		<div class="RadioGroup__error" id="{name}-error-message">
			{errors}
		</div>
	{/if}

	<div class="RadioGroup__options">
		{@render children()}
	</div>
</fieldset>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.RadioGroup {
		border: none;
		display: flex;
		flex-direction: column;
		padding-block: 0.5rem;
		width: 100%;

		&__legend {
			color: grey;
			font-size: 0.825rem;
			padding-block: 0.5rem 0.25rem;
			text-transform: capitalize;
			width: 100%;
		}

		&__error {
			color: variables.$color--input--border-error;
			font-size: 0.75rem;
			margin-bottom: 0.25rem;
			font-weight: 500;
		}

		&[data-has-error] &__options {
			border-color: variables.$color--input--border-error;

			&:hover {
				border-color: variables.$color--input--border-error;
			}
		}

		&__options {
			border-radius: 0.25rem;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
			display: flex;
			overflow: hidden;
			width: 100%;
		}
	}
</style>
