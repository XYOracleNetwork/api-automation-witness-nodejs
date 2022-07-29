export type PartialRecord<K extends keyof Record<string, unknown>, T> = {
  [P in K]?: T
}
