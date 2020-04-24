# Ways of Going Live

- Strange times
- Certainly not suggesting live streaming can save us, but it is an obvious option to explore.
- Saw a link on Twitter to a livestream of Robyn DJing. She played some Robin, and the entire video was copyright struck. This is fucked.
- We are focusing on one-to-many streams using proven technology deployed at scale today. It’s fun to speculate, but there are things we can do immediately to help bridge the gap to the promising future we all want. Incremental. Progressive.
- Video can be expensive, both in time and cost. Focusing on economic decisions.
- Focus on three directions, each covering different bases, and slice cross-sections from a few different directions.

## Solutions

- Existing Platforms
	- Things like Youtube, Twitch, or Vimeo
	- Most support streaming through Desktop streaming software.
	- Basically free, but ads, etc…
	- Limited to no control over display
	- Takes a decent amount of time to actually get this working as you’d like it to, and to find the boundaries. They are only really meant for a simple embed.
	- Audience thing… but then locked in w/ followers. Fun to speculate on possible solves, but how to finesse some of this now.

- API Services
	- These are hosted services that you interact with over APIs.
	- Handle things like transcoding pipelines, archiving, etc…
	- Somewhat nascent space.
	- Priced depending upon usage. Think $40/month for an hour-long livestream each week with 100 people tuning in to each
	- A good API will send you a lot of time. If you or your team works with APIs, this will be pretty trivial to implement.

- Custom Server
	- This means real systems architecture, operation, and all that fun stuff.
	- Would likely not want to do this as a small shop — to be smart would require a dedicated engineer.
	- Not as expensive as using an API, but still expensive. Video hosting is a very low margin business. Would only start to see benefits after substantial growth.
	- Likely does not make sense for anything other than a business getting into video streaming.
	- Can still be good to know how the protocols work.

- As an aside, there are plenty of interesting experiments around peer-to-peer video hosting, but we’re not going there.

- 15 minutes describing each solution
- Q&A afterwards

## Platforms

- Youtube/Twitch/Vimeo
	- Pros
		- Free
		- Audience
		- Archiving
	- Cons
		- Ads
		- Little control
		- Poor APIs
		- Automatic copyright strikes

- These platforms *are* formats in themselves. Youtube streams feel different than Twitch, etc…

- Instagram [private APIs](https://github.com/dilame/instagram-private-api) and getting the boot.

### Service APIs

- Vimeo
	- Super expensive
	- You basically just get a player
	- No API access unless you are enterprise level

- Use existing video embed w/ custom chat. Disable on the platform.

- Mux
	- The self professed “Stripe of live streaming”.
	- Really solid API. Offloads all the hard stuff.
	- A demo using Glitch.
	- It’s what this is using
	- Built in archiving
	- Solid transcoding pipeline
	- Not good for 24/7 streaming
	- Reasonable rates
	- Offering to wave fees for events impacted by COVID.

## Custom Server

- Storage
- Bandwidth
- Time

## Features

- Chat
- Archiving
- Hosting

## Other Solutions

- WebRTC
	- You would probably only use this to try to avoid setting up a media server.
	- Very good for one-to-one, or a few. Not good for one-to-many streaming.
	- You would probably need to set up a server anyway.
	- https://bloggeek.me/media-server-for-webrtc-broadcast/

## Additional Resources

- https://docs.google.com/document/d/11wWL_7I4BG76t0V2kw1a4yIeWxUSfGwMQFYdUWAgSnA/edit#