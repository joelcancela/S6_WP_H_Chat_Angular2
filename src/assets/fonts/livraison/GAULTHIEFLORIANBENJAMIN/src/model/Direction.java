package model;

import java.awt.*;

public enum Direction {
    HAUT(new Point(0,1)),
    DROITE(new Point(1,0)),
    BAS(new Point(0,-1)),
    GAUCHE(new Point(-1,0));

    private Point point;

    Direction(Point point){
        this.point = point;
    }

    public Point getTranslation(){
        return point;
    }
}
