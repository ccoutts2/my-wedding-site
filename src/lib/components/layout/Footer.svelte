<script lang="ts">
	import UserResponseCard from '../cards/UserResponseCard.svelte';
	import NavLink from '../navigation/NavLink.svelte';
	import Subtitle from '../Subtitle.svelte';

	let { data }: { data: { adminUser: boolean; user: any; page: string } } = $props();

	const { adminUser, user, page: url } = $derived(data);
</script>

<footer class="Footer">
	<section class="Footer__col">
		<Subtitle as="h4">Links</Subtitle>
		<nav>
			<ul class="Footer__navList">
				<li class="Overlay__navItem">
					<NavLink href="/" aria-current={url === '/'} active={url === '/'}>Home</NavLink>
				</li>
				<li class="Overlay__navItem">
					<NavLink
						href="/our-story"
						aria-current={url === '/our-story'}
						active={url === '/our-story'}>Our Story</NavLink
					>
				</li>
				<li class="Overlay__navItem">
					<NavLink href="/rsvp" aria-current={url === '/rsvp'} active={url === '/rsvp'}
						>RSVP</NavLink
					>
				</li>
				<li class="Overlay__navItem">
					<NavLink href="/q&a" aria-current={url === '/q&a'} active={url === '/q&a'}>Q & A</NavLink>
				</li>
			</ul>
		</nav>
	</section>
	<section class="Footer__col">
		<Subtitle as="h4">Contact</Subtitle>
		<p>
			If you need to get in touch about anything, you can <a href="mailto:chris.dcoutts@gmail.com"
				>email</a
			> us.
		</p>
	</section>
	<section class="Footer__col">
		<Subtitle as="h4">Your info</Subtitle>
		{#if user}
			<UserResponseCard {user} />
		{:else}
			<p>Please <a href="/rsvp">RSVP</a>.</p>
		{/if}
	</section>
</footer>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Footer {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 3rem;
		padding: 1rem;
		border-top: 1px solid black;

		@include breakpoints.tablet {
			grid-template-columns: repeat(12, 1fr);
		}

		&__col {
			display: flex;
			flex-direction: column;
			grid-column: span 5;

			&:first-of-type {
				grid-column: span 2;
			}
		}

		&__navList {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			list-style: none;
		}
	}
</style>
