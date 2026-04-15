import type { InputConstraint } from 'sveltekit-superforms';
import type { FullAutoFill, HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

export interface FormFieldProps extends HTMLInputAttributes {
	label: string;
	fieldName: string;
	value: string | undefined;
	errors?: string[] | undefined;
	constraints?: InputConstraint | undefined;
	autocomplete?: FullAutoFill;
	options?: string[] | boolean[] | undefined;
	required?: boolean;
	type: HTMLInputTypeAttribute;
}
