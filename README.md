# 郭璞扬个人网站

## AI 岗位匹配器部署

网站静态文件与 `api/match.js` 可一起部署至 Vercel。部署前在 Vercel 项目的 **Settings → Environment Variables** 中添加：

- `OPENAI_API_KEY`：OpenAI API Key（必填）
- `OPENAI_MODEL`：可选，默认 `gpt-4.1-mini`

不要在任何 HTML、JavaScript 或 Git 提交中写入真实 API Key。`api/match.js` 只接收同源 `POST /api/match`，限制 JD 为 5000 字符，并对单 IP 做基础频率限制（10 分钟最多 5 次）。

本地以 `file://` 直接打开页面时，匹配接口不可用是预期行为；部署到 Vercel 后，前端会请求同域的 `/api/match`。
