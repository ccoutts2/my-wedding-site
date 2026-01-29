<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import '$lib/styles/globals.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children }: { children: Snippet } = $props();
</script>

{@render children?.()}

<style>
	/* transition */
	::view-transition-old(root),
	::view-transition-new(root) {
		animation-duration: 0.5s;
	}

	@keyframes move-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}

		to {
			opacity: 0.4;
			transform: translateY(-35%);
		}
	}

	@keyframes move-in {
		from {
			clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
		}

		to {
			clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
		}
	}

	::view-transition-old(root) {
		animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-out;
	}

	::view-transition-new(root) {
		animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-in;
	}
</style>
