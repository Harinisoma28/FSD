package com.wallet.walletbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wallet.walletbackend.repository.UserRepository;
import com.wallet.walletbackend.util.JwtUtil;
import com.wallet.walletbackend.entity.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestParam String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(email);

        Map<String, Object> res = new HashMap<>();
        res.put("token", token);
        res.put("name", user.getName());
        res.put("id", user.getId());

        return res;
    }
}