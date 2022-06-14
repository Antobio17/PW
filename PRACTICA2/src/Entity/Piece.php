<?php

namespace App\Entity;

use App\Entity\Traits\NameTrait;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PieceRepository;
use Doctrine\ORM\Mapping\AttributeOverrides;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

/**
 * Piece entity
 *
 * @ORM\Entity(repositoryClass=PieceRepository::class)
 */
class Piece extends AbstractORM
{

    /************************************************* CONSTANTS **************************************************/

    /************************************************* PROPERTIES *************************************************/

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Exhibition", inversedBy="pieces")
     * @JoinColumn(name="exhibition_id", referencedColumnName="id", nullable=false)
     */
    private Exhibition $exhibition;

    /**
     * @ORM\Column(type="string", length=512, unique=false)
     */
    protected string $name;

    /**
     * @ORM\Column(type="string", length=512, unique=false, nullable=false)
     */
    protected string $author;

    /**
     * @ManyToOne(targetEntity="App\Entity\ImageFile")
     * @JoinColumn(name="image_file_id", referencedColumnName="id", nullable=false)
     */
    protected ImageFile $imageFile;

    /**
     * @ORM\Column(type="text", nullable=false)
     */
    private string $description;

    /************************************************* CONSTRUCT **************************************************/

    /**
     * Piece Construct.
     *
     * @param string $name The name of the new user.
     * @param Exhibition $exhibition The exhibition of the piece.
     */
    public function __construct(Exhibition $exhibition, string $name, string $author, ImageFile $imageFile,
                                string     $description)
    {
        $this->setExhibition($exhibition)
            ->setName($name)
            ->setAuthor($author)
            ->setImageFile($imageFile)
            ->setDescription($description);
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /**
     * Gets the property Exhibition of the Piece.
     *
     * @return Exhibition Exhibition
     */
    public function getExhibition(): Exhibition
    {
        return $this->exhibition;
    }

    /**
     * Sets the property Exhibition of the Piece.
     *
     * @param Exhibition $exhibition Exhibition of the Piece.
     *
     * @return $this $this
     */
    public function setExhibition(Exhibition $exhibition): self
    {
        $this->exhibition = $exhibition;

        return $this;
    }

    /**
     * Gets the Name property of the Entity.
     *
     * @return string string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Sets the Name property of the Entity.
     *
     * @param string $name Name of the Entity to set.
     *
     * @return $this $this
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Gets the property Author of the Piece.
     *
     * @return string string
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * Sets the property Author of the Piece.
     *
     * @param string $author Author of the Piece.
     *
     * @return $this $this
     */
    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Gets the property ImageFile of the Piece.
     *
     * @return ImageFile ImageFile
     */
    public function getImageFile(): ImageFile
    {
        return $this->imageFile;
    }

    /**
     * Sets the property ImageFile of the Piece.
     *
     * @param ImageFile $imageFile ImageFile of the Piece.
     *
     * @return $this $this
     */
    public function setImageFile(ImageFile $imageFile): self
    {
        $this->imageFile = $imageFile;

        return $this;
    }

    /**
     * Gets the property Description of the Piece.
     *
     * @return string string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Sets the property Description of the Piece.
     *
     * @param string $description Description of the Piece.
     *
     * @return $this $this
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /*********************************************** PUBLIC METHODS ***********************************************/

    /********************************************** PRIVATE METHODS ***********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}