const crypto = require('crypto')

const clientId = '308a87f731b343f7bc74f72d0186ff1d'
const codeVerifier = crypto.randomBytes(32).toString('base64')
console.log('Code Verifier', codeVerifier)
const generateCodeChallenge = () => {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest()
  const base64Url = hash
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return base64Url
}

const codeChallenge = generateCodeChallenge()

const buildAuthUrl = () => {
  const url = new URL('https://login.eveonline.com/v2/oauth/authorize/')
  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: 'http://localhost:5173/eve_sso_callback/',
    client_id: clientId,
    scope: 'publicData',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state: 'yolo'
  })
  url.search = params.toString()
  return url.toString()
}

const getAccessToken = async (code) => {
  console.log('Getting Access Token', code)

  const url = new URL('https://login.eveonline.com/v2/oauth/token')

  const body = {
    data: {
      grant_type: 'authorization_code',
      clientId: clientId,
      code: code,
      code_verifier: codeVerifier
    }
  }

  console.log('Body', body)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'login.eveonline.com'
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestOptions)
    const data = await response.json()

    console.log('Access Token', data)
    return data
  } catch (error) {
    console.error('AHHHHHHHHHHHHHH:', error)
  }
}

module.exports = { buildAuthUrl, getAccessToken }
