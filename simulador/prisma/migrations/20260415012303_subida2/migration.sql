-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "character1Id" INTEGER NOT NULL,
    "character2Id" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,
    "turns" INTEGER NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);
