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
	class="Top"
	role="radiogroup"
	aria-required="true"
	data-has-error={errors ? 'true' : undefined}
	aria-invalid={errors ? 'true' : undefined}
	aria-describedby="{name}-error-message"
>
	<legend class="Top__legend">{legend}</legend>
	{#if errors}
		<div class="Error" id="{name}-error-message">
			{errors}
		</div>
	{/if}
	<div class="Top__options SegmentedControl">
		{@render children()}
	</div>
</fieldset>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Top {
		border: none;
		display: flex;
		flex-direction: column;
		width: 100%;

		&[data-has-error] .Top__options {
			border-color: #f87171;

			&:hover {
				border-color: #ef4444;
			}

			&:focus {
				border-color: #dc2626;
				outline: 1px solid #dc2626;
			}
		}

		&__options {
			border-radius: 0.25rem;
			border: 1px solid #e2e8f0;
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
			display: flex;
			overflow: hidden;
			width: 100%;
		}
	}
</style>
