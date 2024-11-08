/**
 * 免费申请 algolia 文档搜索功能：https://docsearch.algolia.com/apply/
 */
interface DocSearchSiteConfig {
  docSearch: {
    appId: string;
    indexName: string;
    apiKey: string;
  };
}
export const docSearchConfig: DocSearchSiteConfig = {
  docSearch: {
    appId: process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID || "",
    indexName: process.env.NEXT_PUBLIC_DOC_SEARCH_INDEX_NAME || "",
    apiKey: process.env.NEXT_PUBLIC_DOC_SEARCH_API_KEY || "",
  },
}
