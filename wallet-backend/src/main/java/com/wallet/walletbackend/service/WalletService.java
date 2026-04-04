package com.wallet.walletbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wallet.walletbackend.entity.User;
import com.wallet.walletbackend.entity.Transaction;
import com.wallet.walletbackend.repository.UserRepository;
import com.wallet.walletbackend.repository.TransactionRepository;

@Service
public class WalletService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public String transferMoney(Long senderId, Long receiverId, double amount) {
        User sender = userRepo.findById(senderId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepo.findById(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (sender.getBalance() < amount) throw new RuntimeException("Insufficient balance");

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        userRepo.save(sender);
        userRepo.save(receiver);

        Transaction debit = new Transaction();
        debit.setType("DEBIT");
        debit.setAmount(amount);
        debit.setUser(sender);
        transactionRepo.save(debit);

        Transaction credit = new Transaction();
        credit.setType("CREDIT");
        credit.setAmount(amount);
        credit.setUser(receiver);
        transactionRepo.save(credit);

        return "Transfer successful";
    }
}