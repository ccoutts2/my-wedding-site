-- CreateEnum
CREATE TYPE "DietaryOptions" AS ENUM ('MEAT', 'VEGETARIAN', 'VEGAN');

-- CreateEnum
CREATE TYPE "GuestType" AS ENUM ('DAY', 'NIGHT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "hasGuests" BOOLEAN NOT NULL,
    "RSVP" BOOLEAN NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "diet" "DietaryOptions",
    "hasAllergies" BOOLEAN,
    "allergiesDescription" TEXT,
    "musicSelection" TEXT NOT NULL,
    "type" "GuestType" NOT NULL DEFAULT 'DAY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "diet" "DietaryOptions",
    "hasAllergies" BOOLEAN,
    "allergiesDescription" TEXT,
    "musicSelection" TEXT NOT NULL,
    "type" "GuestType" NOT NULL DEFAULT 'DAY',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
