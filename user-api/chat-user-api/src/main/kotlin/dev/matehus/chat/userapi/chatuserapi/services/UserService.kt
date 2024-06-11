package dev.matehus.chat.userapi.chatuserapi.services

import dev.matehus.chat.userapi.chatuserapi.dto.CreateUserDTO
import dev.matehus.chat.userapi.chatuserapi.dto.TokenPayload
import dev.matehus.chat.userapi.chatuserapi.dto.TokenResponseDTO
import dev.matehus.chat.userapi.chatuserapi.entity.User
import dev.matehus.chat.userapi.chatuserapi.exception.BadRequestException
import dev.matehus.chat.userapi.chatuserapi.exception.NotFoundException
import dev.matehus.chat.userapi.chatuserapi.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {
    fun createUser(data: CreateUserDTO): User {
        val user = this.createUserEntity(data)

        return this.userRepository.save(user)
    }

    fun getUser(email: String): User {
        return this.userRepository.getUserByEmail(email) ?: throw NotFoundException("User not found")
    }

    fun authenticate(email: String, password: String): TokenResponseDTO {
        val user = this.getUser(email)

        val passwordMatches = this.passwordEncoder.matches(password, user.passwordHash)

        if (!passwordMatches) {
            throw BadRequestException("Incorrect password!")
        }

        val token = jwtService.generateToken(user.toTokenData())

        return TokenResponseDTO(token)
    }

    fun verifyAuth(token: String, userId: String) {
        val user = this.userRepository.findById(UUID.fromString(userId)).orElseThrow {
            NotFoundException("User not found")
        }

        val parsedToken = token.replace("Bearer ", "")
        val decoded = jwtService.decodeToken(parsedToken)

        if (decoded.id != user.id!!.toString() || decoded.email != user.email) {
            throw BadRequestException("User id mismatch")
        }
    }

    private fun createUserEntity(data: CreateUserDTO): User {
        val passwordHash = passwordEncoder.encode(data.password)

        return User(
            id = null,
            name = data.name,
            lastName = data.lastName,
            email = data.email,
            passwordHash = passwordHash
        )
    }
}