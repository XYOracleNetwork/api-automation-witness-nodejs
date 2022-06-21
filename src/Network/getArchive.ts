export const getArchive = (): string => {
  return process.env.ARCHIVE || 'temp'
}
