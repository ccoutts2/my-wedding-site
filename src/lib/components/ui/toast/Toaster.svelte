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
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		left: 50%;
		position: fixed;
		top: 1rem;
		transform: translateX(-50%);
		z-index: 1000000;
	}
</style>
