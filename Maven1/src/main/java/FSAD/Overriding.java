package FSAD;
import java.util.*;
class Bank {
    double getInterestRate() {
        return 0.0;
    }
}
class SBI extends Bank {
    double getInterestRate() {
        return 6.5;
    }
}
class HDFC extends Bank {
    double getInterestRate() {
        return 7.0;
    }
}
public class Overriding {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Bank bank;
        System.out.println("Choose Bank:");
        System.out.println("1. SBI");
        System.out.println("2. HDFC");
        System.out.print("Enter choice: ");
        int choice = sc.nextInt();
        if (choice == 1) {
            bank = new SBI();
            System.out.println("SBI Interest Rate: " + bank.getInterestRate() + "%");
        } 
        else if (choice == 2) {
            bank = new HDFC();
            System.out.println("HDFC Interest Rate: " + bank.getInterestRate() + "%");
        } 
        else {
            System.out.println("Invalid choice");
        }
        sc.close();
    }
}
