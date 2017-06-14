package block;

import java.awt.*;

/**
 * Enum des couleurs associées aux valeurs des blocks
 */
public enum GameColor {
    COLOR2(new Color(0,0,0)   ,2),
    COLOR4(new Color(0,0,0)   ,4),
    COLOR8(new Color(0,0,0)   ,8),
    COLOR16(new Color(0,0,0)  ,16),
    COLOR32(new Color(0,0,0)  ,32),
    COLOR64(new Color(0,0,0)  ,64),
    COLOR128(new Color(0,0,0) ,128),
    COLOR256(new Color(0,0,0) ,256),
    COLOR512(new Color(0,0,0) ,512),
    COLOR1024(new Color(0,0,0),1024),
    COLOR0(new Color(0,0,0)   ,0);

    private Color color;
    private int value;

    GameColor(Color color, int value){
        this.color = color;
        this.value = value;
    }

    public Color getColor(){
        return color;
    }
    public int getValue(){
        return value;
    }
    public static GameColor getColorOf(int number){
        return values()[(int)Math.floor(Math.log(number)/Math.log(2))-1];
    }

}
