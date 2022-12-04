const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        comments:{ type: [{
            userName: String,
            text: String
        }], required: true },
        dislikesCount: { type: [{
            userName: String,
        }], required: true },
        likesCount: { type: [{
            userName: String,
        }], required: true },
        userInteractions: { type: [{
            userName: String,
            type: Boolean,
        }], required: true },
        isPublished: { type: Boolean, required: true },
        publishedAt: { type: String, required: true },
        publishedAtObject: { type: Date },
        userName: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
