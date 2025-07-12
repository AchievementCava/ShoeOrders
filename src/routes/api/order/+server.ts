import type { RequestHandler } from './$types';
import { states } from '$lib/types/State';
import { orderDataValid, formDataValid } from '$lib/validation/orderForm';
import { OrderPayload } from '$lib/types/RequestPayload';
import { validateIC, IC } from '$lib/types/IC';
import { storeOrder } from '$lib/db/storeOrder';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	console.log('Recieved order: ', data);

	// validate inputs
	const nameValid: boolean = data['name'].length > 2;

  let ic: IC | null = null;
  
  try {
    ic = new IC(data['ic_no']);
  } catch(e) {
    console.log("IC fail " + e + '\n' + JSON.stringify(data, null, 2));
    return new Response(
        JSON.stringify({ error: 'IC data was not valid!' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
      );
     } finally {
    if (ic === null) {
      return new Response(
        JSON.stringify({ error: 'IC data was not valid!' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
      );
    } 
  }
  
  const telRegEx: RegExp = /^01[0-9][ \-]?[0-9]{7,8}$/;
	const telValid: boolean = telRegEx.test(data['phone']);

	const postcodeValid: boolean =
		Number(data['postcode']) > 10000 && Number(data['postcode']) < 99999;

	const postTownValid: boolean = data['town'].length > 2;
	// Sik is the shortest town name we can think of

	const ordersValid: boolean = orderDataValid(data["shoes"]);

	const stateValid: boolean = states.includes(data['state']);

	if (formDataValid(data["name"], data["phone"], data["state"], data["shoes"])) {
		// form data valid     

    if (await storeOrder(data as OrderPayload)) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // DB failed
      return new error(500, {
        message: "Our database has failed!"
      });
    }
	
  } else {
		// fuckup should really have been handled at this point
		return new error(400, {
			message: 'Malformed or invalid request'
		});
	}
};
