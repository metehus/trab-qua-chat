package dev.matehus.chat.userapi.chatuserapi.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.NOT_FOUND)
class NotFoundException(val msg: String) : RuntimeException(msg)
