<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { DietaryOptions } from '../../../../generated/prisma/enums';
	import Fieldset from '$lib/components/form/Fieldset.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup/RadioGroup.svelte';
	import RadioGroupOption from '$lib/components/form/RadioGroup/RadioGroupOption.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import { getToastState } from '$lib/contexts/toast-state.svelte';

	let { data }: PageProps = $props();

	const toastState = getToastState();

	const { form, enhance, message, errors } = superForm(data.form, {
		scrollToError: 'smooth',
		dataType: 'json',
		errorSelector: '[aria-invalid="true"]',
		onUpdated({ form }) {
			if (form.valid) {
				if ($message?.text && $message?.status) {
					toastState.add($message.status, $message.text, $message.status);
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Aly and Chris | RSVP</title>
	<meta name="description" content="RSVP to the wedding by filling out the form." />
</svelte:head>

<PageLayout title="RSVP to our wedding!" pageLayout="centered">
	<h2>Hi {data.user.givenName}, please use the form below to RSVP</h2>
	{#if data.user.hasGuests}
		<p>You'll be able to fill in the form for:</p>
		<ul>
			{#each data.additionalGuests as guest}
				<li>{guest.givenName}</li>
			{/each}
		</ul>
		<p>Once you submit, you can come back to this form to edit anything at a later date.</p>
	{/if}

	<Form {enhance}>
		<RadioGroup name="acceptance" legend="Are you joining us on our special day?">
			<RadioGroupOption
				label="Yes"
				bind:group={$form.acceptance}
				name="acceptance"
				id="acceptance-yes"
				value="yes"
				checked={data.user.isAccepted === true}
			/>
			<RadioGroupOption
				label="No"
				bind:group={$form.acceptance}
				name="acceptance"
				id="acceptance-no"
				value="no"
				checked={data.user.isAccepted === false}
			/>
		</RadioGroup>

		{#if $form.acceptance === 'yes'}
			<div class="w-full {$form.acceptance !== 'yes' ? 'toggle-hide' : ''}">
				<RadioGroup name="meal" legend="Please select your dietary requirements">
					<RadioGroupOption
						label="Meat"
						bind:group={$form.meal}
						name="meal"
						id="meal-meat"
						value={DietaryOptions.MEAT}
					/>
					<RadioGroupOption
						label="Vegetarian"
						bind:group={$form.meal}
						name="meal"
						id="meal-vegetarian"
						value={DietaryOptions.VEGETARIAN}
					/>
					<RadioGroupOption
						label="Vegan"
						bind:group={$form.meal}
						name="meal"
						id="meal-vegan"
						value={DietaryOptions.VEGAN}
					/>
				</RadioGroup>

				<RadioGroup name="allergies" legend="Do you have any allergies?">
					<RadioGroupOption
						label="Yes"
						bind:group={$form.allergies}
						name="allergies"
						id="allergies-yes"
						value="yes"
					/>
					<RadioGroupOption
						label="No"
						bind:group={$form.allergies}
						name="allergies"
						id="allergies-no"
						value="no"
					/>
				</RadioGroup>

				<InputField
					type="textarea"
					name="allergies-description"
					id="allergies-description"
					fieldName="allergies-description"
					label="Let us know if you have any further info on your allergies or specific deitary requirements (optional)"
					errors={$errors.allergiesDescription}
					bind:value={$form.allergiesDescription}
				/>

				<InputField
					type="text"
					name="music"
					id="music"
					fieldName="music"
					label="Music choice for the DJs?"
					errors={$errors.music}
					bind:value={$form.music}
				/>

				{#each data.additionalGuests as guest, i}
					<RadioGroup
						name="acceptance[{i}]"
						legend="Is {guest.givenName} joining us on our special day?"
					>
						<RadioGroupOption
							label="Yes"
							bind:group={$form.guestResponses[i].acceptance}
							name="acceptance[{i}]"
							id="acceptance-{i}-yes"
							value="yes"
							required={$form.guestResponses[i].acceptance === 'yes'}
						/>
						<RadioGroupOption
							label="No"
							bind:group={$form.guestResponses[i].acceptance}
							name="acceptance[{i}]"
							id="acceptance-{i}-no"
							value="no"
							required={$form.guestResponses[i].acceptance === 'yes'}
						/>
					</RadioGroup>

					<RadioGroup
						name="meal[{i}]"
						legend="Please select {guest.givenName}'s dietary requirements"
					>
						<RadioGroupOption
							label="Meat"
							name="meal[{i}]"
							id="meal-{i}-meat"
							required={$form.guestResponses[i].acceptance === 'yes'}
							value={DietaryOptions.MEAT}
							bind:group={$form.guestResponses[i].meal}
						/>
						<RadioGroupOption
							label="Vegetarian"
							name="meal[{i}]"
							id="meal-{i}-vegetarian"
							required={$form.guestResponses[i].acceptance === 'yes'}
							value={DietaryOptions.VEGETARIAN}
							bind:group={$form.guestResponses[i].meal}
						/>
						<RadioGroupOption
							label="Vegan"
							name="meal[{i}]"
							id="meal-{i}-vegan"
							required={$form.guestResponses[i].acceptance === 'yes'}
							value={DietaryOptions.VEGAN}
							bind:group={$form.guestResponses[i].meal}
						/>
					</RadioGroup>

					<RadioGroup name="allergies[{i}]" legend="Does {guest.givenName} have allergies?">
						<RadioGroupOption
							label="Yes"
							bind:group={$form.guestResponses[i].allergies}
							required={$form.guestResponses[i].acceptance === 'yes'}
							name="allergies[{i}]"
							id="allergies-{i}-yes"
							value="yes"
						/>
						<RadioGroupOption
							label="No"
							bind:group={$form.guestResponses[i].allergies}
							required={$form.guestResponses[i].acceptance === 'yes'}
							name="allergies[{i}]"
							id="allergies-{i}-no"
							value="no"
						/>
					</RadioGroup>

					<InputField
						type="textarea"
						name="allergies[{i}]-description"
						id="allergies-{i}-description"
						fieldName="allergies-{i}-description"
						label="Let us know if {guest.givenName} has any further info on their allergies or specific dietary requirements (optional)"
						errors={$errors.guestResponses?.[i].allergiesDescription as string[] | undefined}
						bind:value={$form.guestResponses[i].allergiesDescription}
					/>

					<InputField
						type="text"
						name="music[{i}]"
						id="music-{i}"
						fieldName="music-{i}"
						label="Their music choice for the DJs?"
						errors={$errors.guestResponses?.[i].allergiesDescription as string[] | undefined}
						required={$form.guestResponses[i].acceptance === 'yes'}
						bind:value={$form.guestResponses[i].music}
					/>
				{/each}
			</div>
		{/if}
	</Form>

	{#if $form.acceptance === 'no'}
		<p>Sad!</p>
		<p>If your plans change please fill in the form again. You have until October to RSVP.</p>
	{/if}
</PageLayout>

<style lang="scss">
	.toggle-hide {
		display: none;
	}
</style>
