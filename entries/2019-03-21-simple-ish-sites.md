# Simple-ish Sites

Never one to leave well enough alone, I’ve made some changes to my personal infrastructure since [last time](/entries/2017-12-27-sites) around. As always, it’s not the technology itself, but what it affords which is important. These affordances are not constants, and as the tech has changed over time so too has my position.

I’ll quickly explain the what, and then elaborate on the why.

This site is built with [*Vue*](https://vuejs.org/) and deployed with [*Netlify*](https://www.netlify.com/) (frontend). The content is hosted with [*Github*](https://github.com). Different than the last stack, but shares a common focus on archivability and portability.

<!-- more --> 

## Deployment

Deployment should be easy and require essentially no maintenance once configured. I became tired of configuring Nginx and administering servers.

Previously my site was deployed with Dat. It is worth distinguishing between Dat the protocol and the tools built with Dat.

While the mission of the protocol is very aligned with ideals I hold, the tooling currently available (such as Homebase) is not stable enough for projects which require consistent uptime, and is better suited for experimentation. This is not a criticism of the tools, they’re exciting and continue to point towards promising futures.

I plan on making the site available over Dat soon, but more as a gesture, and less as a solution for deployment. That isn’t to diminish the role of gesture—it’s crucial.

As a useful aside, Netlify provides a feature for pre-rendering single page applications, which is used to support opengraph tags. It also onboard the serverless hype-train and supports lamdas, which I’ll get into later.

## Development

If you saw last year’s list you’ll notice a strong position on React, and it remains true, which is why I was using [Choo](https://github.com/choojs/choo).

Choo the front-end framework is great for certain types of sites, but is perhaps a bit ahead of its time in how it manages `dom` morphing natively, as opposed to implementing a virtual `dom`.

By and large my favorite feature of Choo is it’s [philosophy](https://github.com/choojs/choo#philosophy). Particularly that of lightness, both metaphorically and practically, as well as its stance on frameworks.

Fortunately these aspirations are making their way into better known frameworks like React and Vue through features like `hooks`, as well as pushing along specifications like those seen in [`lit-html`](https://github.com/polymer/lit-html) and web components.

Ultimately I find state a (very) useful concept, so Vue has been my recent go to. The sturdiness of the `vue-cli` for development serving and production bundling made the decision easier, having resolved the Choo ecosystem’s choice of Browserify and the similarly dissipating updates.

I’d like to say that it is not easy to maintain and sustain open source projects like Choo and Browserify. The contributors behind them should be applauded, not only for having volunteered their efforts, but also emphasizing diversity and cultivation of healthy discourse within the development community. The hottest club in `www` was Choo IRC for a while.

This said, it’s encouraging to see the rippling influence propagate outwards to other projects through the popularization of some core concepts.

## Management

The last version of my site used [Enoki](https://enoki.site), an experimental CMS for generating pseudo-static sites using a directory structure and `md` files. It included some tools used to read static files into content. When visiting in a Dat-enabled browser it’d utilize the `WebArchive` API to do this realtime, and which exposes the same methods as Node’s `fs` module for parity. Fallback for non-Dat used `fs` to write static `json` on build.

With archivability and portability in mind, the static directory structure as the source of truth covers both of these of these priorities. Because static files enable easy portability I’m not so concerned about where that directory exists as it can easily go elsewhere.

I rarely used the Enoki editor to manage content. in favor of editing files directly with [iA Writer](https://ia.net/writer). The ability to manage content on my phone while offline became became a priority. Fortunately writer has a solid iOS app which supports the Files application for syncing content. Turns out there is another iOS app, [Working Copy](https://workingcopyapp.com), for working with Git repositories and also supports Files. This enables you to edit files in Git repositories with iA Writer, plus all the benefits of Git. I decided to create a repository for all of the content, not a big deal when using [Git Large File Storage](https://git-lfs.github.com). 

---

Let’s put it all together. There are two repositories. One for [the site](https://github.com/jondashkyle/jon-kyle.com), and the other for [the content](https://github.com/jondashkyle/archive). The site is deployed with Netlify, and the content remains on Github.

Alongside the single page application for the site is a [Lambda function](https://www.netlify.com/features/functions/). [This function](https://github.com/jondashkyle/jon-kyle.com/blob/master/src/lambda/contentstate.js) connects to the Github API and reads the directory into JSON following the simple content state[^1] specification. I guess this is serverless?

When visiting the site, we make a request to the lamda containing the current location. It looks something like this: `fetch('/contentstate?url=/entries)`. We then merge the response into our content state.

When pushing to the content repository, Github sends a web hook to the lamda invalidating the cache stored in memory. This leads to super quick responses.

Ultimately I’m pretty happy with this, and see it lasting for quite a while. I like the notion of a knowledge repository. A single versioned space containing all of my writing is very future proof. If Github goes to hell I can just clone the repository elsewhere and write another function using whatever tools available to read the directory into `json` using the content state specification.

---

Many of the frustrations I had which led me to my previous stack remain today. That of platform proliferation, surveillance capitalism, and much of life being lived within walled gardens. While it’s critical to have vision, it is important not to lose sight of what’s in front of you. Provided the tools you have, what is possible with them?

Of course we want a better internet. How we get there is an open question.

[^1]: Content state is a simple specification for formatting state intended to map to pages on a websites. The two formalities are ① The object is flat. ② Parent keys are urls. For example: `{ '/': { title: 'Home' }, '/about': { title: 'About' } }`
