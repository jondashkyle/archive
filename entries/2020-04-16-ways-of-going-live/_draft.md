# Ways of Going Live

- Focus on three directions

- Using streaming platforms
- Using service APIs
- Rolling your own server

- 15 minutes describing each solution
- Q&A afterwards

### Platforms

- Instagram does not let you use streaming software, however there are [private APIs](https://github.com/dilame/instagram-private-api) which make this possible, however I have had issues with interim disconnects.

- Vimeo
	- Super expensive
	- You basically just get a player
	- No API access unless you are enterprise level

- Use existing video embed w/ custom chat. Disable on the platform.

#### Expenses

### Service API

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


#### Expenses

### Custom Server

- Storage
- Bandwidth
- Time

#### Expenses

### Features

- Chat
- Archiving
- Hosting

### Other Solutions

- WebRTC
	- You would probably only use this to try to avoid setting up a media server.
	- Very good for one-to-one, or a few. Not good for one-to-many streaming.
	- You would probably need to set up a server anyway.
	- https://bloggeek.me/media-server-for-webrtc-broadcast/