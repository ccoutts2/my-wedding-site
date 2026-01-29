<script lang="ts">
	import BurgerButton from '../ui/buttons/BurgerButton.svelte';

	interface HeaderProps {
		data: {
			adminUser: boolean;
		};
	}

	let { data }: HeaderProps = $props();
</script>

<header class="Header">
	<nav>
		<ul class="Header__navList">
			<li><a href="/our-story">Our Story</a></li>
			{#if data.adminUser}
				<li><a href="/add-guests">Add Guests</a></li>

				<li><a href="/view-guests">View Guests</a></li>
			{:else}
				<li><a href="/rsvp">RSVP</a></li>
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
		}
	}
</style>
