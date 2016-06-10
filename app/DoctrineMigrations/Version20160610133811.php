<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160610133811 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('ALTER TABLE goal ADD FULLTEXT fulltext_index(title, description)');
        $this->addSql('ALTER TABLE goal ADD FULLTEXT fulltext_index_title(title)');
        $this->addSql('ALTER TABLE goal ADD FULLTEXT fulltext_index_description(description)');
        // this up() migration is auto-generated, please modify it to your needs

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
