<script lang="ts">
	import { CircleArrowLeft, CircleArrowRight } from '@lucide/svelte';
	import { page } from '$app/state';

	interface PaginationProps {
		currentPage: number;
		totalPages: number;
	}

	let { currentPage, totalPages }: PaginationProps = $props();

	const getPageUrl = (pageNum: number): string => {
		const url = new URL(page.url);
		url.searchParams.set('p', pageNum.toString());
		return url.pathname + url.search;
	};
</script>

<ul class="Pagination">
	<li class="Pagination__item" data-is-arrow="true">
		{#if currentPage === 1}
			<span class="disabled" aria-disabled="true"><CircleArrowLeft /></span>
		{:else}
			<a href={getPageUrl(currentPage - 1)}><CircleArrowLeft /></a>
		{/if}
	</li>
	{#each Array(totalPages) as _, i}
		<li class="Pagination__item {currentPage === i + 1 ? 'active' : ''}" data-is-arrow="false">
			<a href={getPageUrl(i + 1)}>{i + 1}</a>
		</li>
	{/each}
	<li class="Pagination__item" data-is-arrow="true">
		{#if currentPage === totalPages}
			<span class="disabled" aria-disabled="true"><CircleArrowRight /></span>
		{:else}
			<a href={getPageUrl(currentPage + 1)}><CircleArrowRight /></a>
		{/if}
	</li>
</ul>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Pagination {
		align-items: center;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		list-style: none;
		margin: 0 auto;

		&__item {
			align-items: center;
			display: flex;
			justify-content: center;
			position: relative;
			width: 100%;

			&[data-is-arrow='false'] {
				background-color: transparent;
				border-radius: 8px;
				box-shadow: none;
				color: variables.$color--button-text;
				padding: 0.5rem 0.75rem;
				transition: background-color 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

				&:hover {
					box-shadow: 0px 1px 2px dimgray;
				}

				&.active {
					background-color: variables.$color--button;
				}
			}

			a {
				color: currentColor;
				text-decoration: none;

				&::after {
					content: '';
					inset: 0;
					position: absolute;
				}
			}
		}
	}

	.disabled {
		color: grey;
		cursor: default;
		pointer-events: none;
		text-decoration: none;
	}
</style>
