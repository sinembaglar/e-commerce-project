import md5 from 'blueimp-md5'

export function getGravatarUrl(email, size = 80) {
  const hash = md5(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`
}
