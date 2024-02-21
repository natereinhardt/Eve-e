const clientId = '308a87f731b343f7bc74f72d0186ff1d'

const buildAuthUrl = () => {
  console.log(global.codeVerifier, global.codeChallenge)
  const url = new URL('https://login.eveonline.com/v2/oauth/authorize/')
  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: 'http://localhost:5173/eve_sso_callback/',
    client_id: clientId,
    scope: 'publicData',
    code_challenge: global.codeChallenge,
    code_challenge_method: 'S256',
    state: 'yolo'
  })
  url.search = params.toString()
  return url.toString()
}

const getAccessToken = async (code) => {
  console.log(global.codeVerifier)
  console.log('Getting Access Token', code, global.codeVerifier)

  const url = new URL('https://login.eveonline.com/v2/oauth/token')

  const formValues = `grant_type=authorization_code&client_id=${clientId}&code=${code}&code_verifier=${global.codeVerifier}`
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
