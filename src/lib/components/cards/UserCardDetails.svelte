<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ul class="UserCardDetails" role="list">
	{@render children?.()}
</ul>

<style lang="scss">
	.UserCardDetails {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;

		:global(li) {
			align-items: flex-start;
			border-bottom: 1px solid black;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding-block: 0.5rem;
			width: 100%;

			:global(span) {
				font-size: 0.825rem;
			}

			:global(span:first-of-type) {
				color: grey;
				text-transform: capitalize;
			}

			:global(span:last-of-type) {
				text-transform: uppercase;
			}
		}
	}
</style>
