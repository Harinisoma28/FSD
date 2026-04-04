package FSAD;
class Vehicle {
 void vehicle() {
     System.out.println("This is a Vehicle");
 }
}
class Car extends Vehicle {
 void car() {
     System.out.println("This is a Car");
 }
}
class ElectricCar extends Car {
 void electricCar() {
     System.out.println("This is an Electric Car");
 }
}
public class InheritanceMultiLevel {
 public static void main(String[] args) {
     ElectricCar myEV = new ElectricCar();
     myEV.vehicle();      
     myEV.car();          
     myEV.electricCar();  
 } 
}