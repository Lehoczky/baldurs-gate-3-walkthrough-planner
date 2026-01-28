import { readFile, writeFile } from "node:fs/promises"

export async function loadJsonFile(path: string) {
  const file = await readFile(path, { encoding: "utf8" })
  return JSON.parse(file)
}

export async function writeJsonFile(path: string, data: object): Promise<void> {
  await writeFile(path, JSON.stringify(data, null, 2))
}
