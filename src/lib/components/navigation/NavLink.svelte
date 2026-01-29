<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface NavLinkProps extends HTMLAnchorAttributes {
		active?: boolean;
		children: Snippet;
		href: string;
	}

	let { active = false, children, href, ...props }: NavLinkProps = $props();
</script>

<a class="NavLink" {href} data-is-active={active} {...props}>{@render children()}</a>

<style lang="scss">
	.NavLink {
		text-decoration: none;
		color: inherit;
		position: relative;
		display: inline-block;

		&::after {
			content: '';
			position: absolute;
			height: 1px;
			background-color: black;
			width: 100%;
			left: 0;
			bottom: -0.25rem;
			transition: transform 0.3s;
			transform: scaleX(0);
			transform-origin: left;
		}

		&:hover::after {
			transform: scaleX(1);
		}

		&[data-is-active='true']::after {
			transform: scaleX(1);
		}
	}
</style>
