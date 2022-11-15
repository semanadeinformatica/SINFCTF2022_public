import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        System.out.println("Your computer has been hijacked! All your files are now encrypted");
        System.out.println("Pay me 10 bitcoins and I'll give you the key to unlock them!");

        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Base64.Encoder encoder = Base64.getEncoder();

        for (int i = 0; i < 3; ++i) {
            System.out.print("Insert the key: ");
            String key = reader.readLine();
            String encoded = encoder.encodeToString(key.getBytes());

            if (checkKey(encoded)) {
                System.out.println("You just got fooled, thank you for the quick bucks! ;D");
                break;
            } else if (i < 2) {
                System.out.println("You have  " + (2 - i) + " attempt(s) left. After that your coomputer will go BOOM!");
            } else {
                System.out.println("BOOOOOOOOOOOOOM!!!! NO FILES FOR YOU!!");
            }
        }
    }

    public static boolean checkKey(String pwd) {
        String target = "U0lORkNURjIwMjJ7M3ZlcnkwbjNfbDB2M3NfczBtM19TdzMzdF8wbERfSjR2NH0=";
        if (pwd.equals(target)) {
            System.out.println("The key is correct!");
            return true;
        } else {
            System.out.println("The key is incorrect!");
            return false;
        }
    }
}
