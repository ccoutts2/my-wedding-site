<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/globals.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<ul>
			<li>Our Story</li>
			<li>Add Guests</li>
			<li>View Guests</li>
		</ul>
	</nav>
</header>
{@render children?.()}
