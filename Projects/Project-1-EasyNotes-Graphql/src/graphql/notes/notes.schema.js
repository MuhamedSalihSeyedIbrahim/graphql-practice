const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
    
    type Note{
        _id         : String,
        title       : String,
        content     : String!,
        createdAt   : String,
        updatedAt   : String,
    }

    input NoteInput{
        _id         : String,
        title       : String,
        content     : String!,
    }

    type Message{
        message : String!
    }

    type Query{
        findAll                   : [Note],
        findOne( noteId : String) : Note,
    }
    
    type Mutation{
        create(note :NoteInput)      : Note!,
        update(note : NoteInput)     : Note!,
        delete(noteId : String)      : Message,
    }
`);
