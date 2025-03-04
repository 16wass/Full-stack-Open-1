import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const dispatch = useDispatch()

const AnecdoteList = () => {

    const { anecdotes, filter } = useSelector((state) => ({
        anecdotes: state.anecdotes,
        filter: state.filter,
      }))
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

      const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
 
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList