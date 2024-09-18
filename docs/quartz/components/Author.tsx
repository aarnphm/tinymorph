import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

import style from "./styles/author.scss"

type Options = {
  maxShown: number
}

const defaultOptions: Options = {
  maxShown: 4,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Author: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    if (!fileData.frontmatter.author) {
      return <></>
    }
    const authors = fileData.frontmatter?.author?.split(",") ?? []

    return (
      <ul class={classNames(displayClass, "author")}>
        {authors.slice(0, opts.maxShown).map((au) => {
          const author = au.trim()
          const gravatar = `https://github.com/${author}.png`
          return (
            <li class="avatar">
              <img src={gravatar} alt={author} />
              <a href={`https://github.com/${author}`} target="_blank">
                {author}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
  Author.css = style

  return Author
}) satisfies QuartzComponentConstructor
