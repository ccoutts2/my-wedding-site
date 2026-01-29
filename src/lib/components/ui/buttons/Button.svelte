<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ButtonProps extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, ...props }: ButtonProps = $props();
</script>

<button class="Button" {...props}>
	{@render children?.()}
</button>

<style lang="scss">
	.Button {
		align-items: center;
		display: flex;
		background-color: #a399a8;
		border-radius: 4px;
		flex: 1;
		justify-content: center;
		width: 100%;
		min-width: 5rem;
		overflow: hidden;
		padding: 0.5rem;
		position: relative;

		&::after {
			content: '';
			align-items: center;
			background-color: #101214;
			border-radius: 4px;
			color: #a399a8 !important;
			display: flex;
			inset: 0;
			justify-content: center;
			position: absolute;
			transform-origin: top;
			transform: scaleY(0);
			transition: transform 0.55s cubic-bezier(0, 1.09, 0.83, 1);
		}

		&:hover {
			&::after {
				transform: scaleY(1);
			}
		}
	}
</style>
