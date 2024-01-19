let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }]

const authenticate = (username, password) => {
  console.log(username, password)
  const user = users.find((x) => x.username === username && x.password === password)
  console.log(user)
  if (!user) throw new Error('Username or password is incorrect')

  return ok({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token'
  })
}

function ok(body) {
  return { ok: true, text: () => Promise.resolve(JSON.stringify(body)) }
}

module.exports = { authenticate }
