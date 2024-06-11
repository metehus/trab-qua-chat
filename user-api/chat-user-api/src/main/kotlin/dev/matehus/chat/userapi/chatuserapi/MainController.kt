package dev.matehus.chat.userapi.chatuserapi

import dev.matehus.chat.userapi.chatuserapi.dto.*
import dev.matehus.chat.userapi.chatuserapi.entity.User
import dev.matehus.chat.userapi.chatuserapi.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController(
    private val userService: UserService
) {
    @PostMapping("users")
    @ResponseStatus(HttpStatus.OK)
    fun createUser(@RequestBody data: CreateUserDTO): User {
        return this.userService.createUser(data)
    }

    @GetMapping("users")
    fun getUser(@RequestParam("email") email: String): User {
        return this.userService.getUser(email)
    }

    @PostMapping("token")
    fun createToken(@RequestBody data: CreateTokenDTO): TokenResponseDTO {
        return this.userService.authenticate(data.email, data.password)
    }

    @GetMapping("token")
    fun verifyToken(
        @RequestHeader("Authorization") authorization: String,
        @RequestParam("userId") userId: String
    ): AuthResponseDTO {
        return try {
            this.userService.verifyAuth(authorization, userId)
            AuthResponseDTO(true)
        } catch (ex: Exception) {
            ex.printStackTrace()
            AuthResponseDTO(false)
        }
    }
}