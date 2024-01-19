let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }]
console.log('here')

// route functions

const authenticate = (username, password) => {
  console.log(username, password)
  const user = users.find((x) => x.username === username && x.password === password)

  if (!user) return error('Username or password is incorrect')

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

function error(message) {
  return { status: 400, text: () => Promise.resolve(JSON.stringify({ message })) }
}

module.exports = { authenticate }
