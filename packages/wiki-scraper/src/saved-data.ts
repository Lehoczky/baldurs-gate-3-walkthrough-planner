import fs from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  type SavedWikiData,
  savedWikiDataSchema,
} from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"

type MaybePromise<T> = T | Promise<T>
export interface Storage {
  load: () => MaybePromise<SavedWikiData>
  save: (data: SavedWikiData) => MaybePromise<void>
}
export interface CreateStorageParams {
  dryRun?: boolean
}

export function createStorage(params: CreateStorageParams = {}): Storage {
  const { dryRun = false } = params
  return dryRun ? memoryStorage() : fileStorage()
}

function memoryStorage(): Storage {
  return {
    load: () => {
      return savedWikiDataSchema.parse({})
    },
    save: (data) => {
      const withoutEmptyCategories: any = {}
      for (const [category, value] of Object.entries(data)) {
        if (value.length) {
          withoutEmptyCategories[category] = value
        }
      }
      log.info(JSON.stringify(withoutEmptyCategories, null, 2))
    },
  }
}

function fileStorage(): Storage {
  const DATA_FILE_PATH = path.join("../planner/public/data.json")

  return {
    load: async () => {
      if (!fs.existsSync(DATA_FILE_PATH)) {
        log.info(
          `Saved file not found at ${DATA_FILE_PATH}.\nWill create it later.`,
        )
        return savedWikiDataSchema.parse({})
      }
      const rawData = await readFile(DATA_FILE_PATH, { encoding: "utf8" })
      const json = JSON.parse(rawData)
      return savedWikiDataSchema.parse(json)
    },
    save: async (data) => {
      await writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2))
    },
  }
}
