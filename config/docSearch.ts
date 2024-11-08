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
    appId: "",
    indexName: "",
    apiKey: "",
  },
}
