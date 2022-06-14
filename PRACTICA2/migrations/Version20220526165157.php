<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220526165157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE exhibition (id INT AUTO_INCREMENT NOT NULL, image_file_id INT NOT NULL, author VARCHAR(1024) NOT NULL, start_at DATETIME NOT NULL, name VARCHAR(512) NOT NULL, UNIQUE INDEX UNIQ_B83533895E237E06 (name), INDEX IDX_B83533896DB2EB0 (image_file_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image_file (id INT AUTO_INCREMENT NOT NULL, src VARCHAR(512) NOT NULL, width INT DEFAULT 0 NOT NULL, height INT DEFAULT 0 NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE piece (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(512) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, roles JSON NOT NULL, email VARCHAR(512) NOT NULL, password VARCHAR(512) NOT NULL, surname VARCHAR(1024) NOT NULL, name VARCHAR(1024) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE exhibition ADD CONSTRAINT FK_B83533896DB2EB0 FOREIGN KEY (image_file_id) REFERENCES image_file (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exhibition DROP FOREIGN KEY FK_B83533896DB2EB0');
        $this->addSql('DROP TABLE exhibition');
        $this->addSql('DROP TABLE image_file');
        $this->addSql('DROP TABLE piece');
        $this->addSql('DROP TABLE user');
    }
}
