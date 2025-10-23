<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { quartIn, quartInOut } from 'svelte/easing';
	import { GuestType } from '../../../../../generated/prisma/enums';

	let { data }: PageProps = $props();

	const { user } = data;

	const { form, enhance, message, errors } = superForm(data.form);
</script>

<main
	class="UserProfile"
	in:fly={{ y: '100%', duration: 700, easing: quartInOut, opacity: 1 }}
	out:fly={{ y: '100%', duration: 700, easing: quartInOut, opacity: 1 }}
>
	{#if user}
		<span>
			<h1>User Profile</h1>
			<a href="/admin/view-guests">Back</a>
		</span>
		<section>
			<article>
				<header>
					<h3>
						{user.givenName}
						{user.familyName}
					</h3>
					<form use:enhance method="POST" action="?/delete" data-sveltekit-reload>
						<input type="hidden" name="userId" value={user.id} />
						<button type="submit">Delete</button>
					</form>
				</header>

				<form method="POST" action="?/edit" data-sveltekit-reload>
					<ul>
						<li>
							<label for="email"> Email </label>
							<input type="text" id="email" name="email" value={user.email} />
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
								name="more-guests"
								checked={user.hasGuests === true}
							/>
							<label for="more-guests-yes"> Yes</label>
							<input
								type="radio"
								id="more-guests-no"
								name="more-guests"
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
		top: 10rem;
		background-color: #ded4e6;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
</style>
