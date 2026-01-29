<script lang="ts">
	import BurgerButton from '../ui/buttons/BurgerButton.svelte';

	let { data } = $props();
</script>

<header class="Header">
	<nav>
		<ul class="Header__navList">
			<li>Our Story</li>
			{#if data.adminUser}
				<li>Add Guests</li>
				<li>View Guests</li>
			{:else}
				<li>RSVP</li>
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
