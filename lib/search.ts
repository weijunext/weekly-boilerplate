'use server'

import fs from 'fs';
import path from 'path';
import { sectionIndex } from "./generateIndex.mjs";

const JSON_PATH = path.join(process.cwd(), 'public/json/')

/**
 * 加载索引
 * Load the index
 */
const loadIndex = async () => {
  // 获取 JSON 文件名列表(不包括扩展名)
  // Get the list of JSON file names (without extension)
  const keys = fs
    .readdirSync(JSON_PATH, { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name.slice(0, -5))

  // 遍历每个 JSON 文件,读取数据并导入到 sectionIndex 中
  // Iterate over each JSON file, read the data, and import it into sectionIndex
  for (let i = 0, key; i < keys.length; i += 1) {
    key = keys[i]

    const fullPath = `${JSON_PATH}${key}.json`
    const data = fs.readFileSync(fullPath, 'utf8')

    sectionIndex.import(key, data ?? null)
  }
}
loadIndex()

/**
 * 执行搜索
 * Perform the search
 * @param {string} value - 搜索关键词 The search keyword
 * @returns {Promise<Array>} 搜索结果的 Promise 对象 A Promise object containing the search results
 */
const doSearch = async (value: string) => {

  if (!value) {
    return
  }

  // 使用 sectionIndex 执行搜索,并返回结果
  // Use sectionIndex to perform the search and return the results
  const results = sectionIndex.search(value, { enrich: true, suggest: true })
  // console.log(results);

  return results
}

export {
  doSearch
};

