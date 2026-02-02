<script lang="ts">
	import { type FormFieldProps } from './types';

	let {
		label,
		fieldName,
		type,
		value = $bindable(),
		errors,
		autocomplete,
		required = false,
		constraints = undefined
	}: FormFieldProps = $props();
</script>

<div class="Field" data-has-error={errors ? 'true' : undefined}>
	<label class="Field__label" data-has-error={errors ? 'true' : undefined} for={fieldName}
		>{label}</label
	>
	{#if type !== 'textarea'}
		<input
			class="Field__input"
			name={fieldName}
			id={fieldName}
			bind:value
			{type}
			{required}
			{autocomplete}
			aria-invalid={errors ? 'true' : undefined}
			aria-describedby={errors ? `${fieldName}-error-message` : undefined}
			{...constraints}
		/>
	{:else}
		<textarea
			class="Field__input"
			name={fieldName}
			id={fieldName}
			bind:value
			{required}
			rows="5"
			aria-invalid={errors ? 'true' : undefined}
			aria-describedby={errors ? `${fieldName}-error-message` : undefined}
			{...constraints}
		></textarea>
	{/if}
	{#if errors}
		<span class="Error" id="{fieldName}-error-message">{errors}</span>
	{/if}
</div>

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
			padding-block: 0.5rem 0.25rem;
			width: 100%;
		}

		&__input {
			background-color: variables.$color--default--input--background;
			border: 1px solid variables.$color--input--border;
			border-radius: 0.25rem;
			color: variables.$color--foreground;
			flex-shrink: 1;
			font-size: Max(16px, 1em);
			padding: 0.5rem;
			transition: 180ms box-shadow ease-in-out;
			width: 100%;

			&:focus {
				border-color: variables.$color--input--border-focus;
				box-shadow: 0 0 0 2px rgba(variables.$color--foreground, 0.1);
				outline: none;
			}
		}

		&[data-has-error='true'] &__input {
			border-color: variables.$color--input--border-error;

			&:focus {
				box-shadow: 0 0 0 2px rgba(variables.$color--input--border-error, 0.1);
			}
		}
	}

	.Error {
		color: #dc2626;
		display: flex;
		font-size: 0.75rem;
		gap: 0.2rem;
		margin-bottom: 0.25rem;
	}
</style>
