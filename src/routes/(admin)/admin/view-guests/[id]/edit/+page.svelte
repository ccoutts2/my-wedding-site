<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { GuestType } from '../../../../../../generated/prisma/enums';
	import EmailField from '$lib/components/form/EmailField.svelte';
	import TextField from '$lib/components/form/TextField.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup/RadioGroup.svelte';
	import RadioGroupOption from '$lib/components/form/RadioGroup/RadioGroupOption.svelte';
	import UserCardDetails from '$lib/components/cards/UserCardDetails.svelte';
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/form/Form.svelte';

	let { data }: PageProps = $props();

	const { user } = data;

	const { form, enhance, message, errors } = superForm(data.form, {
		dataType: 'json'
	});
</script>

<main class="EditUserProfile">
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
						<fieldset class="w-full">
							<legend class="visually-hidden">Edit the guest's first and last name</legend>
							<TextField
								label="First Name"
								fieldName="givenName"
								bind:value={$form.givenName}
								errors={$errors.givenName}
								autocomplete="given-name"
							/>
							<TextField
								label="Last Name"
								fieldName="familyName"
								bind:value={$form.familyName}
								errors={$errors.familyName}
								autocomplete="family-name"
							/>
						</fieldset>

						<EmailField
							fieldName="email"
							label="Email"
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
				<ul class="EditUserCards__additionalGuests" role="list">
					{#each $form.additionalGuests as _, i}
						<li>
							<article class="EditUserCard">
								<Form action="?/editGuest" {enhance}>
									<input type="hidden" name="guestId" value={$form.additionalGuests[i].id} />
									<fieldset class="w-full">
										<legend class="visually-hidden">Edit the guest's first and last name</legend>
										<TextField
											label="First Name"
											fieldName="givenName"
											bind:value={$form.additionalGuests[i].givenName}
											errors={$errors.additionalGuests?.[i]?.givenName as string[] | undefined}
											autocomplete="given-name"
										/>
										<TextField
											label="Last Name"
											fieldName="familyName"
											bind:value={$form.additionalGuests[i].familyName}
											errors={$errors.additionalGuests?.[i]?.familyName as string[] | undefined}
											autocomplete="family-name"
										/>
									</fieldset>

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
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.EditUserProfile {
		background-color: #ded4e6;
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
		max-width: 35rem;
	}
</style>
