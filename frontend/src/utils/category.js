const GENDER_SLUGS = { k: 'kadin', e: 'erkek' }

export function getCategoryPath({ id, code, gender }) {
  const categoryName = code.split(':')[1]
  const genderSlug = GENDER_SLUGS[gender] || gender
  return `/shop/${genderSlug}/${categoryName}/${id}`
}
