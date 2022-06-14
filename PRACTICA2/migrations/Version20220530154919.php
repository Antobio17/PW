<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530154919 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piece ADD exhibition_id INT NOT NULL');
        $this->addSql('ALTER TABLE piece ADD CONSTRAINT FK_44CA0B232A7D4494 FOREIGN KEY (exhibition_id) REFERENCES exhibition (id)');
        $this->addSql('CREATE INDEX IDX_44CA0B232A7D4494 ON piece (exhibition_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piece DROP FOREIGN KEY FK_44CA0B232A7D4494');
        $this->addSql('DROP INDEX IDX_44CA0B232A7D4494 ON piece');
        $this->addSql('ALTER TABLE piece DROP exhibition_id');
    }
}
