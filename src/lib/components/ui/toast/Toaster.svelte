<script lang="ts">
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import Toast from './Toast.svelte';

	const toastState = getToastState();
</script>

<div class="Toaster">
	{#each toastState.toasts as toast (toast.id)}
		<Toast {toast} />
	{/each}
</div>

<style lang="scss">
	.Toaster {
		bottom: 1rem;
		display: flex;
		flex-direction: column-reverse;
		gap: 0.5rem;
		position: fixed;
		right: 1rem;
		z-index: 1000000;
	}
</style>
