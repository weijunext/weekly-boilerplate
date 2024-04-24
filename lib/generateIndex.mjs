/**
 * 生成搜索索引
 * Generate search index
 */

import FlexSearch from "flexsearch";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DIR = "content";

const JSON_PATH = path.join(process.cwd(), "public/json/");

/**
 * 移除 Markdown 格式
 * Strip Markdown formatting
 * @param {string} text - 要处理的文本内容 The text content to be processed
 * @returns {string} 移除 Markdown 格式后的文本 The text with Markdown formatting removed
 */
function stripMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, "") // 移除图片 Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // 移除链接 Remove links
    .replace(/`{1,3}.*?`{1,3}/g, "") // 移除代码 Remove code blocks
    .replace(/#{1,6} /g, "") // 移除标题标记 Remove heading markers
    .replace(/[*_~]+.*?[*_~]+/g, "") // 移除强调标记 Remove emphasis markers
    .replace(/>\s.*/g, "") // 移除引用 Remove blockquotes
    .replace(/-{3,}/g, "") // 移除分隔线 Remove horizontal rules
    .replace(/\n+/g, " "); // 替换换行符为空格 Replace newline characters with spaces
}

/**
 * 获取文档内容
 * Get the content of documents
 * @returns {Array} 包含文档内容的数组 An array containing the content of documents
 */
const getDocumentsContent = () => {
  const documents = [];

  /**
   * 遍历目录并处理文件
   * Traverse the directory and process files
   * @param {string} dir - 要遍历的目录路径 The directory path to traverse
   */
  const traverseDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (path.extname(file) === ".mdx") {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContent);

        documents.push({
          id: data.slug,
          title: data.title,
          content,
        });
      }
    });
  };

  traverseDirectory(CONTENT_DIR);
  return documents;
};

// 创建一个 FlexSearch 文档索引
// Create a FlexSearch document index
export const pageIndex = new FlexSearch.Document({
  tokenize: "full",
  cache: 100,
  document: {
    id: "id",
    index: "content",
    store: ["title", "content"],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
});
export const sectionIndex = new FlexSearch.Document({
  cache: 100,
  tokenize: "full",
  document: {
    id: "id",
    index: "content",
    pageId: "pageId",
    store: ["title", "content", "display"],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
});

let pageId = 0;
/**
 * 创建索引并将其导出为 JSON 文件
 * Create the index and export it as JSON files
 */
const createIndex = async () => {
  let pageContent = "";
  ++pageId;

  let documents = getDocumentsContent();

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];

    const slug = doc.id;
    const title = doc.title;
    const content = doc.content;
    const paragraphs = doc.content.split("\n");

    // 添加标题
    // Add the title
    sectionIndex.add({
      id: slug,
      title,
      pageId: `page_${pageId}`,
      content: title,
      ...(paragraphs[0] && { display: paragraphs[0] }), // content 是 title,所以节选第一段 content is the title, so extract the first paragraph
    });

    // 添加文档内容
    // Add the document content
    for (let j = 0; j < paragraphs.length; j++) {
      if (paragraphs[j]) {
        sectionIndex.add({
          id: `${slug}_${j}`,
          title,
          pageId: `page_${pageId}`,
          // content: paragraphs[j],
          content: stripMarkdown(paragraphs[j]),
        });
      }
    }

    // 添加页面本身
    // Add the page itself
    pageContent += `${title} ${content}`;

    pageIndex.add({
      id: pageId,
      title: doc.title,
      // content: pageContent,
      content: stripMarkdown(pageContent),
    });
  }

  await fs.promises.mkdir(JSON_PATH, { recursive: true });

  await new Promise((resolve, reject) => {
    sectionIndex.export((key, data) => {
      fs.writeFile(`${JSON_PATH}${key}.json`, data ? data : "", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

createIndex();
