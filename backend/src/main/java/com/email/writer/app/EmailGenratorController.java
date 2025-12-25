package com.email.writer.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGenratorController {
    @Autowired
    private EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> genrateEmail(@RequestBody EmailRequest emailRequest){
        String response= emailGeneratorService.generateEmailRequest(emailRequest);
        return ResponseEntity.ok(response);
    }
}
