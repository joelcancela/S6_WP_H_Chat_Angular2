package jeu;

import controleur.ControlGame;
import dvt.devint.menu.SousMenuDevint;
import javafx.application.Application;

public class MenuLevel extends SousMenuDevint {

    @Override
    public String titre() {
        return "Choix du niveau";
    }

    @Override
    public void initMenu() {
        if(Difficulte.getDifficulte().equals(Difficulte.facile)){
            control.addMenuItem("Niveau 1 (Facile)", (x) ->{  ControlGame.setNiveau(0);new RainBow();});
            control.addMenuItem("Niveau 2 (Facile)", (x) ->{  ControlGame.setNiveau(1);new RainBow();});
            control.addMenuItem("Niveau 3 (Facile)", (x) ->{  ControlGame.setNiveau(2);new RainBow();});
            control.addMenuItem("Niveau 4 (Facile)", (x) ->{  ControlGame.setNiveau(3);new RainBow();});
            control.addMenuItem("Niveau 5 (Facile)", (x) ->{  ControlGame.setNiveau(4);new RainBow();});
        }
        else if(Difficulte.getDifficulte().equals(Difficulte.intermediaire)){
            control.addMenuItem("Niveau 1 (Intermédiaire)", (x) ->{  ControlGame.setNiveau(5);new RainBow();});
            control.addMenuItem("Niveau 2 (Intermédiaire)", (x) ->{  ControlGame.setNiveau(6);new RainBow();});
            control.addMenuItem("Niveau 3 (Intermédiaire)", (x) ->{  ControlGame.setNiveau(7);new RainBow();});
            control.addMenuItem("Niveau 4 (Intermédiaire)", (x) ->{  ControlGame.setNiveau(8);new RainBow();});
            control.addMenuItem("Niveau 5 (Intermédiaire)", (x) ->{  ControlGame.setNiveau(9);new RainBow();});
        }
        else if(Difficulte.getDifficulte().equals(Difficulte.difficile)){
            control.addMenuItem("Niveau 1 (Difficile)", (x) ->{  ControlGame.setNiveau(10);new RainBow();});
            control.addMenuItem("Niveau 2 (Difficile)", (x) ->{  ControlGame.setNiveau(11);new RainBow();});
            control.addMenuItem("Niveau 3 (Difficile)", (x) ->{  ControlGame.setNiveau(12);new RainBow();});
            control.addMenuItem("Niveau 4 (Difficile)", (x) ->{  ControlGame.setNiveau(13);new RainBow();});
            control.addMenuItem("Niveau 5 (Difficile)", (x) ->{  ControlGame.setNiveau(14);new RainBow();});
        }
    }

    public static void main(String[] s){
        Application.launch(Menu.class,s);
    }

}
