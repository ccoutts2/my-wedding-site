import { faker } from '@faker-js/faker';
import { Diet, Type } from './enums';

faker.seed(123);

export const guests = (userId: string) => {
	const isAccepted = faker.datatype.boolean({ probability: 0.98 });
	const hasAllergies = isAccepted ? faker.datatype.boolean() : undefined;

	return {
		givenName: faker.person.firstName(),
		familyName: faker.person.lastName(),
		isAccepted: faker.datatype.boolean({ probability: 0.98 }),
		diet: isAccepted ? faker.helpers.enumValue(Diet) : undefined,
		hasAllergies: hasAllergies,
		allergiesDescription: hasAllergies === true ? faker.food.description() : undefined,
		musicSelection: isAccepted ? faker.music.songName() : undefined,
		type: faker.helpers.enumValue(Type),
		userId: userId
	};
};
