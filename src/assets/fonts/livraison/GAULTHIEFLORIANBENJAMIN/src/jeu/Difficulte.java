package jeu;

public enum Difficulte {

    facile,
    intermediaire,
    difficile;

    static Difficulte difficulte = Difficulte.facile;

    Difficulte(){}

    public static void changeDifficulty(Difficulte d){
        difficulte = d;
    }

    public static Difficulte getDifficulte(){
        return difficulte;
    }
}
