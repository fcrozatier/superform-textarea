import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().default('Hello world!'),
	email: z.string().email().optional(),
	bio: z.string().max(5) // this won't work with new lines
	// bio: z.string().refine(
	// 	(str) => {
	// 		return str.length - (str.match(/\r\n/g) ?? []).length <= 5;
	// 	},
	// 	{
	// 		message: 'Bio too long'
	// 	}
	// ) // One has to take into account the \r characters added by the new line normalization, as per html specs
});

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
