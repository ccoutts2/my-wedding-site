<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<ul>
			<li>Our Story</li>
			{#if data.adminUser}
				<li>Add Guests</li>
				<li>View Guests</li>
			{:else}
				<li>RSVP</li>
			{/if}
		</ul>
	</nav>
</header>
{@render children?.()}
