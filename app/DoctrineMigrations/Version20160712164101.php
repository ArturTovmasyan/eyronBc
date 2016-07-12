<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160712164101 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('UPDATE thread as t SET t.commentable_entity_id = t.id WHERE EXISTS (SELECT * FROM goal as g WHERE g.id = t.id)');
        $this->addSql('UPDATE thread as t SET t.num_comments = (SELECT COUNT(*) FROM comment as c WHERE c.thread_id = t.id)');
        $this->addSql('DELETE FROM comment WHERE thread_id IN (SELECT id FROM thread WHERE commentable_entity_id IS NULL)');
        $this->addSql('DELETE FROM thread WHERE commentable_entity_id IS NULL');
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
