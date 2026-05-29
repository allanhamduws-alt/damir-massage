import "server-only";

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { initialData } from "./seed";
import type { AppData } from "./types";

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dataPath = path.join(dataDir, "app-data.json");

type StoreGlobal = typeof globalThis & {
  __damirStoreQueue?: Promise<unknown>;
};

function cloneInitialData(): AppData {
  return JSON.parse(JSON.stringify(initialData)) as AppData;
}

function ensureDataFile() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(dataPath)) {
    writeFileSync(dataPath, JSON.stringify(cloneInitialData(), null, 2));
  }
}

function atomicWrite(data: AppData) {
  ensureDataFile();
  const tempPath = `${dataPath}.tmp`;
  writeFileSync(tempPath, JSON.stringify(data, null, 2));
  renameSync(tempPath, dataPath);
}

export function readData(): AppData {
  ensureDataFile();

  try {
    const data = JSON.parse(readFileSync(dataPath, "utf8")) as AppData;
    return {
      ...cloneInitialData(),
      ...data,
      services: data.services || [],
      hours: data.hours || initialData.hours,
      bookings: data.bookings || [],
      blocks: data.blocks || [],
      settings: {
        ...initialData.settings,
        ...(data.settings || {}),
      },
    };
  } catch {
    const seeded = cloneInitialData();
    atomicWrite(seeded);
    return seeded;
  }
}

export async function mutateData<T>(mutator: (data: AppData) => T): Promise<T> {
  const storeGlobal = globalThis as StoreGlobal;
  const currentQueue = storeGlobal.__damirStoreQueue || Promise.resolve();

  const operation = currentQueue.then(() => {
    const data = readData();
    const result = mutator(data);
    atomicWrite(data);
    return result;
  });

  storeGlobal.__damirStoreQueue = operation.catch(() => undefined);
  return operation;
}

export function publicData() {
  const data = readData();
  return {
    services: data.services.filter((service) => service.active),
    hours: data.hours,
    settings: data.settings,
  };
}
