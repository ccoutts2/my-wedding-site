<script lang="ts">
	import type { Snippet } from 'svelte';

	let { header, children, state }: { header?: Snippet; children: Snippet; state: string } =
		$props();
</script>

<section class="Section" data-state={state}>
	{@render header?.()}

	{@render children?.()}
</section>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Section {
		display: flex;
		flex-direction: column;
		padding: 3.125rem 1rem 1rem;

		@include breakpoints.laptop {
			padding-block: 6.25rem 2rem 2rem;
		}

		&[data-state='centered'] {
			margin: 0 auto 3.125rem;
			max-width: 37.5rem;

			@include breakpoints.tablet {
				margin-bottom: 6.25rem;
			}
		}

		&[data-state='right-aligned'] {
			margin-left: 0;

			@include breakpoints.tablet {
				margin-left: 34vw;
			}
		}

		&[data-state='left-aligned'] {
			margin-right: 0;

			@include breakpoints.tablet {
				margin-right: 34vw;
			}
		}
	}
</style>
