package block;

import javafx.scene.image.Image;

import java.awt.*;


/**
 * Classe qui représente un block vide
 */
public class SpaceBlock extends Block {

    private Point position;
    private Image image;

    /**
     * Constructeur normal
     * @param position la position du block vide
     */
    public SpaceBlock(Point position){
        this.position = position;
        this.image = new Image(getClass().getResource("/images/spaceBlock.png").toString());
    }
    /**
     * Retourne la position du block
     * @return la position
     */
    @Override
    public Point getPosition(){
        return position;
    }
    @Override
    public String toString(){
        return "spaceBlock";
    }

    public Image getImage() {
        return image;
    }

    @Override
    public boolean equals(Object object) {
        return (object instanceof SpaceBlock);
    }

}
