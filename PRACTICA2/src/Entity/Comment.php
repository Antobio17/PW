<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping\AttributeOverrides;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Comment entity
 *
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment extends AbstractORM
{

    /************************************************* CONSTANTS **************************************************/

    /************************************************* PROPERTIES *************************************************/

    /**
     * @ORM\Column(type="text", nullable=false)
     */
    private string $text;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Exhibition", inversedBy="comments")
     * @JoinColumn(name="exhibition_id", referencedColumnName="id", nullable=false)
     */
    private Exhibition $exhibition;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     */
    protected UserInterface $user;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    protected DateTime $commentAt;

    /************************************************* CONSTRUCT **************************************************/

    /**
     * Comment Construct.
     *
     * @param string $text The text of the comment.
     *
     */
    public function __construct(string $text, Exhibition $exhibition, UserInterface $user, DateTime $commentAt = NULL)
    {
        $this->setText($text);
        $this->setExhibition($exhibition);
        $this->setUser($user);
        $this->setCommentAt($commentAt ?? date_create());
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /**
     * Gets the property Text of the Comment.
     *
     * @return string string
     */
    public function getText(): string
    {
        return $this->text;
    }

    /**
     * Sets the property Text of the Comment.
     *
     * @param string $text Text of the Comment.
     *
     * @return $this $this
     */
    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Gets the property Exhibition of the Comment.
     *
     * @return Exhibition Exhibition
     */
    public function getExhibition(): Exhibition
    {
        return $this->exhibition;
    }

    /**
     * Sets the property Exhibition of the Comment.
     *
     * @param Exhibition $exhibition Exhibition of the Comment.
     *
     * @return $this $this
     */
    public function setExhibition(Exhibition $exhibition): self
    {
        $this->exhibition = $exhibition;

        return $this;
    }

    /**
     * Gets the property User of the Comment.
     *
     * @return UserInterface UserInterface
     */
    public function getUser(): UserInterface
    {
        return $this->user;
    }

    /**
     * Sets the property User of the Comment.
     *
     * @param UserInterface $user User of the Comment.
     *
     * @return $this $this
     */
    public function setUser(UserInterface $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Gets the property CommentAt of the Comment.
     *
     * @return DateTime DateTime
     */
    public function getCommentAt(): DateTime
    {
        return $this->commentAt;
    }

    /**
     * Sets the property CommentAt of the Comment.
     *
     * @param DateTime $commentAt Date of the Comment.
     *
     * @return $this $this
     */
    public function setCommentAt(DateTime $commentAt): self
    {
        $this->commentAt = $commentAt;

        return $this;
    }

    /*********************************************** PUBLIC METHODS ***********************************************/

    /**
     * @return string string
     */
    public function stringifyStartAt(): string
    {
        return $this->getCommentAt()->format('d-M-y H:i:s');
    }

    /********************************************** PRIVATE METHODS ***********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}