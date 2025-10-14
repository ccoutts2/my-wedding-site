<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const user = data.user;
</script>

<main
	class="UserProfile"
	in:fly={{ y: '100%', duration: 300 }}
	out:fly={{ y: '100%', duration: 300 }}
>
	{#if user}
		<h1>User Profile</h1>
		<article>
			<h3>
				{user.givenName}
				{user.familyName}
			</h3>
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

		{#if user.hasGuests}
			<h2>Guest</h2>
			{#each user.guest as guest}
				<article>
					<h3>
						{guest.givenName}
						{guest.familyName}
					</h3>
					<ul>
						<li>{guest.type} guest</li>
						<li>RSVP: {guest.isAccepted}</li>
						<li>Dietary requirements: {guest.diet}</li>
						<li>Further dietary requirements: {guest.allergiesDescription}</li>
						<li>Music choice: {guest.musicSelection}</li>
					</ul>
				</article>
			{/each}
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
