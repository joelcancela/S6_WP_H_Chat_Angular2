package block;

import javafx.scene.image.*;

import javax.swing.text.html.ImageView;
import java.awt.*;
import java.net.URL;

/**
 * Created by Benjamin on 27/04/2017.
 */
public class BlackHoleBlock extends Block {
    private Point position;

    public BlackHoleBlock(Point position){
        this.position = position;
    }

    @Override
    public Point getPosition(){
        return position;
    }

    @Override
    public String toString(){
        return "blackholeBlock";
    }

    @Override
    public javafx.scene.image.Image getImage() {
        return null;
    }

    @Override
    public boolean equals(Object object) {
        return false;
    }



}
