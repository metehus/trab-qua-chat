package dev.matehus.chat.userapi.chatuserapi.repository

import dev.matehus.chat.userapi.chatuserapi.entity.User
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface UserRepository: CrudRepository<User, UUID> {
    fun getUserByEmail(email: String): User?
}