<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="TextColumn">
	{@render children()}
</div>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.TextColumn > :global(*) {
		margin-bottom: 1.875rem;

		@include breakpoints.tablet {
			padding-right: 5rem;
		}
	}
</style>
