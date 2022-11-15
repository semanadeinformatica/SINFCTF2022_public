package pt.sinf.ctf.private_chat.services

import java.security.KeyPairGenerator
import java.security.Signature
import java.util.*

object SignatureService {

    private val keys = KeyPairGenerator.getInstance("EC").generateKeyPair()

    fun getUserSignature(username: String): String {
        val sig = Signature.getInstance("SHA256WithECDSAInP1363Format")

        sig.initSign(keys.private)
        sig.update(username.encodeToByteArray())

        val signature = sig.sign()

        val encoder = Base64.getEncoder()
        return encoder.encodeToString(signature)
    }

    fun verifyUserSignature(username: String, signature: String): Boolean {
        val decoder = Base64.getDecoder()
        val bytes = decoder.decode(signature)

        if (bytes.size != 64) throw IllegalArgumentException("ECDSA signature must be 64 bytes long")

        val sig = Signature.getInstance("SHA256WithECDSAInP1363Format")

        sig.initVerify(keys.public)
        sig.update(username.encodeToByteArray())

        return sig.verify(bytes)
    }
}
