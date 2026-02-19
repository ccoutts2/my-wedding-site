export interface Assets {
	id: number;
	src: string;
	alt: string;
	width: number;
	height: number;
}

const BASE_URL =
	'https://hinrakjrdbrmrrvilpbg.supabase.co/storage/v1/object/public/portfolio/my-wedding/';

export const assetsConfig: Assets[] = [
	{ id: 1, src: `${BASE_URL}image001.avif`, alt: '', width: 579, height: 772 },
	{ id: 2, src: `${BASE_URL}image002.avif`, alt: '', width: 756, height: 1008 },
	{ id: 3, src: `${BASE_URL}image003.avif`, alt: '', width: 1008, height: 756 },
	{ id: 4, src: `${BASE_URL}image004.avif`, alt: '', width: 579, height: 772 },
	{ id: 5, src: `${BASE_URL}image005.avif`, alt: '', width: 579, height: 772 },
	{ id: 6, src: `${BASE_URL}image006.avif`, alt: '', width: 1008, height: 756 },
	{ id: 7, src: `${BASE_URL}image007.avif`, alt: '', width: 1008, height: 756 },
	{ id: 8, src: `${BASE_URL}image008.avif`, alt: '', width: 756, height: 1008 },
	{ id: 9, src: `${BASE_URL}image009.avif`, alt: '', width: 720, height: 900 },
	{ id: 10, src: `${BASE_URL}image010.avif`, alt: '', width: 579, height: 772 },
	{ id: 11, src: `${BASE_URL}image011.avif`, alt: '', width: 579, height: 772 },
	{ id: 12, src: `${BASE_URL}image012.avif`, alt: '', width: 756, height: 1008 },
	{ id: 13, src: `${BASE_URL}image013.avif`, alt: '', width: 720, height: 900 },
	{ id: 14, src: `${BASE_URL}image014.avif`, alt: '', width: 1008, height: 756 },
	{ id: 15, src: `${BASE_URL}image015.avif`, alt: '', width: 579, height: 772 },
	{ id: 16, src: `${BASE_URL}image016.avif`, alt: '', width: 720, height: 900 },
	{ id: 17, src: `${BASE_URL}image017.avif`, alt: '', width: 720, height: 900 },
	{ id: 18, src: `${BASE_URL}image018.avif`, alt: '', width: 756, height: 1008 },
	{ id: 19, src: `${BASE_URL}image019.avif`, alt: '', width: 1008, height: 756 },
	{ id: 20, src: `${BASE_URL}image020.avif`, alt: '', width: 756, height: 1008 },
	{ id: 21, src: `${BASE_URL}image021.avif`, alt: '', width: 756, height: 1008 },
	{ id: 22, src: `${BASE_URL}image022.avif`, alt: '', width: 756, height: 1008 },
	{ id: 23, src: `${BASE_URL}image023.avif`, alt: '', width: 756, height: 1008 },
	{ id: 24, src: `${BASE_URL}image024.avif`, alt: '', width: 756, height: 1008 },
	{ id: 25, src: `${BASE_URL}image025.avif`, alt: '', width: 579, height: 772 },
	{ id: 26, src: `${BASE_URL}image026.avif`, alt: '', width: 1008, height: 756 },
	{ id: 27, src: `${BASE_URL}image027.avif`, alt: '', width: 756, height: 1008 },
	{ id: 28, src: `${BASE_URL}image028.avif`, alt: '', width: 1008, height: 756 },
	{ id: 29, src: `${BASE_URL}image029.avif`, alt: '', width: 756, height: 1008 },
	{ id: 30, src: `${BASE_URL}image030.avif`, alt: '', width: 579, height: 772 },
	{ id: 31, src: `${BASE_URL}image031.avif`, alt: '', width: 788, height: 1050 }
];
