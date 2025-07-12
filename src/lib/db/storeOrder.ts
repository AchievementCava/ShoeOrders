import { PrismaClient } from "@prisma/client";
import {RequestPayload } from "$lib/types/RequestPayload"
const prisma = new PrismaClient();

export async function storeOrder(order: OrderPayload) {
    
  // Create user if not exists
  console.log(JSON.stringify(order));
  console.log(order.ic_no);
  //
    try {
    // Step 1: Check if user already exists
    let user = await prisma.user.findUnique({
      where: { ic: order.ic_no },
    });

    if (!user) {
      // Step 2: Create address
      const address = await prisma.address.create({
        data: {
          street: order.street,
          postcode: order.postcode,
          postTown: order.town,
          state: order.state,
        },
      });

      // Step 3: Create user
      user = await prisma.user.create({
        data: {
          ic: order.ic_no,
          name: order.name,
          tel: order.phone,
          club: order.club,
          addressId: address.id,
        },
      });
    }

    // Step 4: Create all orders in a transaction
    await prisma.$transaction(
      order.shoes.map((shoe) =>
        prisma.orders.create({
          data: {
            productId: shoe.id,
            colour: shoe.colour,
            size: shoe.size,
            quantity: shoe.quantity,
            userId: user!.ic, // user.IC must exist now
          },
        })
      )
    );

    return true;

  } catch (error) {
    console.log(error)
    return false;
  }
}

