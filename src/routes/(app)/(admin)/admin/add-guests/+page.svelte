<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { GuestType } from '../../../../../generated/prisma/enums';

	let { data }: PageProps = $props();

	const { form, enhance, message, errors } = superForm(data.form, {
		dataType: 'json',
		scrollToError: 'smooth',
		errorSelector: '[aria-invalid="true"]'
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

<main>
	<form method="POST" use:enhance>
		{#if $message}
			<p>{$message.text}</p>
		{/if}
		<fieldset>
			<legend>Add the guests's first and last name</legend>

			<div>
				<label for="given-name">First name:</label>
				<input
					type="text"
					name="given-name"
					id="given-name"
					autocomplete="given-name"
					required
					bind:value={$form.givenName}
				/>
			</div>
			<div>
				<label for="family-name">Last name:</label>
				<input
					type="text"
					id="family-name"
					name="family-name"
					autocomplete="family-name"
					required
					bind:value={$form.familyName}
				/>
			</div>
		</fieldset>
		<div>
			<label for="email">Email:</label>
			<input
				type="text"
				id="email"
				name="email"
				autocomplete="email"
				required
				bind:value={$form.email}
			/>
		</div>
		<fieldset>
			<legened>Is the guest a day or night guest?</legened>
			<div>
				<input
					type="radio"
					id="day-guest"
					name="type"
					required
					value={GuestType.DAY}
					bind:group={$form.type}
				/>
				<label for="day-guest">Day</label>
			</div>
			<div>
				<input
					type="radio"
					id="night-guest"
					name="type"
					required
					value={GuestType.NIGHT}
					bind:group={$form.type}
				/>
				<label for="night-guest">Night</label>
			</div>
		</fieldset>

		<fieldset class="GuestToggle">
			<legened>Can the guest bring other guests?</legened>
			<div>
				<input
					type="radio"
					id="has-guests-yes"
					name="has-guests"
					required
					value="yes"
					bind:group={$form.hasGuests}
				/>
				<label for="has-guests-yes">Yes</label>
			</div>
			<div>
				<input
					type="radio"
					id="has-guests-no"
					name="has-guests"
					required
					value="no"
					bind:group={$form.hasGuests}
				/>
				<label for="has-guests-no">No</label>
			</div>

			<div class={$form.hasGuests === 'yes' ? 'GuestToggle__panel--checked' : 'GuestToggle__panel'}>
				<button type="button" onclick={() => addGuestInput()}>Add Guests</button>
				{#each $form.additionalGuests as _, i}
					<fieldset>
						<legend>Add the additional guest's first and last name</legend>
						<div>
							<label for="guest-{i}-given-name">First name:</label>
							<input
								type="text"
								name="given-name"
								id="guest-{i}-given-name"
								autocomplete="given-name"
								required
								bind:value={$form.additionalGuests[i].givenName}
							/>
						</div>
						<div>
							<label for="guest-{i}-family-name">Last name:</label>
							<input
								type="text"
								id="guest-{i}-family-name"
								name="family-name"
								autocomplete="family-name"
								required
								bind:value={$form.additionalGuests[i].familyName}
							/>
						</div>
						<button
							type="button"
							onclick={() => deleteGuestInput(i)}
							aria-label="Add another guest"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M5 12h14" />
							</svg>
						</button>
					</fieldset>
				{/each}
			</div>
		</fieldset>
		<button type="submit">Add guest</button>
	</form>
</main>

<style lang="scss">
	.GuestToggle {
		display: flex;
		flex-direction: column;

		&__panel {
			display: none;

			&--checked {
				display: flex;
			}
		}
	}
</style>
