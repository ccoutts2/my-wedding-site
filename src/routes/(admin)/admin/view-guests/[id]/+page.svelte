<script lang="ts">
	import StringTune, { StringMagnetic, StringParallax } from '@fiddle-digital/string-tune';
	import { fly } from 'svelte/transition';
	import type { PageProps } from './$types';

	import { quartInOut } from 'svelte/easing';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import { ChevronLeft, Pencil, Trash } from '@lucide/svelte';

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

		<div class="UserCards">
			<section>
				<h2>Main Guest</h2>
				<article class="UserCard">
					<header class="UserCard__header">
						<h3>
							{user.givenName}
							{user.familyName}
						</h3>
						<ul class="UserCard__headerButtons" role="list">
							<menu>
								<form use:enhance method="POST" action="?/delete" data-sveltekit-reload>
									<input type="hidden" name="userId" value={user.id} />
									<button
										type="submit"
										onclick={(e) =>
											!confirm(
												`Are you sure you want to delete ${user.givenName} ${user.familyName}?`
											) && e.preventDefault()}><Trash /></button
									>
								</form>
							</menu>
							<li>
								<a href="/admin/view-guests/{user.id}/edit"><Pencil /></a>
							</li>
						</ul>
					</header>

					<ul class="UserCard__userDetails" role="list">
						<li>
							<span>Email </span>
							<span>{user.email} </span>
						</li>

						<li>
							<span>Type of Guest</span>
							<span>{user.type}</span>
						</li>
						<li>
							<span>Responded</span>
							<span>{user.RSVP}</span>
						</li>
						<li>
							<span>RSVP</span>
							<span>{user.isAccepted}</span>
						</li>
						<li>
							<span>More guests</span>
							<span>{user.hasGuests}</span>
						</li>

						<li>
							<span>Dietary requirements </span>
							<span>{user.diet} </span>
						</li>
						<li>
							<span>Further dietary requirements </span>
							<span>{user.allergiesDescription} </span>
						</li>
						<li>
							<span>Music choice </span>
							<span>{user.musicSelection} </span>
						</li>
					</ul>
				</article>
			</section>

			{#if user.hasGuests && user.guest.length > 0}
				<section>
					<ul class="UserCards__additionalGuests" role="list">
						{#each user.guest as { id, givenName, familyName, type, isAccepted, diet, allergiesDescription, musicSelection }, i}
							<li>
								<h2>Plus {i + 1}</h2>
								<article class="UserCard">
									<header class="UserCard__header">
										<h3>
											{givenName}
											{familyName}
										</h3>
										<menu class="UserCard__headerButtons">
											<li>
												<form
													use:enhance
													method="POST"
													action="?/deleteGuest"
													data-sveltekit-reload
												>
													<input type="hidden" name="guestId" value={id} />
													<button
														type="submit"
														onclick={(e) =>
															!confirm(
																`Are you sure you want to delete ${givenName} ${familyName}?`
															) && e.preventDefault()}><Trash /></button
													>
												</form>
											</li>
											<li>
												<a href="/admin/view-guests/{user.id}/edit"><Pencil /></a>
											</li>
										</menu>
									</header>

									<ul class="UserCard__userDetails" role="list">
										<li>
											<span>Type of Guest</span>
											<span>{type}</span>
										</li>
										<li>
											<span>RSVP</span>
											<span>{isAccepted}</span>
										</li>

										<li>
											<span>Dietary requirements </span>
											<span>{diet} </span>
										</li>
										<li>
											<span>Further dietary requirements </span>
											<span>{allergiesDescription} </span>
										</li>
										<li>
											<span>Music choice </span>
											<span>{musicSelection} </span>
										</li>
									</ul>
								</article>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>
	{:else}
		<p>User not found.</p>
	{/if}
</main>

<style lang="scss">
	@use '../../../../../lib/styles/partials/breakpoints';

	.UserProfile {
		position: fixed;
		z-index: 10;
		top: 10rem;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ded4e6;
		overflow: hidden;

		&__header {
			display: flex;
			flex-direction: row-reverse;
			gap: 0.25rem;
			justify-content: flex-end;
			align-items: center;
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

		&__additionalGuests {
			display: flex;
			gap: 2rem;
		}
	}
	.UserCard {
		border-radius: 0.5rem;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		min-width: 20rem;
		max-width: 35rem;

		&__header {
			align-items: center;
			display: flex;
			gap: 3rem;
			justify-content: space-between;
		}

		&__headerButtons {
			display: flex;
			gap: 0.5rem;

			button {
				background-color: inherit;
			}

			a {
				color: inherit;
			}
		}

		&__userDetails {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 100%;

			li {
				align-items: flex-start;
				border-bottom: 1px solid black;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				padding-block: 0.5rem;
				width: 100%;

				span {
					font-size: 0.825rem;
				}

				span:first-of-type {
					color: grey;
					text-transform: capitalize;
				}

				span:last-of-type {
					text-transform: uppercase;
				}
			}
		}
	}
</style>
