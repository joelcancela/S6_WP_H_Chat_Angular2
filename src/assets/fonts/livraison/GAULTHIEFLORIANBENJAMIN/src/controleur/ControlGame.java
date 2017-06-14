package controleur;

import block.Block;
import dvt.devint.ConstantesDevint;
import dvt.jeu.simple.ControleDevint;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontPosture;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;
import jeu.MenuFinNiveau;
import model.Direction;
import model.GrilleMap;
import javafx.fxml.FXML;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.*;
import level.ModelLevel;
import java.applet.Applet;
import java.applet.AudioClip;
import java.awt.Point;
import java.net.URL;

public class ControlGame extends ControleDevint {

    private GridPane gridPane;
    private ModelLevel levels = ModelLevel.getModelLevel();
    private GrilleMap map ;
    private int coupsInt;
    private static int niveau = 0;
    private AudioClip ac = Applet.newAudioClip(getClass().getResource("/sons/applause.wav"));

    @FXML
    private Label coups;
    @FXML
    private BorderPane borderPane;
    @FXML
    private Button bouttonRecommencer;
    @FXML
    private Button bouttonQuitter;
    @FXML
    private Label lel;
    @FXML
    private Label labN;
    @FXML
    private Label labC;
    @FXML
    private VBox vbox;


    public ControlGame() throws Exception {
    }

    @Override
    protected void init() {
        gridPane = new GridPane();
        gridPane.setHgap(5);
        gridPane.setVgap(5);
        gridPane.setGridLinesVisible(true);
        gridPane.setAlignment(Pos.CENTER_RIGHT);
        vbox.setAlignment(Pos.CENTER_RIGHT);
        vbox.setPrefSize(ConstantesDevint.MAX_SCREEN_WIDTH*0.27,ConstantesDevint.MAX_SCREEN_HEIGHT*0.4);
        bouttonQuitter.setPrefSize(ConstantesDevint.MAX_SCREEN_WIDTH*0.05,ConstantesDevint.MAX_SCREEN_HEIGHT*0.005);
        bouttonRecommencer.setPrefSize(ConstantesDevint.MAX_SCREEN_WIDTH*0.05,ConstantesDevint.MAX_SCREEN_HEIGHT*0.05);

        int taille = levels.getListLevel().get(niveau).getTaille();
        map = new GrilleMap(taille,levels.getListLevel().get(niveau).getInitialblock());
        for (int i = 0; i < taille; i++){
            for (int j = 0; j < taille; j++){
                ImageView imageView = new ImageView(map.getBlock(new Point(i,j)).getImage());
                imageView.setFitWidth((ConstantesDevint.MAX_SCREEN_HEIGHT-200)/taille);
                imageView.setFitHeight((ConstantesDevint.MAX_SCREEN_HEIGHT-200)/taille);
                gridPane.add(imageView,i,j);
            }
        }
        int currentLevel = niveau+1;
        if(currentLevel>5 && currentLevel<=10){
            currentLevel = currentLevel -5;
        }
        else if(currentLevel>10){
            currentLevel = currentLevel -10;
        }
        lel.setText(currentLevel+"/5"+" ("+String.valueOf(levels.getListLevel().get(niveau).getDifficulty())+")");
        borderPane.setCenter(gridPane);
        coupsInt = 0;
        coups.setText(Integer.toString(coupsInt));
    }

    public void recommencer() throws Exception {
        levels = new ModelLevel();
        init();
    }

    public void quitter(){
        Stage stage = (Stage) this.getScene().getWindow();
        stage.close();
    }

    @Override
    protected void reset() {
        int taille = levels.getListLevel().get(niveau).getTaille();
        for (int i = 0; i < taille; i++){
            for (int j = 0; j < taille; j++){
                ImageView imageView = new ImageView(map.getBlock(new Point(i,j)).getImage());
                imageView.setFitWidth((ConstantesDevint.MAX_SCREEN_HEIGHT-200)/taille);
                imageView.setFitHeight((ConstantesDevint.MAX_SCREEN_HEIGHT-200)/taille);
                gridPane.add(imageView,i,j);
            }
        }
        coups.setText(Integer.toString(coupsInt));
    }

    private void diplayComplete(){
        HBox hbox = new HBox();
        Button quit;
        Pane pane300 = new Pane();
        pane300.setMinWidth(550);
        quit = new Button("Quitter");
        quit.setOnAction(e -> quitter());
        hbox.getChildren().add(pane300);
        hbox.getChildren().add(quit);
        hbox.setAlignment(Pos.CENTER);
        bouttonRecommencer.setVisible(false);
        bouttonQuitter.setVisible(false);
        borderPane.setBottom(hbox);

        new MenuFinNiveau().setControlGame(this);
        ac.play();
    }

    @Override
    public void mapTouchToActions() {
        scene.mapKeyPressedToConsumer(KeyCode.LEFT, (x) -> left());
        scene.mapKeyPressedToConsumer(KeyCode.RIGHT, (x) -> right());
        scene.mapKeyPressedToConsumer(KeyCode.DOWN, (x) -> bot());
        scene.mapKeyPressedToConsumer(KeyCode.UP, (x) -> top());
    }

    public void left(){
        GrilleMap tmp = new GrilleMap(map.getTaille(),null);
        Block[][] block = map.cloneBlock();
        tmp.setMatrice(block);
        if(!map.isComplete()){
            while(map.translateBlock(Direction.GAUCHE));
            map.fusion(Direction.GAUCHE);
            map.translateBlock(Direction.GAUCHE);
            fin(tmp);
        }
    }

    public void right(){
        GrilleMap tmp = new GrilleMap(map.getTaille(),null);
        Block[][] block = map.cloneBlock();
        tmp.setMatrice(block);
        if(!map.isComplete()){
            while (map.translateBlock(Direction.DROITE));
            map.fusion(Direction.DROITE);
            map.translateBlock(Direction.DROITE);
            fin(tmp);
        }
    }
    public void top(){
        GrilleMap tmp = new GrilleMap(map.getTaille(),null);
        Block[][] block = map.cloneBlock();
        tmp.setMatrice(block);
        if(!map.isComplete()){
            while(map.translateBlock(Direction.HAUT));
            map.fusion(Direction.HAUT);
            map.translateBlock(Direction.HAUT);
            fin(tmp);
        }
    }
    public void bot() {
        GrilleMap tmp = new GrilleMap(map.getTaille(),null);
        Block[][] block = map.cloneBlock();
        tmp.setMatrice(block);
        if(!map.isComplete()){
            while(map.translateBlock(Direction.BAS));
            map.fusion(Direction.BAS);
            map.translateBlock(Direction.BAS);
            fin(tmp);
        }
    }

    private void fin(GrilleMap tmp){
        if (!map.equals(tmp)){
            coupsInt++;
        }
        reset();
        if(map.isComplete()){
            diplayComplete();
        }
    }

    public static void incrNiveau(){
        niveau++;
    }

    public static void setNiveau(int niveau) {
        ControlGame.niveau = niveau;
    }

    public static int getNiveau(){
        return niveau;
    }
}
