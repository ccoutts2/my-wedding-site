<script lang="ts">
	import type { Snippet } from 'svelte';
	import TableFilter from './TableFilter.svelte';
	import TableHeaderCell from './TableHeaderCell.svelte';
	import TableRow from './TableRow.svelte';

	interface TableProps {
		children: Snippet;
		caption: string;
	}

	let { children, caption }: TableProps = $props();
</script>

<div class="Table">
	<table class="Table__table">
		<caption class="visually-hidden">{caption}</caption>
		{@render children()}
	</table>
</div>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Table {
		overflow-x: auto;

		&__table {
			border-collapse: collapse;
			margin-bottom: 50vh;
			width: 100%;
		}

		:global(tbody tr + tr) {
			border-top: 1px solid #f0f0f0;
		}

		:global(td) {
			padding: 1rem 1.5rem;
			color: #666;
			font-size: 0.875rem;
		}
	}
</style>
