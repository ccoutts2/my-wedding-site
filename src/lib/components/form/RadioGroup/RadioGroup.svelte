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
		<span class="Error" id="{name}-error-message">
			{errors}
		</span>
	{/if}

	<div class="RadioGroup__options">
		{@render children()}
	</div>
</fieldset>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.RadioGroup {
		border: none;
		padding-block: 0.75rem;
		width: 100%;

		&__legend {
			color: grey;
			font-size: 0.825rem;
			padding-top: 0.75rem;
			width: 100%;
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
