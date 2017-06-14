package model;

import block.*;
import java.awt.*;
import java.util.List;

public class GrilleMap {

    private Block[][] matrice;
    private int taille;

    /**
     * Crée une matrice de taille taille*taille vide
     * @param taille la taille
     */
    public GrilleMap(int taille, List<Block> initialblock){
        this.matrice = new Block[taille][taille];
        this.taille = taille;
        initialize(initialblock);
    }


    /**
     * Modifie directement la matrice
     * @param matrice la nouvelle matrice
     */
    public void setMatrice(Block[][] matrice){
        this.matrice = matrice;
    }
    /**
     * Ajoute un block dans cette matrice
     * @param block le block à ajouter
     */
    public void addBlock(Block block){
        int x = block.getPosition().x-1;
        int y = block.getPosition().y-1;
        matrice[x][y] = block;
    }

    /**
     * Interverti deux blocks de la grille
     * @param pointA la poisition du block A
     * @param pointB la position du block B
     */
    private void swapBlock(Point pointA,Point pointB){
        Block tmp = matrice[pointB.x][pointB.y];
        matrice[pointB.x][pointB.y] = matrice[pointA.x][pointA.y];
        matrice[pointA.x][pointA.y] = tmp;
    }

    /**
     * Vérifie l'égalite du contenu de la grille
     * @param object la deuxième grille
     * @return boolean correspondant à cette égalité
     */
    @Override
    public boolean equals(Object object){
        if (object instanceof GrilleMap){
            GrilleMap gmtemp = (GrilleMap) object;
            for (int i=0;i<taille;i++){
                for (int j=0;j<taille;j++){
                    Point pos = new Point(i,j);
                    if (!(gmtemp.getBlock(pos).equals(this.getBlock(pos)))){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * Retourne la taille de la matrice carré (une matrice 3x3 est de taille 3)
     * @return int la taille
     */
    public int getTaille(){
        return taille;
    }

    /**
     * Retourne un block contenue par la grille à la position donnée
     * @param point la position du block
     * @return le bon block
     */
    public Block getBlock(Point point){
        return matrice[point.x][point.y];
    }

    /**
     * Supprime un block contenue par la grille à la position donnée
     * @param point la position du block
     */
    public void deleteBlock(Point point){
        matrice[point.x][point.y] = new SpaceBlock(point);
    }

    public boolean translateBlock(Direction dir){
        switch(dir){
            case BAS:
                return bas();
            case DROITE:
                return droite();
            case GAUCHE:
               return gauche();
            case HAUT:
                return haut();
        }
    return false;
    }
    /**
     * Initialize la map des blocks suivant la liste des blocks à ajouter à l'initialisation
     * @param list la liste des block initiaux
     */
    public void initialize(List<Block> list){
        for (int i=1;i<=taille;i++){
            for (int j=1;j<=taille;j++){
                Point pos = new Point(i,j);
                addBlock(containPos(list,pos));
            }
        }
    }

    /**
     * Retourne le nombre de block de couleur (ColorBlock) de la grille.
     * @return int le nombre de block correspondant
     */
    private int getNbBlock(){
        int nb = 0;
        for(int i = 0 ; i<getTaille() ; i++){
            for(int j = 0 ; j<getTaille() ; j++){
                if(matrice[i][j] instanceof ColorBlock)
                    nb++;
            }
        }
        return nb;
    }

    public boolean isComplete(){
        return getNbBlock()==1;
    }

    /**
     * Regarde si l'un des blocks de la liste est à la position recherchée
     * @param list la liste des blocks
     * @param position la position recherchée
     * @return le coloblock voulue,ou un spaceblock si il y en a pas
     */
    private Block containPos(List<Block> list, Point position){
        if (list==null){
            return new SpaceBlock(position);
        }
        for (Block Block : list){
            if (Block.getPosition().equals(position)) {
                return Block;
            }
        }
        return new SpaceBlock(position);
    }

    /**
     * Clone la matrice de block
     * @return Block[][] La matrice de block
     */
    public Block[][] cloneBlock(){
        Block[][] block = new Block[taille][taille];
        for (int i=0;i<taille;i++){
            for (int j=0;j<taille;j++){
                block[i][j] = matrice[i][j];
            }
        }
        return block;
    }

    /**
     * Descends tout les blocks de la matrice (sans fusion)
     * @return true si il y a eu un chagement,false sinon
     */
    private boolean  bas(){
        int x=0;
        int y=0;
        boolean val = false;
        while(x<taille){
            y = taille -2;
            while (y>=0) {
                if (matrice[x][y] instanceof ColorBlock) {
                    if(matrice[x][y+1] instanceof SpaceBlock){
                        val = true;
                        matrice[x][y+1].getPosition().translate(0,1);
                        matrice[x][y].getPosition().translate(0,-1);
                        swapBlock(new Point(x,y+1), new Point(x,y));
                    }
                }
                y--;
            }
            x++;
        }
        return val;
    }

    /**
     * Décale tout les blocks de la matrice sur la droite(sans fusion)
     * @return true si il y a eu un chagement,false sinon
     */
    private boolean  droite(){
        int x=0;
        int y=0;
        boolean val = false;
        while(y<taille){
            x = taille -2;
            while (x>=0) {
                if (matrice[x][y] instanceof ColorBlock ) {
                    if (matrice[x + 1][y] instanceof SpaceBlock) {
                        val = true;
                        matrice[x + 1][y].getPosition().translate(1, 0);
                        matrice[x][y].getPosition().translate(-1,0);
                        swapBlock(new Point(x+1,y), new Point(x,y));
                    }
                }
                x--;
            }
            y++;
        }
        return val;
    }

    /**
     * Monte tout les blocks de la matrice (sans fusion)
     * @return true si il y a eu un chagement,false sinon
     */
    private boolean haut(){
        int x=0;
        int y=0;
        boolean val = false;
        while(x<taille){
            y = 1;
            while (y<taille) {
                if (matrice[x][y] instanceof ColorBlock) {
                    if(matrice[x][y-1] instanceof SpaceBlock){
                        val = true;
                        matrice[x][y-1].getPosition().translate(0,-1);
                        matrice[x][y].getPosition().translate(0,1);
                        swapBlock(new Point(x,y-1), new Point(x,y));
                    }
                }
                y++;
            }
            x++;
        }
        return val;
    }

    /**
     * Décale tout les blocks de la matrice sur la gauche(sans fusion)
     * @return true si il y a eu un chagement,false sinon
     */
    private boolean gauche(){
        int x=0;
        int y=0;
        boolean val = false;
        while(y<taille){
            x = 1;
            while (x<taille) {
                if (matrice[x][y] instanceof ColorBlock ) {
                    if(matrice[x-1][y] instanceof SpaceBlock){
                        val = true;
                        matrice[x-1][y].getPosition().translate(-1,0);
                        matrice[x][y].getPosition().translate(1,0);
                        swapBlock(new Point(x-1,y), new Point(x,y));
                    }
                }
                x++;
            }
            y++;
        }
        return val;
    }

    public void fusion(Direction dir){
        switch(dir){
            case BAS:
                fusionBas();
                break;
            case DROITE:
                fusionDroite();
                break;
            case GAUCHE:
               fusionGauche();
               break;
            case HAUT:
               fusionHaut();
               break;
        }
    }
    private void fusionDroite(){
        int x=0;
        int y=0;
        while(y<taille){
            x = taille -1;
            while (x>0) {
                if (matrice[x][y] instanceof ColorBlock && matrice[x-1][y].toString().equals(matrice[x][y].toString())) {
                    ColorBlock colorBlock = (ColorBlock) matrice[x][y];
                    matrice[x-1][y] = new SpaceBlock(matrice[x-1][y].getPosition());
                    colorBlock.incrementColor();
                    }
                else if (matrice[x-1][y] instanceof ColorBlock && matrice[x][y] instanceof BlackHoleBlock){
                    matrice[x-1][y] = new SpaceBlock(matrice[x-1][y].getPosition());
                }
                x--;

            }
            y++;
        }
    }
    private void fusionGauche(){
        int x=0;
        int y=0;
        while(y<taille){
            x = 0;
            while (x<taille-1) {
                if (matrice[x][y] instanceof ColorBlock && matrice[x+1][y].toString().equals(matrice[x][y].toString())) {
                    ColorBlock colorBlock = (ColorBlock) matrice[x][y];
                    matrice[x+1][y] = new SpaceBlock(matrice[x+1][y].getPosition());
                    colorBlock.incrementColor();
                }
                else if (matrice[x+1][y] instanceof ColorBlock && matrice[x][y] instanceof BlackHoleBlock){
                    matrice[x+1][y] = new SpaceBlock(matrice[x+1][y].getPosition());
                }
                x++;
            }
            y++;
        }
    }

    private void fusionBas(){
        int x=0;
        int y=0;
        while(x<taille){
            y = taille -1;
            while (y>0) {
                if (matrice[x][y] instanceof ColorBlock && matrice[x][y-1].toString().equals(matrice[x][y].toString())) {
                    ColorBlock colorBlock = (ColorBlock) matrice[x][y];
                    matrice[x][y-1] = new SpaceBlock(matrice[x][y-1].getPosition());
                    colorBlock.incrementColor();
                }
                else if (matrice[x][y-1] instanceof ColorBlock && matrice[x][y] instanceof BlackHoleBlock){
                    matrice[x][y-1] = new SpaceBlock(matrice[x][y-1].getPosition());
                }
                y--;
            }
            x++;
        }
    }
    private void fusionHaut(){
        int x=0;
        int y=0;

        while(x<taille) {
            y = 0;
            while (y < taille-1) {
                if (matrice[x][y] instanceof ColorBlock && matrice[x][y + 1].toString().equals(matrice[x][y].toString())) {
                    ColorBlock colorBlock = (ColorBlock) matrice[x][y];
                    matrice[x][y + 1] = new SpaceBlock(matrice[x][y + 1].getPosition());
                    colorBlock.incrementColor();
                }
                else if (matrice[x][y+1]instanceof ColorBlock && matrice[x][y] instanceof BlackHoleBlock){
                    matrice[x][y+1] = new SpaceBlock(matrice[x][y+1].getPosition());
                }
                y++;
            }
            x++;
        }
    }

}
