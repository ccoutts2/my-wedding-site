<script lang="ts">
	import { page } from '$app/state';
	import BurgerButton from '../ui/buttons/BurgerButton.svelte';
	import NavLink from './NavLink.svelte';

	interface HeaderProps {
		data: {
			adminUser: boolean;
		};
		url: string;
	}

	let { data, url }: HeaderProps = $props();
</script>

<header class="Header">
	<nav>
		<ul class="Header__navList">
			<li>
				<NavLink href="/our-story" aria-current={url === '/our-story'} active={url === '/our-story'}
					>Our Story</NavLink
				>
			</li>
			{#if data.adminUser}
				<li>
					<NavLink
						href="/admin/add-guests"
						aria-current={url === '/admin/add-guests'}
						active={url === '/admin/add-guests'}
						>Add Guests
					</NavLink>
				</li>

				<li>
					<NavLink
						href="/admin/view-guests"
						aria-current={url === '/admin/view-guests'}
						active={url === '/admin/view-guests'}
						>View Guests
					</NavLink>
				</li>
			{:else}
				<li>
					<NavLink href="/rsvp" aria-current={url === '/rsvp'} active={url === '/rsvp'}
						>RSVP</NavLink
					>
				</li>
			{/if}
		</ul>
	</nav>
	<BurgerButton />
</header>

<style lang="scss">
	.Header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem;

		&__navList {
			align-items: center;
			display: flex;
			gap: 1rem;
			list-style: none;
			view-transition-name: header;
		}
	}
</style>
