package dev.matehus.chat.userapi.chatuserapi.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import dev.matehus.chat.userapi.chatuserapi.dto.TokenPayload
import io.jsonwebtoken.Jwt
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.io.Encoders
import io.jsonwebtoken.security.Keys
import io.jsonwebtoken.security.SecureDigestAlgorithm
import io.jsonwebtoken.security.SignatureAlgorithm
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import javax.crypto.SecretKey


@Component
class JwtService {

    @Value("\${jwt.secret}")
    private lateinit var secret: String

    private lateinit var signingKey: SecretKey

    private val mapper = ObjectMapper()

    @PostConstruct
    fun init() {
        signingKey = Keys.hmacShaKeyFor(secret.toByteArray())
    }

    fun generateToken(payload: TokenPayload): String {
        val payloadJson = mapper.writeValueAsString(payload)

        return Jwts.builder()
            .claim("id", payload.id)
            .claim("name", payload.name)
            .claim("lastName", payload.lastName)
            .claim("email", payload.email)
            .subject(payload.id.toString())
            .signWith(signingKey, Jwts.SIG.HS256)
            .compact()
    }

    fun decodeToken(token: String): TokenPayload {
        val parsed = Jwts.parser()
            .verifyWith(signingKey)
            .build()
            .parseSignedClaims(token)
            .payload

        return TokenPayload(
            id = parsed["id"] as String,
            name = parsed["name"] as String,
            lastName = parsed["lastName"] as String,
            email = parsed["email"] as String,
        )
    }
}