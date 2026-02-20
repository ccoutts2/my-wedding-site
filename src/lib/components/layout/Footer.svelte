<script lang="ts">
	import UserResponseCard from '../cards/UserResponseCard.svelte';
	import NavLink from '../navigation/NavLink.svelte';
	import Subtitle from '../Subtitle.svelte';

	let { data }: { data: { adminUser: boolean; user: any; page: string } } = $props();

	const { adminUser, user, page: url } = $derived(data);
</script>

<footer class="Footer">
	<section class="Footer__col">
		<Subtitle as="h3">Links</Subtitle>
		<nav>
			<ul class="Footer__navList">
				<li class="Overlay__navItem">
					<NavLink href="/" aria-current={url === '/'} active={url === '/'}>Home</NavLink>
				</li>
				<li class="Overlay__navItem">
					<NavLink href="/gallery" aria-current={url === '/gallery'} active={url === '/gallery'}
						>Gallery</NavLink
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
		<Subtitle as="h3">Contact</Subtitle>
		<p>
			If you need to get in touch about anything, you can <a href="mailto:chris.dcoutts@gmail.com"
				>email</a
			> us.
		</p>
	</section>
	<section class="Footer__col">
		<Subtitle as="h3">Your info</Subtitle>
		{#if user}
			<UserResponseCard {user} />
		{:else}
			<p>Please <a href="/rsvp">RSVP</a>.</p>
		{/if}
	</section>

	<div class="logo">
		<img
			src="https://thehoxton.com/wp-content/uploads/sites/5/2023/07/THEDI_Monogram_00_Black.png?resize=768,768"
			alt=""
		/>
	</div>
</footer>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.logo {
		width: 6.5rem;
		height: 6.5rem;
		position: absolute;
		bottom: 1rem;
		right: 1rem;

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}

	.Footer {
		border-top: 1px solid black;
		display: grid;
		gap: 3rem;
		grid-template-columns: auto;
		position: relative;

		@include breakpoints.tablet {
			grid-template-columns: repeat(12, 1fr);
		}

		&__col {
			display: flex;
			flex-direction: column;
			grid-column: span 5;
			padding: 1rem;

			&:first-of-type {
				grid-column: span 2;
			}

			@include breakpoints.tablet {
				border-left: 1px solid black;
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
