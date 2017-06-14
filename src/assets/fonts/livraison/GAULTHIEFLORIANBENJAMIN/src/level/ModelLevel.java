package level;

import block.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.awt.*;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static level.Constante.*;

/**
 * Created by dziri on 05/04/17.
 * Le modele contient tous les niveau que notre jeu possède
 */
public class ModelLevel {
    private List<Level> listLevel;
    private JSONObject jsonObject;
    /**
     * pattern singleton pour avoir une seul instance de ModelLevel
     * @return
     */
    public static ModelLevel getModelLevel() throws Exception {
        return new ModelLevel();
    }

    public ModelLevel() throws Exception {
        listLevel = new ArrayList<Level>();
        initializeLevel();
    }

    /**
     * initialisation de la base de donnée des niveau avec un fichier json
     * @throws FileNotFoundException
     */

    private void initializeLevel() throws Exception {
        URL file = ModelLevel.class.getResource("/levels.txt");
        FileReader fileReader;
        fileReader = new FileReader(file.getFile());

        BufferedReader level = new BufferedReader(fileReader);
        String line = level.readLine();
        int i=1;
        while(line != null){
            jsonObject = new JSONObject(line);
            listLevel.add(new Level(jsonObject.getInt(size),initBlock(jsonObject.getJSONArray(blocks)),jsonObject.getBoolean(status),jsonObject.getString(difficulty)));
            line = level.readLine();
            i++;
        }
    }

    /**
     * initialiser la liste des blocks de chaque niveau
     * @param array
     * @return
     */
    private List initBlock(JSONArray array){
        List listBlocks = new ArrayList<Block>();
        List tab;
        for (int i=0; i<array.length();i++){
            tab =  array.getJSONArray(i).toList();
            if (tab.get(0).equals("BLACKHOLE")) {
                listBlocks.add(new BlackHoleBlock(new Point((Integer) tab.get(1),(Integer) tab.get(2))));
            }
            else if (tab.get(0).equals("DURBLOCK")){
                listBlocks.add(new DurBlock(new Point((Integer) tab.get(1),(Integer) tab.get(2))));
            }
            else {
                listBlocks.add(new ColorBlock(GameColor.valueOf(tab.get(0) + ""), new Point((Integer) tab.get(1), (Integer) tab.get(2))));
            }
        }
        return listBlocks;
    }
    public List<Level> getListLevel() {
        return listLevel;
    }

}
