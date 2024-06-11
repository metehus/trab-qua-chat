package dev.matehus.chat.userapi.chatuserapi.dto

data class CreateUserDTO(
    val name: String,
    val lastName: String,
    val email: String,
    val password: String
)
