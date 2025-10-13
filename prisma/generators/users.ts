import { faker } from '@faker-js/faker';
import { Diet, Type } from './enums';

faker.seed(123);

export const users = () => {
	const rsvp = faker.datatype.boolean();
	const isAccepted = rsvp === true ? faker.datatype.boolean({ probability: 0.98 }) : false;
	const diet = isAccepted === true ? faker.helpers.enumValue(Diet) : undefined;
	const hasAllergies = isAccepted === true ? faker.datatype.boolean() : undefined;
	const type = faker.helpers.weightedArrayElement([
		{ weight: 0.95, value: Type.DAY },
		{ weight: 0.05, value: Type.NIGHT }
	]);

	return {
		email: faker.internet.email(),
		givenName: faker.person.firstName(),
		familyName: faker.person.lastName(),
		RSVP: rsvp,
		isAccepted: isAccepted,
		diet: diet,
		hasAllergies: hasAllergies,
		allergiesDescription: hasAllergies === true ? faker.food.description() : undefined,
		musicSelection: isAccepted ? faker.music.songName() : undefined,
		type: type
	};
};
