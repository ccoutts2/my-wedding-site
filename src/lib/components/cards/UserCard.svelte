<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import UserCardHeader from './UserCardHeader.svelte';

	interface UserCardProps {
		id: string | number;
		givenName: string;
		familyName: string;
		type: string;
		isAccepted: boolean | string;
		diet?: string | null;
		allergiesDescription?: string | null;
		musicSelection?: string | null;
		email?: string;
		RSVP?: boolean | string;
		hasGuests?: boolean | string;
		userId?: string;
	}

	let {
		children,
		mainGuest,
		user
	}: { children: Snippet; mainGuest: boolean; user: UserCardProps } = $props();
</script>

<article class="UserCard">
	{@render children?.()}

	<ul class="UserCard__userDetails" role="list">
		{#if mainGuest}
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
		{:else}
			<li>
				<span>Type of Guest</span>
				<span>{user.type}</span>
			</li>
			<li>
				<span>RSVP</span>
				<span>{user.isAccepted}</span>
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
		{/if}
	</ul>
</article>

<style lang="scss">
	.UserCard {
		border-radius: 0.5rem;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		min-width: 20rem;
		max-width: 35rem;

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
