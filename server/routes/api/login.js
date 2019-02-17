const User = require('../../models/user')
const UserSession = require('../../models/userSession')
const Countries = require('../../models/countries')
const Skills = require('../../models/skills')

module.exports = (app) => {

    app.post('/api/account/register', function (req, res, next) {
        const { body } = req
        const { firstName,
            lastName,
            dob,
            email,
            userName,
            password,
            skills,
            country
        } = body

        if (!firstName || !email || !userName || !password) {
            return res.send({
                ok: false,
                error: "Error: These field(s) cannot be left blank. ".concat(
                    !firstName ? 'FirstName ' : '',
                    !email ? 'Email ' : '',
                    !userName ? 'UserName ' : '',
                    !password ? 'Password' : '')
            })
        }

        User.find({
            email
        }, (err, preUsers) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Server error.`
                })
            } else if (preUsers.length > 0) {
                return res.send({
                    ok: false,
                    error: `Error: User already registered, Go login page to get access.`
                })
            }

            let newUser = new User()
            newUser.firstName = firstName
            newUser.lastName = lastName
            newUser.email = email
            newUser.dob = dob
            newUser.userName = userName
            newUser.password = newUser.generateHash(password)
            newUser.skills = skills
            newUser.country = country
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        ok: false,
                        error: `Error: Database error, could not save.`
                    })
                } else {
                    return res.send({
                        ok: true,
                        success: true
                    })
                }
            })
        })
    })


    app.post('/api/account/login', function (req, res, next) {
        const { body } = req
        const {
            userName,
            password } = body

        if (!userName || !password) {
            return res.send({
                ok: false,
                error: "Error: These field(s) cannot be left blank. ".concat(
                    !userName ? 'UserName ' : '',
                    !password ? 'Password' : '')
            })
        }

        User.find({
            email: userName
        }, (err, users) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Server error.`
                })
            }
            const user = users[0]
            if (user && !user.validPassword(password, user.password)) {
                return res.send({
                    ok: false,
                    error: `Error: Invalid.`
                })
            }

            const userSession = new UserSession()
            userSession.id = user._id
            userSession.isValid = true;
            userSession.save((err, session) => {
                if (err) {
                    return res.send({
                        ok: false,
                        error: `Error: Invalid.`
                    })
                }

                return res.send({
                    ok: true,
                    success: true,
                    token: session._id
                })
            })
        })
    })

    app.get('/api/account/verify', function (req, res, next) {
        const { query } = req
        const { token } = query

        UserSession.find({
            id: token,
            isValid: true
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Internal Server error.`
                })
            }
            if (sessions.length == 0) {
                return res.send({
                    ok: false,
                    error: `Error: Invalid session.`
                })
            }
            return res.send({
                ok: true,
                success: true
            })
        })
    })

    app.get('/api/account/logout', function (req, res, next) {
        const { query } = req
        const { token } = query

        UserSession.findOneAndUpdate({
            id: token,
            isValid: true
        }, { $set: { isValid: false } }, null, (err, sessions) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Internal Server error.`
                })
            }

            if (!sessions) {
                return res.send({
                    ok: false,
                    error: `Error: Invalid session.`
                })
            }

            return res.send({
                ok: true,
                success: true
            })
        })
    })

    app.get('/api/account/getCountries', function (req, res, next) {
        const { query } = req
        let { searchText } = query
        Countries.find({ name: { $regex: searchText, $options: "i" } }, (err, data) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Server error.`
                })
            } else {
                return res.send({
                    ok: true,
                    data
                })
            }
        })
    })

    app.get('/api/account/getSkills', function (req, res, next) {
        const { query } = req
        let { searchText } = query
        Skills.find({ name: { $regex: searchText, $options: "i" } }, (err, data) => {
            if (err) {
                return res.send({
                    ok: false,
                    error: `Error: Server error.`
                })
            } else {
                return res.send({
                    ok: true,
                    data
                })
            }

        })
    })

}