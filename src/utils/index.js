export const formatDate = (isoDate: string): string => {
  const d = new Date(isoDate)
  return d.toLocaleDateString('id-ID')
}
export const capitalize = (str: string) => {
  if (str.length === 0) return str

  const chunks = str.split(' ')
  const capitalizeChunks = chunks.map(str => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  })

  return capitalizeChunks.join(' ')
}
