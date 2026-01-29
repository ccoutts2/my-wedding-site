<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { DietaryOptions } from '../../../../generated/prisma/enums';

	let { data }: PageProps = $props();

	const { form, enhance, message, errors } = superForm(data.form, {
		resetForm: false,
		scrollToError: 'smooth',
		dataType: 'json',
		errorSelector: '[aria-invalid="true"]'
	});
</script>

<main>
	<h1>RSVP</h1>

	<h2>Hi {data.user.givenName}, please use the form below to RSVP</h2>
	{#if data.user.hasGuests}
		<p>You'll be able to fill in the form for:</p>
		<ul>
			{#each data.additionalGuests as guest}
				<li>{guest.givenName}</li>
			{/each}
		</ul>
	{/if}

	<form use:enhance method="POST">
		<fieldset>
			<legend>Are you joining us on our special day?</legend>
			<div>
				<input
					type="radio"
					name="acceptance"
					id="acceptance-yes"
					value="yes"
					required
					bind:group={$form.acceptance}
				/>
				<label for="acceptance-yes">Yes</label>
			</div>
			<div>
				<input
					type="radio"
					name="acceptance"
					id="acceptance-no"
					class="toggle"
					required
					value="no"
					bind:group={$form.acceptance}
				/>
				<label for="acceptance-no">No</label>
			</div>
			{#if $errors.acceptance}
				<div class="Error" id="acceptance-error-message">
					{$errors.acceptance}
				</div>
			{/if}
		</fieldset>
		<fieldset class={$form.acceptance !== 'yes' ? 'toggle-hide' : ''}>
			<legend>Please select your dietary requirements</legend>
			<div>
				<input
					type="radio"
					name="meal"
					id="meal-meat"
					required={$form.acceptance === 'yes'}
					value={DietaryOptions.MEAT}
					bind:group={$form.meal}
				/>
				<label for="meal-meat">Meat</label>
			</div>
			<div>
				<input
					type="radio"
					name="meal"
					id="meal-vegetarian"
					required={$form.acceptance === 'yes'}
					value={DietaryOptions.VEGETARIAN}
					bind:group={$form.meal}
				/>
				<label for="meal-vegetarian">Vegetarian</label>
			</div>
			<div>
				<input
					type="radio"
					name="meal"
					id="meal-vegan"
					required={$form.acceptance === 'yes'}
					value={DietaryOptions.VEGAN}
					bind:group={$form.meal}
				/>
				<label for="meal-vegan">Vegan</label>
			</div>
			{#if $errors.meal}
				<div class="Error" id="meal-error-message">
					{$errors.meal}
				</div>
			{/if}
		</fieldset>
		<fieldset class={$form.acceptance !== 'yes' ? 'toggle-hide' : ''}>
			<legend>Do you have allergies?</legend>
			<div>
				<input
					type="radio"
					name="allergies"
					id="allergies-yes"
					required={$form.acceptance === 'yes'}
					value="yes"
					bind:group={$form.allergies}
				/>
				<label for="allergies-yes">Yes</label>
			</div>
			<div>
				<input
					type="radio"
					name="allergies"
					id="allergies-no"
					required={$form.acceptance === 'yes'}
					value="no"
					bind:group={$form.allergies}
				/>
				<label for="allergies-no">No</label>
			</div>
			{#if $errors.allergies}
				<div class="Error" id="allergies-error-message">
					{$errors.allergies}
				</div>
			{/if}
		</fieldset>
		<div class={$form.acceptance !== 'yes' ? 'toggle-hide' : ''}>
			<label for="allergies-description"
				>Let us know if you have any further info on your allergies (optional)</label
			>
			<textarea
				name="allergies-description"
				id="allergies-description"
				bind:value={$form.allergiesDescription}
			></textarea>
			{#if $errors.allergiesDescription}
				<div class="Error" id="allergiesDescription-error-message">
					{$errors.allergiesDescription}
				</div>
			{/if}
		</div>
		<div class={$form.acceptance !== 'yes' ? 'toggle-hide' : ''}>
			<label for="music">Music choice for the DJ's?</label>
			<input type="text" name="music" id="music" bind:value={$form.music} />
			{#if $errors.music}
				<div class="Error" id="music-error-message">
					{$errors.music}
				</div>
			{/if}
		</div>

		{#each data.additionalGuests as guest, i}
			<fieldset>
				<legend>Is {guest.givenName} joining us on our special day?</legend>
				<div>
					<input
						type="radio"
						name="acceptance[{i}]"
						id="acceptance-{i}-yes"
						class="toggle"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value="yes"
						bind:group={$form.guestResponses[i].acceptance}
					/>
					<label for="acceptance-{i}-yes">Yes</label>
				</div>
				<div>
					<input
						type="radio"
						name="acceptance[{i}]"
						id="acceptance-{i}-no"
						class="toggle-guest"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value="no"
						bind:group={$form.guestResponses[i].acceptance}
					/>
					<label for="acceptance-no">No</label>
				</div>
				{#if $errors.guestResponses?.[i].acceptance}
					<div class="Error" id="acceptance-{i}-error-message">
						{$errors.guestResponses?.[i].acceptance}
					</div>
				{/if}
			</fieldset>
			<fieldset class={$form.guestResponses[i].acceptance !== 'yes' ? 'toggle-hide' : ''}>
				<legend>Please select {guest.givenName}'s dietary requirements</legend>
				<div>
					<input
						type="radio"
						name="meal[{i}]"
						id="meal-{i}-meat"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value={DietaryOptions.MEAT}
						bind:group={$form.guestResponses[i].meal}
					/>
					<label for="meal-{i}-meat">Meat</label>
				</div>
				<div>
					<input
						type="radio"
						name="meal[{i}]"
						id="meal-{i}-vegetarian"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value={DietaryOptions.VEGETARIAN}
						bind:group={$form.guestResponses[i].meal}
					/>
					<label for="meal-{i}-vegetarian">Vegetarian</label>
				</div>
				<div>
					<input
						type="radio"
						name="meal[{i}]"
						id="meal-{i}-vegan"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value={DietaryOptions.VEGAN}
						bind:group={$form.guestResponses[i].meal}
					/>
					<label for="meal-{i}-vegan">Vegan</label>
				</div>
				{#if $errors.guestResponses?.[i].acceptance}
					<div class="Error" id="acceptance-{i}-error-message">
						{$errors.guestResponses?.[i].acceptance}
					</div>
				{/if}
			</fieldset>
			<fieldset class={$form.guestResponses[i].acceptance !== 'yes' ? 'toggle-hide' : ''}>
				<legend>Does {guest.givenName} have allergies?</legend>
				<div>
					<input
						type="radio"
						name="allergies[{i}]"
						id="allergies-{i}-yes"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value="yes"
						bind:group={$form.guestResponses[i].allergies}
					/>
					<label for="allergies-{i}-yes">Yes</label>
				</div>
				<div>
					<input
						type="radio"
						name="allergies[{i}]"
						id="allergies-{i}-no"
						required={$form.guestResponses[i].acceptance === 'yes'}
						value="no"
						bind:group={$form.guestResponses[i].allergies}
					/>
					<label for="allergies-{i}-no">No</label>
				</div>
				{#if $errors.guestResponses?.[i].allergies}
					<div class="Error" id="allergies-{i}-error-message">
						{$errors.guestResponses?.[i].allergies}
					</div>
				{/if}
			</fieldset>
			<div class={$form.guestResponses[i].acceptance !== 'yes' ? 'toggle-hide' : ''}>
				<label for="allergies-{i}-description"
					>Let us know if {guest.givenName} has any further info on your allergies (optional)</label
				>
				<textarea
					name="allergies[{i}]-description"
					id="allergies-{i}-description"
					bind:value={$form.guestResponses[i].allergiesDescription}
				></textarea>
				{#if $errors.guestResponses?.[i].allergiesDescription}
					<div class="Error" id="allergies-description-{i}-error-message">
						{$errors.guestResponses?.[i].allergiesDescription}
					</div>
				{/if}
			</div>
			<div class={$form.guestResponses[i].acceptance !== 'yes' ? 'toggle-hide' : ''}>
				<label for="music-{i}">Their music choice for the DJ's?</label>
				<input
					type="text"
					name="music[{i}]"
					id="music-{i}"
					required={$form.guestResponses[i].acceptance === 'yes'}
					bind:value={$form.guestResponses[i].music}
				/>
				{#if $errors.guestResponses?.[i].music}
					<div class="Error" id="music-selection-{i}-error-message">
						{$errors.guestResponses?.[i].music}
					</div>
				{/if}
			</div>
		{/each}
		<button type="submit">Submit</button>
	</form>

	{#if $message}
		<p>{$message.text}</p>
	{/if}
</main>

<style lang="scss">
	.toggle-hide {
		display: none;
	}
</style>
