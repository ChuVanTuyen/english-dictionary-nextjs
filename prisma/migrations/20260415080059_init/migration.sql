-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `birthDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `words` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(255) NOT NULL,
    `pronounce` VARCHAR(255) NULL,

    UNIQUE INDEX `words_word_key`(`word`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `synonyms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `synonym` VARCHAR(255) NOT NULL,
    `word_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `antonyms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `antonym` VARCHAR(255) NOT NULL,
    `word_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_words` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kind` VARCHAR(100) NOT NULL,
    `word_id` INTEGER NOT NULL,
    `kind_content_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kind_contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `means` TEXT NOT NULL,
    `content_word_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examples` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `example` TEXT NOT NULL,
    `mean` TEXT NOT NULL,
    `kind_content_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `idioms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idiom` TEXT NOT NULL,
    `mean` TEXT NOT NULL,
    `content_word_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `synonyms` ADD CONSTRAINT `synonyms_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `antonyms` ADD CONSTRAINT `antonyms_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_words` ADD CONSTRAINT `content_words_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kind_contents` ADD CONSTRAINT `kind_contents_content_word_id_fkey` FOREIGN KEY (`content_word_id`) REFERENCES `content_words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examples` ADD CONSTRAINT `examples_kind_content_id_fkey` FOREIGN KEY (`kind_content_id`) REFERENCES `kind_contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `idioms` ADD CONSTRAINT `idioms_content_word_id_fkey` FOREIGN KEY (`content_word_id`) REFERENCES `content_words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
