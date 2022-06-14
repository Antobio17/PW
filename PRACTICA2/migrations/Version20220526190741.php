<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220526190741 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment ADD exhibition_id INT NOT NULL, ADD image_file_id INT NOT NULL, ADD text LONGTEXT NOT NULL, ADD comment_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C2A7D4494 FOREIGN KEY (exhibition_id) REFERENCES exhibition (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C6DB2EB0 FOREIGN KEY (image_file_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9474526C2A7D4494 ON comment (exhibition_id)');
        $this->addSql('CREATE INDEX IDX_9474526C6DB2EB0 ON comment (image_file_id)');
        $this->addSql('ALTER TABLE exhibition ADD room VARCHAR(10) NOT NULL, ADD description LONGTEXT NOT NULL, CHANGE author author VARCHAR(512) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C2A7D4494');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C6DB2EB0');
        $this->addSql('DROP INDEX IDX_9474526C2A7D4494 ON comment');
        $this->addSql('DROP INDEX IDX_9474526C6DB2EB0 ON comment');
        $this->addSql('ALTER TABLE comment DROP exhibition_id, DROP image_file_id, DROP text, DROP comment_at');
        $this->addSql('ALTER TABLE exhibition DROP room, DROP description, CHANGE author author VARCHAR(1024) NOT NULL');
    }
}
