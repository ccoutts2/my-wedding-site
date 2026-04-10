<script lang="ts">
	import { DietaryOptions } from '../../../../../../generated/prisma/enums';
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import { superForm } from 'sveltekit-superforms';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup/RadioGroup.svelte';
	import RadioGroupOption from '$lib/components/form/RadioGroup/RadioGroupOption.svelte';
	import type { PageProps } from './$types';
	import Subtitle from '$lib/components/Subtitle.svelte';

	let { data }: PageProps = $props();

	const toastState = getToastState();

	const { form, enhance, message, errors } = superForm(data.form, {
		scrollToError: 'smooth',
		dataType: 'json',
		resetForm: false,
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
	<title>Aly and Chris | Edit RSVP</title>
	<meta name="description" content="Edit your RSVP to the wedding by filling out the form." />
</svelte:head>

<PageLayout title="Edit your RSVP" pageLayout="centered">
	<section class="EditRSVP">
		<Subtitle as="h2">Hi {data.user.givenName}</Subtitle>
		<p class="EditRSVP__text">Please use the form below to edit your RSVP.</p>
		{#if data.user.hasGuests}
			<p class="EditRSVP__text">You'll be able to fill in the form for:</p>
			<ul class="EditRSVP__additionalGuestList">
				<li class="italic">yourself</li>
				{#each data.user.guest as guest}
					<li>{guest.givenName}</li>
				{/each}
			</ul>
			<p class="EditRSVP__text">
				Once you submit, you can come back to this form to edit anything at a later date.
			</p>
		{/if}
	</section>

	<Form {enhance}>
		<RadioGroup name="acceptance" legend="Are you joining us on our special day?">
			<RadioGroupOption
				label="Yes"
				bind:group={$form.acceptance}
				name="acceptance"
				id="acceptance-yes"
				value="yes"
			/>
			<RadioGroupOption
				label="No"
				bind:group={$form.acceptance}
				name="acceptance"
				id="acceptance-no"
				value="no"
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
					label="Let us know if you have any further info on your allergies or specific dietary requirements (optional)"
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
			</div>
		{/if}

		{#each data.user.guest as guest, i}
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
			{#if $form.guestResponses[i].acceptance === 'yes'}
				<div class="w-full {$form.guestResponses[i].acceptance !== 'yes' ? 'toggle-hide' : ''}">
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
						errors={$errors.guestResponses?.[i]?.allergiesDescription as string[] | undefined}
						bind:value={$form.guestResponses[i].allergiesDescription}
					/>

					<InputField
						type="text"
						name="music[{i}]"
						id="music-{i}"
						fieldName="music-{i}"
						label="Their music choice for the DJs?"
						errors={$errors.guestResponses?.[i]?.music as string[] | undefined}
						required={$form.guestResponses[i].acceptance === 'yes'}
						bind:value={$form.guestResponses[i].music}
					/>
				</div>
			{/if}
		{/each}

		{#if $form.acceptance === 'no'}
			<div>
				<p>Sad!</p>
				<p>If your plans change please fill in the form again. You have until October to RSVP.</p>
			</div>
		{/if}
	</Form>
</PageLayout>

<style lang="scss">
	.EditRSVP {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 1rem;

		&__text {
			margin-top: 0.25rem;
		}

		&__additionalGuestList {
			list-style: none;

			li {
				margin-top: 0.5rem;
			}
		}
	}
</style>
