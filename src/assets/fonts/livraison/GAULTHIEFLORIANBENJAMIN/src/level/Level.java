package level;

import block.Block;
import jeu.Difficulte;

import java.util.List;

/**
 * Created by dziri on 05/04/17.
 * un niveau est caractèriser avec une taille pour la map
 * et une liste de blocks pour le commencement de la partie
 */
public class Level {
    private int taille;
    private boolean status;
    private List<Block> initialblock;
    private String string;
    /**
     * constructeur de niveau
     * @param taille
     * @param initialblock
     * @param string
     */
    public Level(int taille, List initialblock, boolean status, String string){
        this.taille = taille;
        this.initialblock = initialblock;
        this.status =status;
        this.string = string;
    }


    public List<Block> getInitialblock() {
        return initialblock;
    }

    public int getTaille() {
        return taille;
    }

    public Difficulte getDifficulty(){
        if (string.equals("facile"))
            return Difficulte.facile;
        if (string.equals("intermediaire"))
            return Difficulte.intermediaire;
        return Difficulte.difficile;
    }
    public boolean isUnlocked(){
        return status;
    }
}
