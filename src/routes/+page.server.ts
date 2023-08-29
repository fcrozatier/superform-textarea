import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

// const normalize = (text: string) => text.replaceAll('\r\n', '\n');

const schema = z.object({
	name: z.string().default('John'),
	email: z.string().email().default('john@gmail.com'),
	bio: z.string().max(5) // this won't work with new lines
	// bio: z.string().refine(
	// 	(str) => {
	// 		return str.length - (str.match(/\r\n/g) ?? []).length <= 5;
	// 	},
	// 	{
	// 		message: 'Bio too long'
	// 	}
	// ) // One has to take into account the \r characters added by the new line normalization, as per html specs
	// bio: z.string().transform(normalize).pipe(z.string().max(5)) // Alternative hack, but removes \r, still some boilerplate for a maxlength, and does not fully work on Safari
	// https://github.com/mdn/browser-compat-data/issues/11988
	// https://bugs.webkit.org/show_bug.cgi?id=154342
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
