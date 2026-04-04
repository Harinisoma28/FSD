package com.wallet.walletbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wallet.walletbackend.entity.User;
import com.wallet.walletbackend.entity.Transaction;
import com.wallet.walletbackend.repository.UserRepository;
import com.wallet.walletbackend.repository.TransactionRepository;
import com.wallet.walletbackend.service.WalletService;

import java.util.List;
import java.util.Map;       // <-- ADD THIS
import java.util.HashMap;   // <-- ADD THIS

@RestController
@RequestMapping("/wallet")
@CrossOrigin("*")
public class WalletController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private WalletService walletService;

    @PostMapping("/create")
    public Map<String,Object> createUser(@RequestBody User user) {
        user.setBalance(0.0);
        User savedUser = userRepo.save(user);

        // Temporary dummy token
        String token = "dummy-token";

        Map<String,Object> res = new HashMap<>();
        res.put("token", token);
        res.put("name", savedUser.getName());
        res.put("id", savedUser.getId());

        return res;
    }

    @PostMapping("/add/{id}")
    public String addMoney(@PathVariable Long id, @RequestParam double amount) {
        System.out.println("Adding money: userId=" + id + ", amount=" + amount);

        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("User found: " + user.getName());

        user.setBalance(user.getBalance() + amount);
        userRepo.save(user);
        System.out.println("Balance updated: " + user.getBalance());

        Transaction t = new Transaction();
        t.setType("CREDIT");
        t.setAmount(amount);
        t.setUser(user);
        transactionRepo.save(t);
        System.out.println("Transaction saved");

        return "Money added";
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam Long senderId,
                           @RequestParam Long receiverId,
                           @RequestParam double amount) {
        return walletService.transferMoney(senderId, receiverId, amount);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/transactions/user/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
        return transactionRepo.findByUserId(userId);
    }
}