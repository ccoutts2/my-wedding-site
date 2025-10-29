<script lang="ts">
	import { type FormFieldProps } from './types';

	let {
		label,
		fieldName,
		value = $bindable(),
		errors,
		autocomplete,
		required = false,
		constraints = undefined
	}: FormFieldProps = $props();
</script>

<div class="TextField" data-has-error={errors ? 'true' : undefined}>
	<label class="TextField__label" data-has-error={errors ? 'true' : undefined} for={fieldName}
		>{label}</label
	>
	<input
		class="TextField__input"
		name={fieldName}
		id={fieldName}
		bind:value
		type="text"
		{required}
		{autocomplete}
		aria-invalid={errors ? 'true' : undefined}
		aria-describedby={errors ? `${fieldName}-error-message` : undefined}
		{...constraints}
	/>
	{#if errors}
		<span class="Error" id="{fieldName}-error-message">{errors}</span>
	{/if}
</div>

<style lang="scss">
	.TextField {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
			background-color: #eee8f4;
			border-radius: 4px;
			border: 2px solid transparent;
			flex-shrink: 1;
			font-size: Max(16px, 1em);
			padding: 0.25rem 0.5rem;
			transition: 180ms box-shadow ease-in-out;
			width: 100%;

			&:focus {
				border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
				box-shadow: 0 0 0 2px
					hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) + 40%), 0.8);
				outline: 2px solid transparent;
			}
		}
	}

	.Error {
		color: #dc2626;
		display: flex;
		gap: 0.2rem;
		margin-bottom: 0.25rem;
	}
</style>
