<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { quartIn, quartInOut } from 'svelte/easing';

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
		<h1>User Profile</h1>
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

				<ul>
					<li>{user.email}</li>
					<li>{user.type} guest</li>
					<li>Responded: {user.RSVP}</li>
					<li>RSVP: {user.isAccepted}</li>
					<li>
						More guests:
						{user.hasGuests}
					</li>
					<li>Dietary requirements: {user.diet}</li>
					<li>Further dietary requirements: {user.allergiesDescription}</li>
					<li>Music choice: {user.musicSelection}</li>
				</ul>
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
		background-color: red;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
</style>
