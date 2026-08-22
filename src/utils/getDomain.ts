export function getDomain(link: string): string {
  return link.replace(/^(https?:\/\/)?(www\.)?([^/]+).*/, "$3")
}