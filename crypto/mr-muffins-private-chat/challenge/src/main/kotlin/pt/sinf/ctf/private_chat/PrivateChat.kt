package pt.sinf.ctf.private_chat

import pt.sinf.ctf.private_chat.services.AccountService
import pt.sinf.ctf.private_chat.services.BroadcastService
import java.net.ServerSocket
import java.time.Instant

fun main() {

    val flag = System.getenv("FLAG") ?: throw IllegalStateException("FLAG environment variable not found")

    AccountService.registerUser("admin")

    Thread {
        BroadcastService.send("admin", "system", "Hello admin, thank god they made this new totally safe chat.")

        while (true) {
            BroadcastService.send("admin", "system", "Here goes the secret code: $flag")
            Thread.sleep(30000)
            BroadcastService.send("admin", "system", "Did you not receive my previous message? I'll send the code again...")
        }
    }.start()

    val socket = ServerSocket(8000)
    socket.use {

        println("[${Instant.now()}] [SERVER] Port => ${socket.localPort}")

        while (true) {
            val connection = socket.accept()
            ChatServer(connection).start()
        }

    }

}