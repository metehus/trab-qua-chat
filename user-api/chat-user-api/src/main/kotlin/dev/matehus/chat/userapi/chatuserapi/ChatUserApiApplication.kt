package dev.matehus.chat.userapi.chatuserapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class ChatUserApiApplication

fun main(args: Array<String>) {
    runApplication<ChatUserApiApplication>(*args)
}
