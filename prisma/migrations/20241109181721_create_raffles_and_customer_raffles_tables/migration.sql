-- CreateTable
CREATE TABLE "raffles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raffles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_raffles" (
    "id" TEXT NOT NULL,
    "has_won" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,
    "raffle_id" TEXT NOT NULL,

    CONSTRAINT "customer_raffles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_raffles" ADD CONSTRAINT "customer_raffles_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_raffles" ADD CONSTRAINT "customer_raffles_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
