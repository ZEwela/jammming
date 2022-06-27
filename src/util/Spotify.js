const clientId = '51d9a7cf9f3340a2b0fa8d4a9ad6e625';
const redirectURI = "http://localhost:3000";
let accessToken;
let userId;

const Spotify = {
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } 
        // check for the access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if (accessTokenMatch && expiresInMatch)  {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); 
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }               
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }, 

    async getCurrentUserId(){
        if (userId){
            return userId;
        }

        const token = Spotify.getAccessToken(); 
        const header = {Authorization: `Bearer ${token}`};

        return await fetch(`https://api.spotify.com/v1/me`, 
         {
            headers: header              
        })
        .then(response => response.json())
        .then(jsonResponse => {
                userId = jsonResponse.id;
                return userId;
            }
        )
    },


    async getUserPlaylists(){
        const token = Spotify.getAccessToken();
        const userID = await Spotify.getCurrentUserId();

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`
            }               
        })
        .then(response => response.json())
        .then(jsonResponse => {
            const userPlaylists = jsonResponse.items.map(playlist => ({
                playlistId: playlist.id,
                playlistName: playlist.name
            })
            )
            return userPlaylists;
        })
    },
    async savePlaylist(playlistName, playlistTracks, id, trackURIsToDelete) {

        if (!playlistName || !playlistTracks) {
            return;
        }
        const token = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${token}`};
        const userID = await Spotify.getCurrentUserId();


       if (id) {
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${id}`, {  
                headers: headers,
                method: 'PUT',
                body: JSON.stringify({ 
                    name: playlistName,
                })
            }).then(
                fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`,{  
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({ 
                        uris: playlistTracks
                    })
                })
            )} else {


        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: playlistTracks })
                })
            })
        }
    },

    getPlaylist(id) {
        const token = Spotify.getAccessToken();
        
        return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        }
        ).then(response => response.json()
        ).then(jsonResponse => {
            const retrivedPlaylist = jsonResponse.items.map(item => (
                {
                    id: item.track.id,
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    album: item.track.album.name,
                    uri: item.track.uri  
                })
            )
            return retrivedPlaylist;
        }) 
    }
}

export default Spotify;