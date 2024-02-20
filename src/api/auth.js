const crypto = require('crypto')

const clientId = '308a87f731b343f7bc74f72d0186ff1d'

const buildAuthUrl = () => {
  const codeVerifier = crypto
    .randomBytes(32)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

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
  return { url: url.toString(), codeVerifier: codeVerifier }
}

const getAccessToken = async (code, codeVerifier) => {
  console.log('Getting Access Token', code, codeVerifier)

  const url = new URL('https://login.eveonline.com/v2/oauth/token')

  const formValues = `grant_type=authorization_code&client_id=${clientId}&code=${code}&code_verifier=${codeVerifier}`
  console.log('Form Values', formValues)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'login.eveonline.com'
    },
    body: formValues
  }
  console.log(requestOptions)
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
