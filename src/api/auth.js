const buildAuthUrl = () => {
  const url = new URL('https://login.eveonline.com/v2/oauth/authorize/')
  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: 'http://localhost:5173/eve_sso_callback/',
    client_id: '308a87f731b343f7bc74f72d0186ff1d',
    scope: 'publicData',
    state: 'yolo'
  })
  url.search = params.toString()
  return url.toString()
}

module.exports = { buildAuthUrl }
