package dev.matehus.chat.userapi.chatuserapi.entity

import dev.matehus.chat.userapi.chatuserapi.dto.TokenPayload
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.UUID

@Entity
data class User(
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    var id: UUID?,

    val name: String,

    val lastName: String,

    @Column(unique = true)
    val email: String,

    val passwordHash: String
) {
    fun toTokenData() = TokenPayload(
        id = id?.toString() ?: throw RuntimeException("missing id"),
        name = name,
        lastName = lastName,
        email = email
    )
}
