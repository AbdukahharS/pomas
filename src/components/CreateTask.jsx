import { useState, useContext } from 'react'
import { Timestamp, doc, updateDoc } from 'firebase/firestore'
import { ProfileContext } from '../context/ProfileContext'
import DatePicker from 'react-multi-date-picker'
import { firestore } from '../config/firebase'
import { v4 as uuid } from 'uuid'
import 'react-multi-date-picker/styles/colors/red.css'

const CreateTask = ({ modal, setModal }) => {
  const { profile, taskList, dispatch } = useContext(ProfileContext)
  const [frequencySelector, setFrequencySelector] = useState('aDate')
  const [content, setContent] = useState('')
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [frequency, setFrequency] = useState(new Date())

  const handleSubmit = (e) => {
    e.preventDefault()

    if (content && frequency) {
      const docRef = doc(firestore, 'taskLists', profile.id)
      const unique_id = uuid()
      const small_id = unique_id.slice(0, 8)

      const newTask = {
        id: small_id,
        content,
        duration,
        startTime,
        frequency: Timestamp.fromDate(frequency.toDate()),
        isDone: false,
      }

      const newList = [...taskList.list, newTask]

      updateDoc(docRef, {
        list: newList,
      })
        .then(() => {
          dispatch('SET_TASK_LIST', { id: profile.id, list: newList })
          alert('success')
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('Content and date are required!')
    }
  }

  const handleClose = (e) => {
    if (e.target.classList.contains('modal')) {
      setModal(false)
    }
  }

  return (
    <div className={`modal${modal ? '' : ' close'}`} onClick={handleClose}>
      <div className='wrapper'>
        <h2>Add a task to the list</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='content'>Content of the task</label>
          <input
            type='text'
            id='content'
            placeholder='Ex: Reading a book'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label htmlFor='duration'>Duration of the task</label>
          <input
            type='number'
            id='duration'
            placeholder='In minutes'
            min='0'
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <label htmlFor='startTime'>Time to start</label>
          <input
            type='time'
            id='startTime'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label htmlFor='type'>How do you want this task to be placed</label>
          <select
            id='type'
            onChange={(e) => setFrequencySelector(e.target.value)}
          >
            <option value='aDate'>Once</option>
            <option value='everyday'>Everyday</option>
            <option value='aDate'>Once in 2 days</option>
            <option value='aDate'>Once in 3 days</option>
            <option value='days'>Certain days</option>
            <option value='dates'>Certain dates</option>
          </select>

          {frequencySelector === 'aDate' ? (
            <ADate value={frequency} setValue={setFrequency} />
          ) : frequencySelector === 'days' ? (
            <Days />
          ) : frequencySelector === 'dates' ? (
            <Dates value={frequency} setValue={setFrequency} />
          ) : null}

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTask

const ADate = ({ value, setValue }) => {
  return (
    <>
      <label htmlFor='date'>Pick a date</label>
      <DatePicker
        className='red'
        style={{ with: '100%' }}
        value={value}
        onChange={setValue}
      />
    </>
  )
}
const Days = () => {
  return (
    <>
      <label>Pick days of week</label>
      <div>
        <input type='checkbox' id='m' />
        <label htmlFor='m'>Monday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='t'>Tuesday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='w'>Wednesday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='th'>Thursday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='f'>Friday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='sa'>Saturday</label>
        <input type='checkbox' id='m' />
        <label htmlFor='su'>Sunday</label>
      </div>
    </>
  )
}
const Dates = () => {
  return (
    <>
      <label htmlFor='date'>Pick dates</label>
      <DatePicker multiple className='red' style={{ with: '100%' }} />
    </>
  )
}
