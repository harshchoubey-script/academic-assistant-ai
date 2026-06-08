/*
  Warnings:

  - You are about to drop the column `answer` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `correctAnswer` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionA` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flashcard" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "answer",
DROP COLUMN "options",
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ADD COLUMN     "optionA" TEXT NOT NULL,
ADD COLUMN     "optionB" TEXT NOT NULL,
ADD COLUMN     "optionC" TEXT NOT NULL,
ADD COLUMN     "optionD" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
