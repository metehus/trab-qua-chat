package dev.matehus.chat.userapi.chatuserapi.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
class BadRequestException(val msg: String) : RuntimeException(msg)
