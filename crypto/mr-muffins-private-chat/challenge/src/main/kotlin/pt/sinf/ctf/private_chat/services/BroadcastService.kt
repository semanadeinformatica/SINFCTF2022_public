package pt.sinf.ctf.private_chat.services

import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatterBuilder
import java.time.format.FormatStyle
import java.util.*
import kotlin.collections.HashMap

object BroadcastService {

    private val receivers = HashMap<String, (String) -> Unit>()
    private val missedMessages = HashMap<String, StringBuffer>()

    private val formatter = DateTimeFormatterBuilder()
        .appendLocalized(FormatStyle.MEDIUM, FormatStyle.MEDIUM)
        .toFormatter(Locale.forLanguageTag("pt-PT"))

    fun listen(username: String, block: (String) -> Unit) {
        synchronized(receivers) {
            receivers.put(username, block)
        }

        synchronized(missedMessages) {
            val messages = missedMessages[username]?.toString() ?: return@synchronized
            missedMessages.remove(username)

            block(messages)
        }
    }

    fun disconnect(username: String) {
        synchronized(receivers) {
            receivers.remove(username)
        }
    }

    fun send(receiver: String, sender: String, content: String) {

        val message = "[${
            formatter.format(
                LocalDateTime.now(
                    ZoneId.of("Europe/Lisbon")
                )
            )
        }] @$sender: $content\n"

        synchronized(receivers) {
            val executor = receivers[receiver] ?: {
                synchronized(missedMessages) {
                    if (!missedMessages.containsKey(receiver)) {
                        missedMessages[receiver] = StringBuffer()
                    }

                    missedMessages[receiver]!!.append(message)
                }
            }

            executor(message)
        }
    }
}