<script lang="ts">
	interface GridItemProps {
		col?: number;
		span?: number;
		src: string;
		alt: string;
		width: number;
		height: number;
	}

	let { col, span, width, height, src, alt }: GridItemProps = $props();

	const aspectRatio = `${width} / ${height}`;
</script>

<figure class="GridItem" style:--col={col} style:--span={span} style:aspect-ratio={aspectRatio}>
	<img {src} {alt} {width} {height} />
</figure>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.GridItem {
		margin: 0;
		position: relative;
		grid-column: 1 / -1;

		@include breakpoints.tablet {
			grid-column: var(--col) / span var(--span);
		}

		img {
			position: absolute;
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
