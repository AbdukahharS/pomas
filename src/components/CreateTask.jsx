import { useState, useContext } from 'react'
import { Timestamp, doc, updateDoc } from 'firebase/firestore'
import { ProfileContext } from '../context/ProfileContext'
import DatePicker from 'react-multi-date-picker'
import { firestore } from '../config/firebase'
import { v4 as uuid } from 'uuid'
import 'react-multi-date-picker/styles/colors/red.css'

const CreateTask = ({ modal, setModal }) => {
  const { profile, taskList, dispatch } = useContext(ProfileContext)
  const [frequencySelector, setFrequencySelector] = useState('once')
  const [content, setContent] = useState('')
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [frequency, setFrequency] = useState()
  const [days, setDays] = useState(['m'])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (content) {
      if (frequencySelector === 'days') {
        if (days.length === 0) {
          alert('You should choose at least one day of week')
          return
        } else if (days.length > 6) {
          alert('You should not choose all days of week')
          return
        }
      } else if (frequencySelector !== 'everyday' && !frequency) {
        alert('Date is required!')
        return
      }

      const docRef = doc(firestore, 'taskLists', profile.id)
      const unique_id = uuid()
      const small_id = unique_id.slice(0, 8)

      const newTask = {
        id: small_id,
        content,
        duration,
        startTime,
        isDone: false,
        progress: 0,
      }

      switch (frequencySelector) {
        case 'days':
          newTask.frequency = { type: 'days', days }
          break
        case 'once':
          newTask.frequency = Timestamp.fromDate(frequency.toDate())
          break
        case '2days':
        case '3days':
          newTask.frequency = {
            start: Timestamp.fromDate(frequency.toDate()),
            freq: frequencySelector,
          }
          break
        case 'dates':
          newTask.frequency = {
            type: 'dates',
            dates: frequency.map((element) =>
              Timestamp.fromDate(element.toDate())
            ),
          }
          break
        default:
          newTask.frequency = 'everyday'
      }

      const newList = [...taskList.list, newTask]

      updateDoc(docRef, {
        list: newList,
      })
        .then(() => {
          dispatch({
            type: 'SET_TASK_LIST',
            payload: { id: profile.id, list: newList },
          })
          alert('success')
          setContent('')
          setFrequencySelector('once')
          setFrequency(null)
          setDuration(0)
          setStartTime('')
          setModal(false)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      alert('Content is required!')
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
            value={frequencySelector}
            onChange={(e) => setFrequencySelector(e.target.value)}
          >
            <option value='once'>Once</option>
            <option value='everyday'>Everyday</option>
            <option value='2days'>Once in 2 days</option>
            <option value='3days'>Once in 3 days</option>
            <option value='days'>Certain days</option>
            <option value='dates'>Certain dates</option>
          </select>

          {['once', '2days', '3days'].includes(frequencySelector) ? (
            <ADate
              value={frequency}
              setValue={setFrequency}
              select={frequencySelector}
            />
          ) : frequencySelector === 'days' ? (
            <Days days={days} setDays={setDays} />
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

const ADate = ({ value, setValue, select }) => {
  return (
    <>
      <label htmlFor='date'>
        {select === 'once' ? 'Pick a date' : 'Pick a date to start the row'}
      </label>
      <DatePicker
        className='red'
        style={{ with: '100%' }}
        value={value}
        onChange={setValue}
        minDate={new Date()}
      />
    </>
  )
}
const Days = ({ days, setDays }) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      setDays([...days, e.target.id])
    } else {
      // const i = days.indexOf(e.target.id)
      setDays(days.filter((day) => day !== e.target.id))
    }
  }

  return (
    <>
      <label>Pick days of week</label>
      <div>
        <input
          type='checkbox'
          id='m'
          defaultChecked
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='m'>Monday</label>
        <input type='checkbox' id='t' onChange={(e) => handleChange(e)} />
        <label htmlFor='t'>Tuesday</label>
        <input type='checkbox' id='w' onChange={(e) => handleChange(e)} />
        <label htmlFor='w'>Wednesday</label>
        <input type='checkbox' id='th' onChange={(e) => handleChange(e)} />
        <label htmlFor='th'>Thursday</label>
        <input type='checkbox' id='f' onChange={(e) => handleChange(e)} />
        <label htmlFor='f'>Friday</label>
        <input type='checkbox' id='sa' onChange={(e) => handleChange(e)} />
        <label htmlFor='sa'>Saturday</label>
        <input type='checkbox' id='su' onChange={(e) => handleChange(e)} />
        <label htmlFor='su'>Sunday</label>
      </div>
    </>
  )
}
const Dates = ({ value, setValue }) => {
  return (
    <>
      <label htmlFor='date'>Pick dates</label>
      <DatePicker
        multiple
        className='red'
        style={{ with: '100%' }}
        value={value}
        minDate={new Date()}
        onChange={setValue}
      />
    </>
  )
}
