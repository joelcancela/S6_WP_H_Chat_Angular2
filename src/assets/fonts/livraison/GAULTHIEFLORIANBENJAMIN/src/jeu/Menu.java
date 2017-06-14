package jeu;

import dvt.devint.menu.MenuDevint;
import javafx.application.Application;

/** cette classe lance les différents exemples de jeux DeViNT.
 * Vous devez obligatoirement étendre la classe menu pour écrire le menu de votre dvt.rainbow
 * (ex: choix entre différents niveaux de dvt.rainbow, options, aide ...)
 *
 * @author helen
 *
 */
public class Menu extends MenuDevint {

    @Override
    public String titre() {
        return "Jeux DeViNT";
    }

    @Override
    public void initMenu() {
        control.addMenuItem("RainBow Block", (x) -> new MenuDifficulte());
    }

    public static void main(String[] s){
        Application.launch(Menu.class,s);
    }

}
