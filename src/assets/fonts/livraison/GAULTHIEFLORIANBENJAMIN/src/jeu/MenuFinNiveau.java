package jeu;

import controleur.ControlGame;
import dvt.devint.menu.SousMenuDevint;

public class MenuFinNiveau extends SousMenuDevint {

    private ControlGame controlGame;

    @Override
    public String titre() {
        return "Gagné !";
    }

    @Override
    public void initMenu() {
        setHeight(350);
        setWidth(470);
        if(controlGame.getNiveau() != 14){
            control.addMenuItem("Niveau Suivant", (x) ->{
                ControlGame.incrNiveau();
                new RainBow();
                controlGame.quitter();
                this.close();
                this.hide();
                this.getScene().getWindow().hide();

            });
        }
        control.addMenuItem("Recommencer", (x) ->{
            new RainBow();
            controlGame.quitter();
            this.close();
            this.hide();
            this.getScene().getWindow().hide();
        });

        control.addMenuItem("Retour Menu", (x) ->{
            controlGame.quitter();
            this.close();
            this.hide();
            this.getScene().getWindow().hide();
        });
    }

    public void setControlGame(ControlGame c){
        controlGame = c;
    }
}
