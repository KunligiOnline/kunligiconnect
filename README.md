**KunligiConnect** is a realtime chat application designed to facilitate connection between strangers through vulnerable and challenging conversations. KunligiConnect was designed for [Kunligi](https://www.kunligi.com/), a NY based organization that facilitates connection-building conversations through in-person gatherings. When the pandemic began, Kunligi could no longer host these gatherings, so KunligiConnect was created to translate the model pioneered by Kunligi into the digital space.

### How it works

- Create an account and select the type of conversation you are interested in having - 'Deep Connection' or 'Difficult Topics'.
- When another user is interested in the same type of conversation, you two will be immediately paired and redirected to a private chat room.
- The chat room will have a prompt that that is designed to encourage the chat participants to open up and be vulnerable (e.g. "When is the last time you cried?).
  - To select a new question, select 'New question' and both users in the chat will receive the same new question.
  - To choose a new chat partner, select 'New partner' and both users in the chat will be redirected to new private chat rooms.

![Gif of new chat](https://i.imgur.com/N36Gmc1.gif)

## To Run Your Own Version

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies

```bash
npm install
```

- To run the development build

```bash
npm run dev
```

- To run tests

```bash
npm run test
```

Please note that you'll need to set up your own database using the `/server/models/kunligi.sql` file and provide add the database URL to your Node environment.

#### Contributors

[Carlos Perez](https://github.com/crperezt)

[Fredo Chen](https://github.com/fredosauce)

[Tyler Sullberg](https://github.com/tsully)

[Vivian Cermeno](https://github.com/vcermeno)
