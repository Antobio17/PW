<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530160004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piece ADD image_file_id INT NOT NULL, ADD author VARCHAR(512) NOT NULL, ADD description LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE piece ADD CONSTRAINT FK_44CA0B236DB2EB0 FOREIGN KEY (image_file_id) REFERENCES image_file (id)');
        $this->addSql('CREATE INDEX IDX_44CA0B236DB2EB0 ON piece (image_file_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piece DROP FOREIGN KEY FK_44CA0B236DB2EB0');
        $this->addSql('DROP INDEX IDX_44CA0B236DB2EB0 ON piece');
        $this->addSql('ALTER TABLE piece DROP image_file_id, DROP author, DROP description');
    }
}
