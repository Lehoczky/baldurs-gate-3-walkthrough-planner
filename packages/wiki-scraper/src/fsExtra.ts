import { writeFile } from "node:fs/promises"

export async function writeJsonFile(path: string, data: object): Promise<void> {
  await writeFile(path, JSON.stringify(data, null, 2))
}
