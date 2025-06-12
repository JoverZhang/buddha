import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import container from "markdown-it-container"

const md = new MarkdownIt()
md.use(container, "master", {
  render(tokens, idx) {
    const token = tokens[idx]
    if (token.nesting === 1) {
      return `<details class="annotation annotation-master"><summary>大师注解</summary>\n`
    } else {
      return `</details>\n`
    }
  },
})
md.use(container, "modern")


export async function getPost(book: string, slug: string) {
  const filePath = path.join(process.cwd(), "content", book, `${slug}.md`)
  const raw = await fs.readFile(filePath, "utf-8")
  const { data, content } = matter(raw)
  const html = md.render(content)

  return {
    meta: data,
    html,
  }
}
