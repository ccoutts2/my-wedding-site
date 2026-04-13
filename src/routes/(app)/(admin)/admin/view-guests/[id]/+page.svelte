<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { quartInOut } from 'svelte/easing';
	import { ChevronLeft } from '@lucide/svelte';
	import UserCard from '$lib/components/cards/UserCard.svelte';
	import UserCardHeader from '$lib/components/cards/UserCardHeader.svelte';

	let { data }: PageProps = $props();

	const { user } = data;
</script>

<svelte:head>
	<title>Aly and Chris | View Guest Information</title>
	<meta
		name="description"
		content="View a specific guests's information, and their guest's information."
	/>
</svelte:head>

<section
	class="UserProfile"
	in:fly={{ y: '-100%', duration: 700, easing: quartInOut, opacity: 1 }}
	out:fly={{ y: '-100%', duration: 700, easing: quartInOut, opacity: 1 }}
>
	{#if user}
		<header class="UserProfile__header">
			<h1>Guest Profile</h1>
			<a href="/admin/view-guests" data-sveltekit-noscroll><ChevronLeft /></a>
		</header>

		<section class="UserCards">
			<div>
				<h2>Main Guest</h2>
				<UserCard mainGuest {user}>
					<UserCardHeader
						id={user.id}
						name="userId"
						givenName={user.givenName}
						familyName={user.familyName}
						action="?/delete"
					/>
				</UserCard>
			</div>

			{#if user.hasGuests && user.guest.length > 0}
				<ul class="UserCards__additionalGuests">
					{#each user.guest as guest, i}
						<li>
							<h2>Plus {i + 1}</h2>
							<UserCard mainGuest={false} user={guest}>
								<UserCardHeader
									id={guest.id}
									name="guestId"
									givenName={guest.givenName}
									familyName={guest.familyName}
									action="?/deleteGuest"
								/>
							</UserCard>
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

	.UserProfile {
		background-color: variables.$color--background;
		top: 0;
		left: 0;
		overflow: auto;
		padding: 1rem;
		position: fixed;
		right: 0;
		z-index: 100;

		&__header {
			align-items: center;
			display: flex;
			flex-direction: row-reverse;
			gap: 0.25rem;
			justify-content: flex-end;
			padding-block: 1rem;

			h1 {
				font-size: 1.5rem;
			}

			a {
				color: black;
			}
		}
	}

	.UserCards {
		display: flex;
		height: 65vh;
		gap: 2rem;
		overflow: auto;
		width: 100%;

		h2 {
			margin-bottom: 1rem;
			font-size: 1.25rem;
		}

		&__additionalGuests {
			display: flex;
			gap: 2rem;
			list-style: none;
		}
	}
</style>
