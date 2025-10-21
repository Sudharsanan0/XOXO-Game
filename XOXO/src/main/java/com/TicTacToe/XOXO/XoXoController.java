package com.TicTacToe.XOXO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class XoXoController {


    @GetMapping("/XOXO")
    public String index() {
        return "index";
    }
}



