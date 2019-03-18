//

const express = require('express')
	const app = express()
	app.use(express.json())
	

	// const events = require('./routes/api/events')
	// const users = require('./routes/api/users')
	const albums = require('./routes/api/albums')
	// const photo = require('./routes/api/photo')
	// const FAQs = require('./routes/api/faqs')
	// const committee = require('./routes/api/committees')
	 const descriptions = require('./routes/api/descriptions')
	const MissionAndVision= require('./routes/api/missions_visions')
	 const Rating = require('./routes/api/ratings')
	// const messages = require('./routes/api/messages')
	// const team_members = require('./routes/api/team_members')
	 const achievements = require('./routes/api/achievements')
	// const feedback = require('./routes/api/feedbacks')
	 const library = require('./routes/api/libraries')
	 const subscribers = require('./routes/api/subscribers')
	// const announcements = require('./routes/api/announcements')
	// const club = require('./routes/api/club')
	

	

	

	

	//const committe = require('./committee')
	// app.use('/api/events', events)
	 app.use('/api/MissionAndVision', MissionAndVision)
	 app.use('/api/Rating', Rating)
	// app.use('/api/users', users)
	// app.use('/api/photo', photo)
	// app.use('/api/FAQs', FAQs)
	app.use('/api/albums', albums)
	 app.use('/api/descriptions', descriptions)
	 app.use('/api/subscribers', subscribers)
	// app.use('/api/announcements', announcements)
	// app.use('/api/committee', committee)
	 app.use('/api/feedback',feedback)
	// app.use('/api/library', library)
	// app.use('/api/messages', messages)
	// app.use('/api/team_members', team_members)
	 app.use('/api/achievements', achievements)
	// app.use('/api/club', club)
	

	

	

	app.get('/', (req, res) => {
	    res.send(`<h1>Welcome to AWG Hub</h1>  `);
	})
	

	

	// Direct routes to appropriate files 
	

	

	// Handling 404
	

	app.use((req, res) => {
	    res.status(404).send({err: 'We can not find what you are looking for'});
	 })
	

	

	

	const port = 5000;
	app.listen(port, () => console.log(`Listening on port ${port}`));

