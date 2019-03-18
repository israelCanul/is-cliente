import Oidc from 'oidc-client'

var mgr = new Oidc.UserManager(
  {
    // userStore: new Oidc.WebStorageStateStore(),
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: process.env.AUTH_URL,
    client_id: 'clientNarileasi',
    redirect_uri: window.location.origin + '/static/callback.html',
    response_type: 'id_token token',
    scope: 'openid profile narilearsi',
    post_logout_redirect_uri: process.env.LOGOUT_URL,
    silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 10,
    // filterProtocolClaims: true,
    loadUserInfo: true
  }
)

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

mgr.events.addUserLoaded(function (user) {
  // console.log('New User Loaded：', arguments)
  // console.log('Acess_token: ', user.access_token)
})

mgr.events.addAccessTokenExpiring(function () {
  // console.log('AccessToken Expiring：', arguments)
})

mgr.events.addAccessTokenExpired(function () {
  // console.log('AccessToken Expired：', arguments)
  // alert('Session expired. Going out!')
  mgr.signoutRedirect().then(function (resp) {
    // console.log('signed out', resp)
  }).catch(function (err) {
    console.log(err)
  })
})

mgr.events.addSilentRenewError(function () {
  // console.error('Silent Renew Error：', arguments)
})

mgr.events.addUserSignedOut(function () {
  // alert('Going out!')
  localStorage.clear()
  // console.log('UserSignedOut：', arguments)
  // mgr.removeUser()
  mgr.signinRedirect().then(function (resp) {
    console.log('resigned in', resp)
  }).catch(function (err) {
    console.log(err)
  })
})

export default class SecurityService {

  // constructor() {
  //   console.log('Construtor')
  // }
  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          self.user = user
          self.signedIn = false
          return resolve(self) // antes regresaba null
        } else {
          self.user = user
          self.signedIn = true
          return resolve(self)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  signIn () {
    console.log('sigin')
    mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }

  signOut () {
    // var self = this
    mgr.signoutRedirect().then(function (resp) {
      localStorage.clear()
    }).catch(function (err) {
      console.log(err)
    })
  }

  getToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getProfile () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
  getIdToken() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getSessionState() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getAcessToken() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getScopes() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
}
