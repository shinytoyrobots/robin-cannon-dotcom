---
title: Setting up a Gatsby site, and Remembering How to be a Developer!
description: It's been several years since I was a hands-on developer. My focus on management means that my coding skills have atrophied. But I needed a catalyst to get me interested in re-learning some of those skills.
date: "2019-02-26"
keywords: [gatsby, coding, blogging, learning]
---

I've always called myself a developer, but I'm not one.  That's been the case for the last few years, but it's a strange thing to admit.

I took a managerial role with no hands-on coding. I'd been a manager before, but always doing development work, too. And I love management. I enjoy the broader strategic view, being able to mentor and support talent. I think I'm good at it, and it's still my career direction.

But I started to miss coding. I miss it for the enjoyment it gives me, building things and solving problems. It's also important for me as a manager. I'm managing developers. It's not good for me, or them, if I'm too removed from their day-to-day work.

This Gatsby blog is part of a resolution to remember to be a maker, as well as a manager. And it has brought home quite how rusty I am!

It's a basic installation of the gatsby-starter-blog. It's hosted on Netlify. But here are the simple changes I've made to date. And a couple of things that have tripped me up.

## Sortable blog post folders, but readable slugs

I thought all the posts in the */blog* folder could get disorganized. I wanted to add some date organization to the posts, but I didn't want all my blog post slugs to include those dates. I made a small change to gatsby-node.js.

`const value = createFilePath({ node, getNode })`

changed to

`const value = createFilePath({ node, getNode }).replace(/\d{8}--/, '')`

I can name all post folders in the sortable format `YYYYMMDD--name-of-post`. But the slug will remove the date prefix, and will be `name-of-post`.

[View the Pull Request](https://github.com/shinytoyrobots/robin-cannon-dotcom/pull/1)

## Updated the typography.js theme, and fixed a font color issue

I changed the type theme to the Judah theme. I also needed to install the _Vollkorn_ and _Roboto-Condensed_ theme. This was all easy using npm packages.

I updated link colors by creating a global.css file. This worked fine when running `gatsby develop` locally. When I create the static build, though, those colors kept getting overriden. So half my links were the correct color, and the other half were inheriting <span style="color: #e51937">#e51937</span>.

Still not sure where that hex value was being generated (it shows up in render-page.js). But I deleted the global.css and instead used `overrideThemeStyles` in */utils/typography.js*. This seems to apply the correct link styling.

[View the Pull Request](https://github.com/shinytoyrobots/robin-cannon-dotcom/pull/4)

## Added more "frontmatter" to blog posts

"Frontmatter" is metadata for each blog post. By default, there is a `title` and `date` value. The Gatsby blog starter also generates a `description` for each blog post from an excerpt of the text.

I wanted post-specific keywords, and a curated post description instead of an auto-generated one. 

Each blog post now has the following frontmatter:

```
---
title: Title of post
description: Curated description
date: "YYYY-MM-DD"
keywords: [array, of, keywords]
---
```

I added my new values to `gatsby-node.js`:

```
frontmatter {
    title
    description
    keywords
}
```

And then I updated the SEO section of `src/template/blog-post.js`:

```
<SEO 
    title={post.frontmatter.title} 
    description={post.frontmatter.description || ...}
    keywords={post.frontmatter.keywords || ...} 
 />
 ```

 After doing that, the blog posts still weren't pulling the new information from each post. [Jason Lengstorf](https://www.twitter.com/jlengstorf) pointed out that I might need to actually query the frontmatter in the blog template!

 ```
 export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    ...
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
      }
    }
  }
`
```
Now everything works correctly. I have a little more control over the SEO for individual blog posts.

[View the Pull Request](https://github.com/shinytoyrobots/robin-cannon-dotcom/pull/6)

## It's early days in my refresher project!

I feel like someone who knows a foreign language, hasn't spoken it for a few years, and then visits that country again. I'm rusty, but the underlying philosophy and practice of coding is still familiar. 

I needed a project to get excited about independent of re-learning development. Getting back into writing, and setting up a blog, is something I wanted to do anyway. Now I have motivation to build a good platform for that writing. And that forces me to write more code.

A few things on the agenda:

- Fix some analytics stuff
- Some proper styling throughout the site. Not only a downloaded theme and link colors.
- Adding search (once there are a few more posts to search).
- Categories and tags for posts, and category/tag pages.
- Maybe adding commenting functionality (haven't decided if I want it).