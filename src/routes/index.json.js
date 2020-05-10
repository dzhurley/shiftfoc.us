import fetch from 'node-fetch';

import projects from './_projects.js';

export async function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  const lastRes = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=stutterbug42&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`,
  );
  const lastData = await lastRes.json();

  res.end(
    JSON.stringify({
      projects: projects.map(project => {
        return {
          title: project.title,
          slug: project.slug,
        };
      }),
      track: {
        title: `${lastData.recenttracks.track[0].name} by ${lastData.recenttracks.track[0].artist['#text']}`,
        url: lastData.recenttracks.track[0].url,
      },
    }),
  );
}
