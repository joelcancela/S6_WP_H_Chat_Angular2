package block;


import javafx.scene.image.Image;

import java.awt.*;

/**
 * Classe représentant un block (ayant une valeur ou non)
 */
public abstract class Block {

    public abstract Point getPosition();
    @Override
    public abstract String toString();

    public abstract Image getImage();

    @Override
    public abstract boolean equals(Object object);


}
