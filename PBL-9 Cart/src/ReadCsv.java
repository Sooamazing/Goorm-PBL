import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ReadCsv {
    public static void main(String[] args){
        //참고: https://jeong-pro.tistory.com/70
        //반환용 리스트

        List<List<String>> ret = new ArrayList<List<String>>();
        BufferedReader br = null;

        try{
            br = Files.newBufferedReader(Paths.get("/Users/goorm/Documents/Goorm-PBL/PBL-9 Cart/productList.csv"));
            //Charset.forName("UTF-8");
            String line = "";

            while((line = br.readLine()) != null){
                //CSV 1행을 저장하는 리스트
                List<String> tmpList = new ArrayList<String>();
                String array[] = line.split(",");
                //배열에서 리스트 반환
                tmpList = Arrays.asList(array);
                System.out.println(tmpList);
                ret.add(tmpList);
            }
        }catch(FileNotFoundException e){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally{
            try{
                if(br != null){
                    br.close();
                }
            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }
}