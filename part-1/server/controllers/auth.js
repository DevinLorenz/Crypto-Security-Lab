const users = []

const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].passHash)
          if (authenticated) {
            console.log('User Authenticated')
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
            return res.status(200).send(userToReturn)
          }
          
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const { username, password, email, firstName, lastName } = req.body
        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt);

        let newUserObj = {username, passHash, email, firstName, lastName}
        let userToReturn = {...newUserObj}
        delete userToReturn.passHash
        console.log('Registering User')
        console.log(newUserObj)
        users.push(newUserObj)
        res.status(200).send(userToReturn)
    }
}