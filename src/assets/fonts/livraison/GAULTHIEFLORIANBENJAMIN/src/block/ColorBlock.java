package block;

import dvt.devint.ConstantesDevint;
import javafx.scene.image.Image;

import java.awt.*;
import java.net.URL;

/**
 * Classe qui représente un block ayant une valeur et une couleur
 */
public class ColorBlock extends Block {

    private GameColor color;
    private Point position;
    private Image image;

    /**
     * Constructeur normal
     * @param color
     * @param position
     */
    public ColorBlock(GameColor color, Point position){
        this.color    = color;
        this.position = position;
        this.image = new Image(getClass().getResource("/images/"+color.getValue()+".png").toString());
    }

    /**
     * Retourne la couleur du block
     * @return
     */
    public GameColor getColor() { return color; }

    /**
     * Retourne la position du block
     * @return
     */
    @Override
    public Point getPosition() { return position; }

    /**
     * Modifie la couleur du block
     * @param color
     */
    public void setColor(GameColor color){
        this.color = color;
        this.image = new Image(getClass().getResource("/images/"+Integer.toString(color.getValue())+".png").toString());

    }

    public void incrementColor() {
        if (color.ordinal()!=10){
            this.image = new Image(getClass().getResource("/images/"+Integer.toString(GameColor.values()[color.ordinal()+1].getValue())+".png").toString());
            this.color = GameColor.values()[color.ordinal()+1];
        }
    }

    /**
     * Modifie la position du block
     * @param position
     */
    public void setPosition(Point position){
        this.position = position;
    }

    @Override
    public String toString(){
        return ""+color.getValue();
    }

    @Override
    public Image getImage() {
        return image;
    }


    @Override
    public boolean equals(Object object) {
        if (object instanceof ColorBlock ){
            if (((ColorBlock) object).getColor()==color) return true;
        }
        return false;
    }

}
