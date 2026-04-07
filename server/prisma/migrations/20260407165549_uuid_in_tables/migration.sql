/*
  Warnings:

  - The primary key for the `image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `object` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "object" DROP CONSTRAINT "object_image_id_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_image_id_fkey";

-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_user_id_fkey";

-- AlterTable
ALTER TABLE "image" DROP CONSTRAINT "image_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "image_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "image_id_seq";

-- AlterTable
ALTER TABLE "object" DROP CONSTRAINT "object_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "image_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "object_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "object_id_seq";

-- AlterTable
ALTER TABLE "score" DROP CONSTRAINT "score_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "image_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "score_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "score_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
