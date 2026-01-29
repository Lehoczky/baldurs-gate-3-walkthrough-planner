import fs from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  type SavedWikiData,
  savedWikiDataSchema,
} from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"

const DATA_FILE_PATH = path.join("../planner/public/data.json")

export async function getSavedData(): Promise<SavedWikiData> {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    log.info(
      `Saved file not found at ${DATA_FILE_PATH}.\nWill create it later.`,
    )
    return savedWikiDataSchema.parse({})
  }
  const rawData = await loadJsonFile(DATA_FILE_PATH)
  return savedWikiDataSchema.parse(rawData)
}

export async function saveData(data: SavedWikiData): Promise<void> {
  await writeJsonFile(DATA_FILE_PATH, data)
}

async function loadJsonFile(path: string) {
  const file = await readFile(path, { encoding: "utf8" })
  return JSON.parse(file)
}

async function writeJsonFile(path: string, data: object) {
  await writeFile(path, JSON.stringify(data, null, 2))
}
