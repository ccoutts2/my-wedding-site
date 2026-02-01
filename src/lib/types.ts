// Context Type
export interface OverlayProps {
	isMenuOpen: boolean;
}

// Table Type
export type Sorting = {
	orderBy: string;
	ascending: boolean;
};

// Toast State
export type Toast = {
	id: string;
	title: string;
	message: string;
	toastStatus: ToastStatus;
};

export type ToastStatus = 'success' | 'error' | 'invalid' | 'info';
