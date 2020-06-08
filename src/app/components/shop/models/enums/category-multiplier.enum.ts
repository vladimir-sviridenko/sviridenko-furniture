interface ICategoryMultiplier {
	'1': number;
	'2': number;
	'3': number;
	'4': number;
}

export const CategoryMultiplier: ICategoryMultiplier = {
	1: 0,
	2: 0.2,
	3: 0.3,
	4: 0.4,
};

Object.freeze(CategoryMultiplier);
