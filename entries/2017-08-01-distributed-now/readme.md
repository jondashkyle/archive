# Distributed Now

There was supposed to be a big push yesterday for Net Neutrality. In practice, Google posted a modest blog entry, and a few sites displayed lo-res images. It’s impossible to know how long the open web will last, but clearly the situation as we have known it [is not improving](https://www.are.na/jon-kyle-mohr/tech-ethnography). 

There are a few projects pointing towards possible futures that have me very excited despite this.

<!-- more -->

I’m most hopeful of [Dat](http://datproject.org) and [Beaker](https://beakerbrowser.com). You can think of Dat like a mix of Dropbox and Github, but your files aren’t stored on corporate servers. Instead, they are transferred directly between those exchanging the files, with no middleman.

At first Dat was used to transfer large scientific datasets, but it happens to be a great way of distributing websites between peers. Beaker Browser uses Dat to let you self-publish online, save sites for offline, and re-host for others.

Both of these projects have matured to the point of being immediately usable.

So, this weekend, partly as my contribution to whatever the “Net Neutrality awareness” day was, I moved my personal site off of Amazon’s servers and onto Dat, a distributed peer-to-peer system.

You can visit my site now via:

- [https://jon-kyle.com](https://jon-kyle.com)
- [dat://jon-kyle.com](dat://jon-kyle.com)
- [https://hello-jkm.hashbase.io](https://hello-jkm.hashbase.io)
- [dat://7ab5ad001ae720e877fe038ac830e2ca2b87a6beac66d56aed0549619cb2ec6e](dat://7ab5ad001ae720e877fe038ac830e2ca2b87a6beac66d56aed0549619cb2ec6e)

If you visit my site at `https://` in Beaker, you’ll see in the address bar “P2P version available”, which you can click to view the `dat://`, and become a peer.

### Getting started

Since Dat is peer-to-peer, you may be wondering how to ensure it’s constantly accessible, or how to add a domain name. Basic.

Beaker has created a p2p host called [Hashbase](http://hashbase.io). All it requires is pasting the URL to a Dat Archive. You can [start today](https://hashbase.io/). You can also setup your own server with [dathttpd](https://github.com/beakerbrowser/dathttpd) to manage your Dats and auto configure SSL. Going fully manual isn’t much work, too:

- Install Dat on your server
- Clone your site’s Dat Archive
- Configure the Archive directory as your web root
- Add Dat’s `sync` command to `systemctl`, or equivalent.

```
// install dat globally
npm install -g dat

// clone your archive
dat clone dat://7ab5ad001ae720e877fe038ac830e2ca2b87a6beac66d56aed0549619cb2ec6e jon-kyle.com

// sync
dat sync jon-kyle.com
```

Doing this turns your site into a persistent peer, ensuring anyone can access your site anytime, either by visiting your domain, or using Beaker, or anything else using Dat.

### Data

Beaker also exposes interesting [Web APIs](https://beakerbrowser-com-pfrazee.hashbase.io/docs/apis/) to let you modify the contents of a Dat Archive. For instance, instead of storing user data in a proprietary database, you can write data to a Dat Archive, providing users autonomy and ownership.

Dat Archives also have built in version control. History, merging and reverting to previous versions of data are baked in.

### What about blockchain

Without getting into it; while blockchains are promising, their value is derived from artificial scarcity. Far more interesting are truly distributed systems, torrent-like, which [promote abundance](https://twitter.com/yoshuawuyts/status/883284383301603328).

### The future web

Observing the proliferation of machine learning, AI, and AR/VR in our daily lives, I can’t help but be excited about the technology, but increasingly anxious about who the technology will be serving, and what for.

Anyone working with the internet today has a responsibility to take time exploring distributed alternatives, and begin integrating them into their practices, as it will only become increasingly important.