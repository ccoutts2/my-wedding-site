<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { GuestType } from '../../../../../../generated/prisma/enums';

	let { data }: PageProps = $props();

	const { user } = data;

	const { form, message, errors } = superForm(data.form);
</script>

<main class="UserProfile">
	{#if user}
		<span>
			<h1>User Profile</h1>
			<a href="/admin/view-guests/{user.id}" data-sveltekit-go>Cancel</a>
		</span>
		<section>
			<article>
				<form method="POST" action="?/edit" data-sveltekit-reload>
					<header>
						<h3>
							<label for="given-name" class="visually-hidden">Given Name</label>
							<input
								type="text"
								id="given-name"
								name="givenName"
								autocomplete="given-name"
								bind:value={$form.givenName}
							/>
							<label for="given-name" class="visually-hidden">Family Name</label>
							<input
								type="text"
								id="family-name"
								name="familyName"
								autocomplete="family-name"
								bind:value={$form.familyName}
							/>
						</h3>
					</header>

					<ul>
						<li>
							<label for="email"> Email </label>
							<input type="text" id="email" name="email" bind:value={$form.email} />
						</li>

						<li>
							<span>Day or Night guest</span>
							<input
								type="radio"
								id="type-day"
								name="type"
								value={GuestType.DAY}
								checked={user.type === GuestType.DAY}
							/>
							<label for="type-day">Day</label>
							<input
								type="radio"
								id="type-night"
								name="type"
								value={GuestType.NIGHT}
								checked={user.type === GuestType.NIGHT}
							/>
							<label for="type-night">Night</label>
						</li>
						<li>Responded: {user.RSVP}</li>
						<li>RSVP: {user.isAccepted}</li>
						<li>
							<span>More guests:</span>

							<input
								type="radio"
								id="more-guests-yes"
								name="hasGuests"
								value="yes"
								checked={user.hasGuests === true}
							/>
							<label for="more-guests-yes">Yes</label>
							<input
								type="radio"
								id="more-guests-no"
								name="hasGuests"
								value="no"
								checked={user.hasGuests === false}
							/>
							<label for="more-guests-no"> No</label>
						</li>

						<li>Dietary requirements: {user.diet}</li>
						<li>Further dietary requirements: {user.allergiesDescription}</li>
						<li>Music choice: {user.musicSelection}</li>
					</ul>
					<button type="submit">Update</button>
				</form>
			</article>
		</section>

		{#if user.hasGuests}
			<section>
				<h2>Guest</h2>
				<div>
					{#each user.guest as { givenName, familyName, type, isAccepted, diet, allergiesDescription, musicSelection }}
						<article>
							<h3>
								{givenName}
								{familyName}
							</h3>
							<ul>
								<li>{type} guest</li>
								<li>RSVP: {isAccepted}</li>
								<li>Dietary requirements: {diet}</li>
								<li>Further dietary requirements: {allergiesDescription}</li>
								<li>Music choice: {musicSelection}</li>
							</ul>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	{:else}
		<p>User not found.</p>
	{/if}
</main>

<style lang="scss">
	.UserProfile {
		position: fixed;
		z-index: 10;
		top: 10rem;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ded4e6;
		overflow: auto;
	}
</style>
