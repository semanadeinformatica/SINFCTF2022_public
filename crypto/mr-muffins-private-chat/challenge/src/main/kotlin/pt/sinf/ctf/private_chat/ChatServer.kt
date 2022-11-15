package pt.sinf.ctf.private_chat

import pt.sinf.ctf.private_chat.services.AccountService
import pt.sinf.ctf.private_chat.services.BroadcastService
import pt.sinf.ctf.private_chat.services.SignatureService
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.IOException
import java.lang.Exception
import java.lang.IllegalStateException
import java.net.Socket
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.chrono.Chronology
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeFormatterBuilder
import java.time.format.FormatStyle
import java.util.*

class ChatServer(private val socket: Socket) : Thread() {

    private val input = BufferedReader(socket.getInputStream().reader())
    private val output = BufferedWriter(socket.getOutputStream().writer())

    private fun <T> ask(query: String, block: (String) -> T): T {
        output
            .append("> Please provide $query:\n")
            .append(">> ")
            .flush()

        val answer = input.readLine()?.trim() ?: throw IOException("EOF reached")
        output.append('\n')

        return block(answer)
    }

    private fun select(vararg options: Pair<String, () -> Unit>) {
        output.append("| Please select one of the following options:\n\n")

        for (index in options.indices) {
            output.append("[${index + 1}] ${options[index].first}\n")
        }

        output.append('\n')

        val selectedIndex = ask("your option") {
            val option = it.toIntOrNull(10)
            if (option == null || option < 1 || option > options.size) {
                throw IllegalArgumentException("Invalid option")
            }

            return@ask option - 1
        }

        options[selectedIndex].second()
    }

    override fun run() {
        try {
            println("[${Instant.now()}] [CHAT] Open => ${socket.remoteSocketAddress}")

            output
                .append("| Welcome to Mr. Muffin's private chat server!\n")
                .append("| This server is powered by Java 17.0.2!\n\n")

            select(
                "Create a new account" to {

                    val username = ask("the username you'd like") { it }
                    val status = AccountService.registerUser(username)
                    if (status == AccountService.RegisterStatus.ACCOUNT_EXISTS) {
                        throw IllegalArgumentException("Username $username already exists")
                    }

                    output
                        .append("| You have successfully registered the account with the username \"$username\"\n")
                        .append("| Please save the following ECDSA signature for login:\n\n")
                        .append(SignatureService.getUserSignature(username))
                        .append('\n')

                },
                "Login with an existing account" to {

                    val username = ask("the username of the account you want to login into") { it }
                    if (!AccountService.isUserRegistered(username)) {
                        throw IllegalArgumentException("No account with the username \"$username\" found")
                    }

                    val signature = ask("the ECDSA signature for login") { it }
                    if (!SignatureService.verifyUserSignature(username, signature)) {
                        throw IllegalArgumentException("Invalid signature for account with username \"$username\"")
                    }

                    if (!AccountService.login(username)) {
                        throw IllegalStateException("User \"$username\" is already logged in")
                    }

                    output.append("| Login successful!\n\n")

                    try {

                        var running = true
                        while (running) {

                            select(
                                "Read incoming messages" to {
                                    output.append("| Press ENTER to stop receiving messages and return to the menu\n\n").flush()

                                    BroadcastService.listen(username) { message ->
                                        synchronized(output) {
                                            output.append(message).flush()
                                        }
                                    }

                                    input.readLine()
                                    BroadcastService.disconnect(username)
                                },
                                "Send message" to {
                                    val receiver = ask("the receiver") { it }
                                    val message = ask("your message") { it }

                                    BroadcastService.send(
                                        receiver,
                                        username,
                                        message
                                    )
                                },
                                "Exit" to {
                                    running = false
                                }
                            )

                        }

                    } finally {
                        AccountService.signout(username)
                    }
                }
            )

        } catch (e: Exception) {
            when (e) {
                is IllegalArgumentException, is IllegalStateException -> {
                    output
                        .append("| Connection terminated.\n")
                        .append("| Reason: ${e.message}\n")
                }
                is IOException -> {
                    e.printStackTrace()
                }
                else -> throw e
            }
        } finally {
            println("[${Instant.now()}] [CHAT] Close => ${socket.remoteSocketAddress}")

            if (!socket.isOutputShutdown) {
                output.flush()
                socket.shutdownOutput()
            }

            if (!socket.isInputShutdown) socket.shutdownInput()
            if (!socket.isClosed) socket.close()
        }
    }
}
