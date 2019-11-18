const implicitFigures = require('markdown-it-implicit-figures')
const namedHeadings = require('markdown-it-named-headings')
const modifyToken = require('markdown-it-modify-token')
const html5Embed = require('markdown-it-html5-embed')
const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const CONTENT_DIR = path.join(__dirname, '../entries')
const API_DIR = path.join(__dirname, '../api')

// Markdown setup
const md = markdownIt({
  html: true,
  linkify: true,
  modifyToken: (token, env) => {
    switch (token.type) {
      case 'image':
        if (token.attrObj.src && token.attrObj.src.substring(0, 4) !== 'http') {
          token.attrObj['data-src'] = path.join('https://wonderful-goldstine-99da43.netlify.com/entries/', env.parent, token.attrObj.src)
          // token.attrObj['loading'] = 'lazy'
          token.attrs.splice(0, 1)
          delete token.attrObj.src
        }
        break
      case 'link_open':
        if (token.href && token.href.substring(0, 4) === 'href') token.attrObj.target = '_blank'
        break
    }
  },
})
  .use(modifyToken)
  .use(namedHeadings)
  .use(implicitFigures)
  .use(html5Embed, {
    html5embed: {
      useImageSyntax: false,
      useLinkSyntax: true,
      isAllowedHttp: true,
      renderFn(properties, attributes) {
        switch (properties.mediaType) {
          case 'video':
            return `
            <figure class="video">
              <video
                src="${properties.url}"
                poster="${properties.url.replace('.mp4', '.jpg')}"
                lazy="tru"
                preload="none"
                controls
              ></video>
            </figure>
          `
          case 'audio':
            return `<audio src="${properties.url}" controls></audio>`
        }
      },
    },
  })

// Clean up
fs.removeSync(API_DIR)

// Create structure
fs.ensureDirSync(API_DIR)

// Grab the files
glob(
  path.join(CONTENT_DIR, '**/*.md'),
  {
    ignore: ['api', 'src', 'node_modules/**/*', 'mailinglist/**/*'].map(dir => path.join(CONTENT_DIR, dir))
  },
  function (er, files)  {
    // For each file
    const processed = files
      .map(getEntryFileStructure)
      .filter(removeEmpty)

    // Create files
    processed.forEach(createStaticEntryFiles)
    createIndexes(processed.filter(entry => entry.index == true), processed)
  }
)

/**
 * Entry File Structure
 */
function getEntryFileStructure (file) {
  const content = frontMatter(fs.readFileSync(file, 'utf8'))
  const entry = {
    path: file.replace(CONTENT_DIR, ''),
    date: '',
    slug: '',
    src: '',
  }

  // If it’s in a directory or a markdown file
  if (entry.path.indexOf('readme.md') > 0) {
    entry.path = entry.path.replace('/readme.md', '')
    entry.src = entry.path
  } else {
    entry.path = entry.path.replace('.md', '')
    entry.src = entry.path.substring(0, entry.path.lastIndexOf('/') + 1) || '/'
  }

  // Set the slug
  entry.slug = entry.path.substring(entry.path.lastIndexOf('/') + 1)

  // Skip if hidden
  if (entry.slug.substring(0, 1) === '_') {
    return undefined
  }

  // Skip if PCT
  if (entry.src.indexOf('2019-04-19-pct') >= 0)  {
    return undefined
  }

  // Remove leading slash
  if (entry.path.substring(0, 1) === '/') {
    entry.path = entry.path.substring(1, entry.path.length)
  }

  // date formatting
  entry.date = entry.slug.split('-').slice(0, 3).join('-')
  content.body = content.body.trim()

  // grab title
  if (content.body.substring(0, 2) === '# ') {
    content.attributes.title = content.body.substring(content.body.indexOf('#') + 1, content.body.indexOf('\n'))
  }

  // remove title
  if (content.body.substring(0, 2) === '# ') {
    content.body = content.body.substring(content.body.indexOf('\n'), content.body.length).trim()
  }

  // Format body as HTML
  content.body = formatMarkdown(entry.src, content.body)

  // Return structure
  return Object.assign(
    { },
    content.attributes,
    { content: content.body},
    entry
  )
}

/**
 * Remove Empty from array
 */
function removeEmpty (noop) {
  return noop !== undefined
}

/**
 * Create Entry Static Files
 */
function createStaticEntryFiles (entry) {
  const entryStaticPath = entry.path.replace(/\//g, '_')
  fs.writeJsonSync(path.join(API_DIR, entryStaticPath + '.json'), entry)
}

/**
 * Create Indexes
 */
function createIndexes (indexes, pages) {
  const structure = pages.reduce((res, cur) => {
    const output = Object.assign({ }, cur)
    output.excerpt = output.content.substring(0, 200)
    res[output.path] = output
    return res
  }, { })

  // Write the index file
  fs.writeJsonSync(path.join(API_DIR, 'index.json'), structure)
  // indexes.forEach(index => {
  //   console.log(index)

  // })
}

/**
 * Format Markdown
 */
function formatMarkdown (parent, body) {
  return md.render(body, { parent: parent })
    .replace(/\[(.*?)\]/g, '($1)')
    .replace(/(\(\^.*?\))/g, '')
    // .replace(/href="#(.*?)/g, `href="#${name}-$1`)
    // .replace(/id="(.*?)/g, `id="${name}-$1`)
    .replace(/\n<p>\s*<\/p>\n/g, '')
    .replace(/<p>\s*(<figure class="video">([\s\S]*|$)<\/figure>)\s*<\/p>/g, '$1')
    .replace(
      /<figure>(.*?)<img alt="c:([\S]*) r:([\S]*)" data-src="([\S|.]*)"/g,
      '<figure class="ratio" style="grid-column: $2"><div style="padding-bottom: $3%;"></div>$1<img loading="lazy" src="$4?nf_resize=fit&w=1800&h=1800" ',
    )
    .replace(
      /<figure>(.*?)<img data-src="([\S|.]*)" alt="c:([\S]*)"/g,
      '<figure style="grid-column: $3;">$1<img loading="lazy" src="$2?nf_resize=fit&w=1800&h=1800" ',
    )
    .replace(
      /<figure>(.*?)<img alt="r:([\S]*)" data-src="([\S|.]*)"./g,
      '<figure class="ratio"><div style="padding-bottom: $2%;"></div>$1<img loading="lazy" src="$3?nf_resize=fit&w=1800&h=1800">',
    )
    .replace(/(?=.*?<figure class=")(?=.*?png).*?(class=")/gm, '<figure class="transparent ')
}
