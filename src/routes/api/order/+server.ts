import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  console.log("Recieved order: ", data);

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type" : "application/json" }
  });
};

//
//validation logic here
//

