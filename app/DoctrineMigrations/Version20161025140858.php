<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20161025140858 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('SET GLOBAL FOREIGN_KEY_CHECKS = 0');
        $this->addSql('ALTER TABLE success_story CHANGE goal_id goal_id INT NOT NULL, CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE place CHANGE place_type_id place_type_id INT NOT NULL');
        $this->addSql('ALTER TABLE category CHANGE title title VARCHAR(25) NOT NULL, CHANGE slug slug VARCHAR(25) NOT NULL, CHANGE file_original_name file_original_name VARCHAR(160) DEFAULT NULL, CHANGE file_name file_name VARCHAR(70) DEFAULT NULL');
        $this->addSql('ALTER TABLE category_translations CHANGE object_id object_id INT NOT NULL');
        $this->addSql('ALTER TABLE page_translations CHANGE object_id object_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_place CHANGE user_id user_id INT NOT NULL, CHANGE place_id place_id INT NOT NULL');
        $this->addSql('ALTER TABLE match_user CHANGE user_id user_id INT NOT NULL, CHANGE match_user_id match_user_id INT NOT NULL');
        $this->addSql('ALTER TABLE report CHANGE user_id user_id INT NOT NULL, CHANGE reported_user_id reported_user_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment CHANGE thread_id thread_id VARCHAR(255) NOT NULL, CHANGE author_id author_id INT NOT NULL');
        $this->addSql('ALTER TABLE affiliate CHANGE affiliate_type_id affiliate_type_id INT NOT NULL');
        $this->addSql('SET GLOBAL FOREIGN_KEY_CHECKS = 1');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE affiliate CHANGE affiliate_type_id affiliate_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category CHANGE title title VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE slug slug VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE file_original_name file_original_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE file_name file_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE category_translations CHANGE object_id object_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE comment CHANGE thread_id thread_id VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE author_id author_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE match_user CHANGE user_id user_id INT DEFAULT NULL, CHANGE match_user_id match_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE page_translations CHANGE object_id object_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE place CHANGE place_type_id place_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE report CHANGE user_id user_id INT DEFAULT NULL, CHANGE reported_user_id reported_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE success_story CHANGE goal_id goal_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_place CHANGE place_id place_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
    }
}
