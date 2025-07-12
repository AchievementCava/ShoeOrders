-- CreateTable
CREATE TABLE "User" (
    "ic" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ic")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,
    "postTown" TEXT NOT NULL,
    "State" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "colour" TEXT NOT NULL,
    "size" DECIMAL(3,1) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("ic") ON DELETE RESTRICT ON UPDATE CASCADE;
