<?php

namespace App\Entity;

use App\Entity\Traits\NameTrait;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ImageFileRepository;
use Doctrine\ORM\Mapping\AttributeOverrides;

/**
 * ImageFile entity
 *
 * @ORM\Entity(repositoryClass=ImageFileRepository::class)
 */
class ImageFile extends AbstractORM
{

    /************************************************* CONSTANTS **************************************************/

    /************************************************* PROPERTIES *************************************************/

    /**
     * @ORM\Column(type="string", length=512, unique=false, nullable=false)
     */
    protected string $src;

    /**
     * @ORM\Column(type="integer", options={ "default": 0 })
     */
    protected int $width;

    /**
     * @ORM\Column(type="integer", options={ "default": 0 })
     */
    protected int $height;

    /************************************************* CONSTRUCT **************************************************/

    /**
     * ImageFile Construct.
     *
     * @param string $src Src of the ImageFile.
     * @param int $width Width of the ImageFile.
     * @param int $height Height of the ImageFile.
     */
    public function __construct(string $src, int $width, int $height)
    {
        $this->setSrc($src);
        $this->setWidth($width);
        $this->setHeight($height);
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /**
     * Gets the property Src of the ImageFile.
     *
     * @return string string
     */
    public function getSrc(): string
    {
        return $this->src;
    }

    /**
     * Sets the property Src of the ImageFile.
     *
     * @param string $src Src of the ImageFile.
     *
     * @return $this $this
     */
    public function setSrc(string $src): self
    {
        $this->src = $src;

        return $this;
    }

    /**
     * Gets the property Width of the ImageFile.
     *
     * @return int int
     */
    public function getWidth(): int
    {
        return $this->width;
    }

    /**
     * Sets the property Width of the ImageFile.
     *
     * @param int $width Width of the ImageFile.
     *
     * @return $this $this
     */
    public function setWidth(int $width): self
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Gets the property Height of the ImageFile.
     *
     * @return int int
     */
    public function getHeight(): int
    {
        return $this->height;
    }

    /**
     * Sets the property Height of the ImageFile.
     *
     * @param int $height Height of the ImageFile.
     *
     * @return $this $this
     */
    public function setHeight(int $height): self
    {
        $this->height = $height;

        return $this;
    }

    /*********************************************** PUBLIC METHODS ***********************************************/

    /********************************************** PRIVATE METHODS ***********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}