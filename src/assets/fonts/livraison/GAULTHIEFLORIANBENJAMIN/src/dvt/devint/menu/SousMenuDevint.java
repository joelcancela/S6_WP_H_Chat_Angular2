package dvt.devint.menu;

import javafx.stage.Stage;

/** classe à étendre pour définir un sous-menu dans votre projet
 * cette classe étend Stage
 * @author helen
 *
 */
public abstract class SousMenuDevint extends Stage{

    /**
     * le contrôle qui fait tout le travail
     */
    protected MenuDevintControl control;

    /** le titre du menu
     *
     * @return le titre
     */
    public abstract String titre();

    /**
     * Permet d'initialiser le menu
     * doit faire des appels à
     * control.addmenuItems(label,action)
     */
    public abstract void initMenu();

    /**
     * cette méthode initialise la scene et les composants graphiques
     * et lance la boucle de jeu
     */
    public SousMenuDevint() {
        control = new MenuDevintControl();
        control.setTitre(titre());
        control.mapTouchToActions();
        initMenu();
        control.render();
        // on ajoute ensuite le bouton quit pour qu'il soit en bas
        control.addMenuItem("Quit",(x) -> ((Stage)control.scene.getWindow()).close());
        this.setScene(control.scene);
        this.setTitle(" ");
        this.show();
    }

}