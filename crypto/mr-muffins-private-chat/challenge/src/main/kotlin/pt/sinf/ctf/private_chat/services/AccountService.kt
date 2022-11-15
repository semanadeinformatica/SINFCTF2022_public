package pt.sinf.ctf.private_chat.services

object AccountService {

    enum class RegisterStatus  {
        SUCCESS, ACCOUNT_EXISTS;
    }

    private val registeredUsers = HashSet<String>()
    private val activeUsers = HashSet<String>()

    fun registerUser(username: String): RegisterStatus {
        if (isUserRegistered(username)) {
            return RegisterStatus.ACCOUNT_EXISTS
        }

        synchronized(registeredUsers) {
            registeredUsers.add(username)
        }

        return RegisterStatus.SUCCESS
    }



    fun isUserRegistered(username: String): Boolean {
        if (username == "system")
            return true

        return synchronized(registeredUsers) {
            registeredUsers.contains(username)
        }
    }

    fun login(username: String): Boolean {
        if (username == "system")
            return false

        return synchronized(activeUsers) {
             if (activeUsers.contains(username)) {
                 return@synchronized false
             }

            activeUsers.add(username)
            return@synchronized true
        }
    }

    fun signout(username: String) {
        synchronized(activeUsers) {
            activeUsers.remove(username)
        }
    }
}