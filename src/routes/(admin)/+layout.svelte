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
			<li><a href="/our-story">Our Story</a></li>
			<li><a href="/admin/add-guests">Add Guests</a></li>
			<li><a href="/admin/view-guests">View Guests</a></li>
		</ul>
	</nav>
</header>
{@render children?.()}
