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
		color: inherit;
		display: inline-block;
		position: relative;
		text-decoration: none;

		&::after {
			content: '';
			background-color: black;
			bottom: -0.25rem;
			height: 1px;
			left: 0;
			position: absolute;
			transform-origin: left;
			transform: scaleX(0);
			transition: transform 0.3s;
			width: 100%;
		}

		&:hover::after {
			transform: scaleX(1);
		}

		&[data-is-active='true']::after {
			transform: scaleX(1);
		}
	}
</style>
