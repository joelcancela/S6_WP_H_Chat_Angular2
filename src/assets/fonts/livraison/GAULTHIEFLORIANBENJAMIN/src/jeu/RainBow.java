package jeu;

import dvt.devint.ConstantesDevint;
import dvt.devint.SceneDevint;
import dvt.jeu.simple.ControleDevint;
import dvt.jeu.simple.JeuDevint;
import dvt.jeu.simple.ModeleDevint;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;

import java.io.IOException;
import java.net.URL;

public class RainBow  extends JeuDevint{

    private SceneDevint sc;

    @Override
    public String titre() {
       return "RainBow Block";
    }

    @Override
    protected ModeleDevint initModel() {
        return null;
    }

    @Override
    protected ControleDevint initControlAndScene() {
        FXMLLoader loader = new FXMLLoader();
        URL FXMLfileName = getClass().getResource("/fxml/game.fxml");
        loader.setLocation(FXMLfileName);

        try {
            BorderPane root = loader.load();
            root.setPrefSize(ConstantesDevint.MAX_SCREEN_WIDTH,ConstantesDevint.MAX_SCREEN_HEIGHT);
            ((BorderPane)root.getCenter()).setPrefSize(ConstantesDevint.MAX_SCREEN_WIDTH*0.8,ConstantesDevint.MAX_SCREEN_HEIGHT*0.8);
            sc= new SceneDevint(root,ConstantesDevint.MAX_SCREEN_WIDTH,ConstantesDevint.MAX_SCREEN_HEIGHT);
            control = loader.getController();
            control.setScene(sc);

            sc.mapKeyPressedToConsumer(KeyCode.F1, (x)->actionF1());

        } catch (IOException e) {
            e.printStackTrace();
        }
        return control;
    }

    private void actionF1() {
        sc.getSIVox().stop();
        // Orthographe incorrect mais permettant d'avoir une bonne prononciation de la synthèse vocale
        sc.getSIVox().playText("Utiliser les flêches directionnelles pour déplacer tout les bloques. Fusionner les bloques similaires pour qu'il n'en reste plus qu'un.");
    }
}
