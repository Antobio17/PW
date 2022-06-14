<?php

namespace App\Entity;

use App\Entity\Traits\NameTrait;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ExhibitionRepository;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

/**
 * Exhibition entity
 *
 * @ORM\Entity(repositoryClass=ExhibitionRepository::class)
 */
class Exhibition extends AbstractORM
{
    # TODO POPUP en las exposiociones
    /************************************************* CONSTANTS **************************************************/

    public const CATEGORY_PHOTOGRAPHY = 0;
    public const CATEGORY_PAINTING = 1;
    public const CATEGORY_SCULPTURE = 2;

    /************************************************* PROPERTIES *************************************************/

    use NameTrait {
        NameTrait::__construct as protected __nameConstruct;
        NameTrait::__toArray as protected __nameToArray;
    }

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
     * @ORM\Column(type="datetime", nullable=false)
     */
    protected DateTime $startAt;

    /**
     * @ORM\Column(type="string", length=10, unique=false, nullable=false)
     */
    protected string $room;

    /**
     * @ORM\Column(type="text", nullable=false)
     */
    private string $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="exhibition", cascade={"remove"})
     */
    private Collection $comments;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Piece", mappedBy="exhibition", cascade={"remove"})
     */
    private Collection $pieces;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private int $category;

    /************************************************* CONSTRUCT **************************************************/

    /**
     * Exhibition Construct.
     *
     * @param string $name The name of the new user.
     * @param string $author The author of the exhibition.
     * @param ImageFile $imageFile The main Image of the Exhibition.
     * @param DateTime $startAt The starting date of the Exhibition.
     * @param string $room The room of the Exhibition.
     *
     */
    public function __construct(string $name, string $author, ImageFile $imageFile, DateTime $startAt, string $room,
                                string $description)
    {
        $this->__nameConstruct($name);

        $this->setAuthor($author);
        $this->setImageFile($imageFile);
        $this->setStartAt($startAt);
        $this->setRoom($room);
        $this->setDescription($description);

        $this->comments = new ArrayCollection();
        $this->pieces = new ArrayCollection();
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /**
     * Gets the property Author of the Exhibition.
     *
     * @return string string
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * Sets the property Author of the Exhibition.
     *
     * @param string $author Author of the Exhibition.
     *
     * @return $this $this
     */
    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Gets the property ImageFile of the Exhibition.
     *
     * @return ImageFile ImageFile
     */
    public function getImageFile(): ImageFile
    {
        return $this->imageFile;
    }

    /**
     * Sets the property ImageFile of the Exhibition.
     *
     * @param ImageFile $imageFile ImageFile of the Exhibition.
     *
     * @return $this $this
     */
    public function setImageFile(ImageFile $imageFile): self
    {
        $this->imageFile = $imageFile;

        return $this;
    }

    /**
     * Gets the property StartAt of the Exhibition.
     *
     * @return DateTime DateTime
     */
    public function getStartAt(): DateTime
    {
        return $this->startAt;
    }

    /**
     * Sets the property StartAt of the Exhibition.
     *
     * @param DateTime $startAt Starting date of the Exhibition.
     *
     * @return $this $this
     */
    public function setStartAt(DateTime $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    /**
     * Gets the property Room of the Exhibition.
     *
     * @return string string
     */
    public function getRoom(): string
    {
        return $this->room;
    }

    /**
     * Sets the property Room of the Exhibition.
     *
     * @param string $room Room of the Exhibition.
     *
     * @return $this $this
     */
    public function setRoom(string $room): self
    {
        $this->room = $room;

        return $this;
    }

    /**
     * Gets the property Description of the Exhibition.
     *
     * @return string string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Sets the property Description of the Exhibition.
     *
     * @param string $description Description of the Exhibition.
     *
     * @return $this $this
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Gets the property Comments of the Exhibition.
     *
     * @return Collection
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * Gets the property Pieces of the Exhibition.
     *
     * @return Collection
     */
    public function getPieces(): Collection
    {
        return $this->pieces;
    }

    /**
     * Gets the property Category of the Exhibition.
     *
     * @return int int
     */
    public function getCategory(): int
    {
        return $this->category;
    }

    /**
     * Sets the property Category of the Exhibition.
     *
     * @param int $category Category of the Exhibition.
     *
     * @return $this $this
     */
    public function setCategory(int $category): self
    {
        $this->category = $category;

        return $this;
    }

    /*********************************************** PUBLIC METHODS ***********************************************/

    /**
     * @return string string
     * @noinspection PhpPureAttributeCanBeAddedInspection
     */
    public function getCategoryString(int $category): string
    {
        $categories = array_flip(static::getAllCategoriesOptions());

        return $categories[$category];
    }

    /********************************************** PRIVATE METHODS ***********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

    /**
     * @return array array
     * @noinspection PhpArrayShapeAttributeCanBeAddedInspection
     */
    public static function getAllCategoriesOptions(): array
    {
        return array(
            'Fotografía' => static::CATEGORY_PHOTOGRAPHY,
            'Pintura' => static::CATEGORY_PAINTING,
            'Escultura' => static::CATEGORY_SCULPTURE,
        );
    }
}