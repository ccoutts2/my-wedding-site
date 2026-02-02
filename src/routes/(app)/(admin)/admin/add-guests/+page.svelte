<script lang="ts">
	import { CircleMinus } from '@lucide/svelte';
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import { GuestType } from '../../../../../generated/prisma/enums';
	import { superForm } from 'sveltekit-superforms';
	import Fieldset from '$lib/components/form/Fieldset.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup/RadioGroup.svelte';
	import RadioGroupOption from '$lib/components/form/RadioGroup/RadioGroupOption.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const toastState = getToastState();

	const { form, enhance, errors } = superForm(data.form, {
		dataType: 'json',
		scrollToError: 'smooth',
		errorSelector: '[aria-invalid="true"]',
		onUpdated({ form }) {
			if (form.valid) {
				if (form.message?.text && form.message?.status) {
					toastState.add(form.message.status, form.message.text, form.message.status);
				}
			}
		}
	});

	const addGuestInput = () => {
		$form.additionalGuests = [
			...$form.additionalGuests,
			{ givenName: '', familyName: '', type: GuestType.DAY }
		];
	};

	const deleteGuestInput = (index: number) => {
		$form.additionalGuests = $form.additionalGuests.filter((_, i) => i !== index);
	};

	$effect(() => {
		if ($form.hasGuests === 'no' && $form.additionalGuests.length > 0) {
			$form.additionalGuests = [];
		}
	});
</script>

<svelte:head>
	<title>Aly and Chris | Add Guests</title>
	<meta name="description" content="Invite guests to the wedding." />
</svelte:head>

<PageLayout title="Add Guests" pageLayout="centered">
	<Form {enhance}>
		<Fieldset legend="Add the guest's first and last name" dataHidden={true}>
			<InputField
				type="text"
				fieldName="given-name"
				label="First Name"
				required
				bind:value={$form.givenName}
				errors={$errors.givenName}
				autocomplete="given-name"
			/>
			<InputField
				type="text"
				fieldName="family-name"
				label="Surname"
				required
				bind:value={$form.familyName}
				errors={$errors.familyName}
				autocomplete="family-name"
			/>
		</Fieldset>

		<InputField
			type="email"
			label="Email"
			fieldName="email"
			required
			bind:value={$form.email}
			errors={$errors.email}
			autocomplete="email"
		/>

		<RadioGroup name="type" legend="Day or Night guest">
			<RadioGroupOption
				label="Day"
				id="type-day"
				name="type"
				bind:group={$form.type}
				value={GuestType.DAY}
			/>
			<RadioGroupOption
				label="Night"
				id="type-night"
				name="type"
				bind:group={$form.type}
				value={GuestType.NIGHT}
			/>
		</RadioGroup>

		<div class="AddGuestToggle">
			<Fieldset>
				<RadioGroup name="hasGuests" legend="More guests">
					<RadioGroupOption
						label="Yes"
						bind:group={$form.hasGuests}
						id="more-guests-yes"
						name="hasGuests"
						value="yes"
					/>
					<RadioGroupOption
						label="No"
						bind:group={$form.hasGuests}
						id="more-guests-no"
						name="hasGuests"
						value="no"
					/>
				</RadioGroup>

				<div
					class={$form.hasGuests === 'yes'
						? 'AddGuestToggle__panel--checked'
						: 'AddGuestToggle__panel'}
				>
					<button type="button" class="AddGuestToggle__addButton" onclick={() => addGuestInput()}
						>Add Guest</button
					>
					<div class="flex-col">
						{#each $form.additionalGuests as _, i}
							<Fieldset
								legend="Add the additional guest's first and last name"
								dataHidden={true}
								class="flex-row gap-2"
							>
								<InputField
									type="text"
									fieldName="guest-{i}-given-name"
									label="First Name"
									required
									bind:value={$form.additionalGuests[i].givenName}
									errors={$errors.additionalGuests?.[i]?.givenName}
									autocomplete="given-name"
								/>

								<InputField
									type="text"
									fieldName="guest-{i}-family-name"
									label="Last Name"
									required
									bind:value={$form.additionalGuests[i].familyName}
									errors={$errors.additionalGuests?.[i]?.familyName}
									autocomplete="family-name"
								/>

								<button
									type="button"
									class="AddGuestToggle__deleteButton"
									onclick={() => deleteGuestInput(i)}
									aria-label="Remove guest"
								>
									<CircleMinus />
								</button>
							</Fieldset>
						{/each}
					</div>
				</div>
			</Fieldset>
		</div>
	</Form>
</PageLayout>

<style lang="scss">
	.AddGuestToggle {
		display: flex;
		flex-direction: column;
		width: 100%;

		&__panel {
			display: none;
		}

		&__panel--checked {
			display: flex;
			flex-direction: column-reverse;
		}

		&__addButton {
			text-align: end;
		}

		&__deleteButton {
			margin-top: 2rem;
		}
	}
</style>
