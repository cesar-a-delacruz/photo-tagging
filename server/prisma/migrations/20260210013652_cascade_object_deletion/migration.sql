-- DropForeignKey
ALTER TABLE "object" DROP CONSTRAINT "object_image_id_fkey";

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
