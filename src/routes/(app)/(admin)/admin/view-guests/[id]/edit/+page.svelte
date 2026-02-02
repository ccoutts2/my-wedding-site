<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { GuestType } from '../../../../../../../generated/prisma/enums';
	import RadioGroup from '$lib/components/form/RadioGroup/RadioGroup.svelte';
	import RadioGroupOption from '$lib/components/form/RadioGroup/RadioGroupOption.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import Fieldset from '$lib/components/form/Fieldset.svelte';
	import { getToastState } from '$lib/contexts/toast-state.svelte';

	let { data }: PageProps = $props();

	const { user } = data;
	const toastState = getToastState();

	const { form, enhance, errors } = superForm(data.form, {
		dataType: 'json',
		onUpdated({ form }) {
			if (form.valid) {
				if (form.message?.text && form.message?.status) {
					toastState.add('Updated user information.', form.message.text, form.message.status);
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Aly and Chris | Edit Guest Information</title>
	<meta
		name="description"
		content="Edit a specific guests's information, and their guest's information."
	/>
</svelte:head>

<section class="EditUserProfile">
	{#if user}
		<header class="EditUserProfile__header">
			<h1>Edit User Profile</h1>
			<a href="/admin/view-guests/{user.id}" data-sveltekit-go>Cancel</a>
		</header>
		<section class="EditUserCards">
			<div>
				<h2>Main Guest</h2>
				<article class="EditUserCard">
					<Form action="?/edit" {enhance}>
						<Fieldset legend="Edit the guest's first and last name" dataHidden={true}>
							<InputField
								type="text"
								label="First Name"
								fieldName="givenName"
								bind:value={$form.givenName}
								errors={$errors.givenName}
								autocomplete="given-name"
							/>
							<InputField
								type="text"
								label="Last Name"
								fieldName="familyName"
								bind:value={$form.familyName}
								errors={$errors.familyName}
								autocomplete="family-name"
							/>
						</Fieldset>

						<InputField
							type="email"
							fieldName="email"
							label="Email"
							autocomplete="email"
							errors={$errors.email}
							bind:value={$form.email}
						/>

						<RadioGroup name="type" legend="Day or Night guest">
							<RadioGroupOption
								label="Day"
								id="type-day"
								name="type"
								bind:group={$form.type}
								value={GuestType.DAY}
								checked={user.type === GuestType.DAY}
							/>
							<RadioGroupOption
								label="Night"
								id="type-night"
								name="type"
								bind:group={$form.type}
								value={GuestType.NIGHT}
								checked={user.type === GuestType.NIGHT}
							/>
						</RadioGroup>

						<RadioGroup name="type" legend="More guests">
							<RadioGroupOption
								label="Yes"
								bind:group={$form.hasGuests}
								id="more-guests-yes"
								name="hasGuests"
								value="yes"
								checked={user.hasGuests === true}
							/>
							<RadioGroupOption
								label="No"
								bind:group={$form.hasGuests}
								id="more-guests-no"
								name="hasGuests"
								value="no"
								checked={user.hasGuests === false}
							/>
						</RadioGroup>
					</Form>
				</article>
			</div>

			{#if user.hasGuests && user.guest.length > 0}
				<ul class="EditUserCards__additionalGuests">
					{#each $form.additionalGuests as _, i}
						<li>
							<article class="EditUserCard">
								<Form action="?/editGuest" {enhance}>
									<input type="hidden" name="guestId" value={$form.additionalGuests[i].id} />
									<Fieldset legend="Edit the guest's first and last name" dataHidden={true}>
										<InputField
											type="text"
											label="First Name"
											fieldName="givenName"
											bind:value={$form.additionalGuests[i].givenName}
											errors={$errors.additionalGuests?.[i]?.givenName as string[] | undefined}
											autocomplete="given-name"
										/>
										<InputField
											type="text"
											label="Last Name"
											fieldName="familyName"
											bind:value={$form.additionalGuests[i].familyName}
											errors={$errors.additionalGuests?.[i]?.familyName as string[] | undefined}
											autocomplete="family-name"
										/>
									</Fieldset>

									<RadioGroup name="type" legend="Day or Night guest">
										<RadioGroupOption
											label="Day"
											id="guest-{i}-type-day"
											name="type"
											bind:group={$form.additionalGuests[i].type}
											value={GuestType.DAY}
											checked={$form.additionalGuests[i].type === GuestType.DAY}
										/>
										<RadioGroupOption
											label="Night"
											id="guest-{i}-type-night"
											name="type"
											bind:group={$form.additionalGuests[i].type}
											value={GuestType.NIGHT}
											checked={$form.additionalGuests[i].type === GuestType.NIGHT}
										/>
									</RadioGroup>
								</Form>
							</article>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{:else}
		<p>User not found.</p>
	{/if}
</section>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';
	@use '$lib/styles/partials/variables';

	.EditUserProfile {
		background-color: variables.$color--background;
		top: 0;
		left: 0;
		overflow: auto;
		padding: 1rem;
		position: fixed;
		right: 0;
		z-index: 10;

		&__header {
			display: flex;
			flex-direction: row-reverse;
			justify-content: flex-end;
			align-items: center;
			gap: 1rem;

			a {
				font-size: 0.825rem;
				border-radius: 9999px;
				border: 1px solid black;
				padding: 0.25rem 0.5rem;
				text-decoration: none;
				color: black;
			}
		}
	}

	.EditUserCards {
		display: flex;
		height: 65vh;
		gap: 2rem;
		flex-direction: column;
		overflow: auto;
		width: 100%;

		@include breakpoints.tablet {
			flex-direction: row;
		}

		h2 {
			margin-bottom: 1rem;
		}

		&__additionalGuests {
			display: flex;
			gap: 2rem;
			list-style: none;
			width: 100%;
		}
	}

	.EditUserCard {
		border-radius: 0.5rem;
		border: 1px solid black;
		display: flex;
		gap: 1rem;
		padding: 1rem;
		min-width: 18rem;
		max-width: 25rem;
	}
</style>
