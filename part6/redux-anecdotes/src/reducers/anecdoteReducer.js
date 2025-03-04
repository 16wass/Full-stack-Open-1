import { createSlice } from '@reduxjs/toolkit'

const getId = () => Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [
    {
      content: 'If it hurts, do it more often',
      id: getId(),
      votes: 0,
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: getId(),
      votes: 0,
    },
    {
      content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      id: getId(),
      votes: 0,
    },
    {
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      id: getId(),
      votes: 0,
    },
    {
      content: 'Premature optimization is the root of all evil.',
      id: getId(),
      votes: 0,
    },
    {
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      id: getId(),
      votes: 0,
    },
  ],

  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      }
      state.push(newAnecdote)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer