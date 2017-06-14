package jeu;

import dvt.devint.menu.SousMenuDevint;

public class MenuDifficulte extends SousMenuDevint {

    @Override
    public String titre() {
        return "Choix de la difficulté";
    }

    @Override
    public void initMenu() {

        control.addMenuItem("Niveaux faciles", (x) ->{
            Difficulte.changeDifficulty(Difficulte.facile);
            new MenuLevel();
        });
        control.addMenuItem("Niveaux intermédiaires", (x) ->{
            Difficulte.changeDifficulty(Difficulte.intermediaire);
            new MenuLevel();
        });
        control.addMenuItem("Niveaux difficiles", (x) ->{
            Difficulte.changeDifficulty(Difficulte.difficile);
            new MenuLevel();
        });

    }
}
