package com.wallet.walletbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wallet.walletbackend.entity.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndType(Long userId, String type);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = ?1 AND t.type = 'DEBIT'")
    Double totalSpent(Long userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = ?1 AND t.type = 'CREDIT'")
    Double totalAdded(Long userId);
}