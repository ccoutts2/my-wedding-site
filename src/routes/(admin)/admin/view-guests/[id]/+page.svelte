<script lang="ts">
	import StringTune, { StringMagnetic, StringParallax } from '@fiddle-digital/string-tune';
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';

	import { quartInOut } from 'svelte/easing';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import { ChevronLeft, Pencil, Trash } from '@lucide/svelte';
	import UserCard from '$lib/components/cards/UserCard.svelte';
	import UserCardHeader from '$lib/components/cards/UserCardHeader.svelte';
	import { fa } from 'zod/v4/locales';

	let { data }: PageProps = $props();

	const { user } = data;

	onMount(() => {
		const instance = StringTune.getInstance();
		instance.use(StringParallax);
		instance.use(StringMagnetic);
		instance.start(60);
	});
</script>

<main
	class="UserProfile"
	in:fly={{ y: '100%', duration: 700, easing: quartInOut, opacity: 1 }}
	out:fly={{ y: '100%', duration: 700, easing: quartInOut, opacity: 1 }}
>
	{#if user}
		<header class="UserProfile__header">
			<h1>User Profile</h1>
			<a href="/admin/view-guests" data-sveltekit-noscroll><ChevronLeft /></a>
		</header>

		<section class="UserCards">
			<div>
				<h2>Main Guest</h2>
				<UserCard mainGuest {user}>
					<UserCardHeader
						id={user.id}
						givenName={user.givenName}
						familyName={user.familyName}
						action="?/deleteGuest"
					/>
				</UserCard>
			</div>

			{#if user.hasGuests && user.guest.length > 0}
				<ul class="UserCards__additionalGuests" role="list">
					{#each user.guest as guest, i}
						<li>
							<h2>Plus {i + 1}</h2>
							<UserCard mainGuest={false} user={guest}>
								<UserCardHeader
									id={guest.id}
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
</main>

<style lang="scss">
	@use '../../../../../lib/styles/partials/breakpoints';

	.UserProfile {
		background-color: #ded4e6;
		bottom: 0;
		left: 0;
		overflow: hidden;
		padding: 1rem;
		position: fixed;
		right: 0;
		top: 10rem;
		z-index: 10;

		&__header {
			align-items: center;
			display: flex;
			flex-direction: row-reverse;
			gap: 0.25rem;
			justify-content: flex-end;
			padding-block: 1rem;

			a {
				color: black;
			}
		}
	}

	.UserCards {
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
		}
	}
</style>
