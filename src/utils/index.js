export const formatDate = (isoDate: string): string => {
  const d = new Date(isoDate)
  return d.toLocaleDateString('id-ID')
}
