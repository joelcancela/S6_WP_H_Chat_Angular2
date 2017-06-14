package block;

import dvt.devint.ConstantesDevint;
import javafx.scene.image.*;
import javafx.scene.image.Image;

import java.awt.*;

import java.awt.image.BufferedImage;
import java.net.URL;

/**
 * Created by Benjamin on 27/04/2017.
 */
public class DurBlock extends Block {
    private Point position;
    private Image image;

    /**
     * Constructeur normal
     * @param position la position du block vide
     */
    public DurBlock(Point position){
        this.position = position;
        this.image = new Image(getClass().getResource("/images/durBlock.png").toString());
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
        return "durBlock";
    }

    @Override
    public Image getImage() {
        return image;
    }

    @Override
    public boolean equals(Object object) {
        return (object instanceof DurBlock);
    }

}
