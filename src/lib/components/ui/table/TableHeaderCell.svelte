<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Scope } from './types';

	let { scope, children }: { scope: Scope; children: Snippet } = $props();
</script>

<th class="TableHeaderCell" {scope}>
	{@render children()}
</th>

<style lang="scss">
	.TableHeaderCell[scope='col'] {
		font-size: 0.875rem;
		font-weight: 600;
		padding: 1rem 1.5rem;
		text-align: left;
	}

	.TableHeaderCell[scope='row'] {
		color: #1a1a1a;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 1rem 1.5rem;
		text-align: left;
	}
</style>
